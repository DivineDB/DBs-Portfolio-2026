"use client";

import { useEffect, useRef } from "react";

/* =====================================================================
   Interactive hero background - port of the microsoft.ai "block-gl" pipeline
   ---------------------------------------------------------------------
   It is NOT an image. It is a chain of full-screen shader passes that each
   read the previous pass's output (ping-pong framebuffers), rendered at HALF
   resolution and stretched by CSS (that is part of the soft look):

     1. VIGNETTE  an elliptical mask centred on the (smoothed) cursor:
                  transparent inside, dark magenta outside.
     2. SINE      the whole mask is warped sideways by a slow sine wave.
     3. SHATTER   Voronoi cells (stretched + rotated 44 deg) each shift the
                  mask by their own animated offset -> the broken diagonal
                  streaks.
     4. BOKEH     50-tap golden-angle disc blur, bright pixels weighted
                  heavily, rotated per pixel by a noise texture -> soft, grainy.
     5. OUTPUT    base colour (peach, overlaid with a gradient texture)
                  multiplied by the result at 26% strength.

   Interaction: the ellipse follows the cursor (eased 10%/frame), so the lit
   shattered area flows toward your pointer.
   ===================================================================== */

export default function InteractiveBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const rawCanvas = canvasRef.current;
    if (!rawCanvas) return;

    const glCtx = rawCanvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });

    if (!glCtx) {
      rawCanvas.style.display = "none";
      return;
    }

    const canvas: HTMLCanvasElement = rawCanvas;
    const gl: WebGL2RenderingContext = glCtx;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- config (values tailored for warm sunlight aesthetic) ---------- */
    const SCALE = 0.5; // render resolution vs CSS size
    const CFG = {
      background: "#F8EDD1",   // site's warm paper cream base
      vignette: "#3E271D",     // rich golden-hour terracotta umber (warm analog shadows)
      output: "#FFF3DC",       // warm sunlit highlight glow
      vig: { radius: 0.42, falloff: 1.15, skew: 0.54 },
      sine: { frequency: 0.32, amplitude: 1.05 },
      shatter: { scale: 0.534, amount: 0.92, angle: 44, skew: 0.84 },
      bokeh: { radius: 0.85 },
    };

    // Optional: point these at image files to use the original-style textures instead of the generated ones.
    const BG_GRADIENT_SRC = ""; // e.g. 'orange-gradient.png'
    const NOISE_SRC = ""; // e.g. 'blue-noise.png'

    function hex(h: string): [number, number, number] {
      h = h.slice(1);
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      const n = parseInt(h, 16);
      return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    }
    const COL = {
      bg: hex(CFG.background),
      vig: hex(CFG.vignette),
      out: hex(CFG.output),
    };

    /* ---------- shaders ---------- */
    const VS = `#version 300 es
in vec2 a;
out vec2 vUv;
void main(){
  vUv = a * .5 + .5;
  gl_Position = vec4(a, 0., 1.);
}`;

    const HEAD = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
`;

    const FS_VIGNETTE =
      HEAD +
      `
#define TWO_PI 6.28318530718
uniform float uRadius; uniform float uFalloff; uniform float uSkew;
uniform vec3 uVignetteColor; uniform vec3 uClearColor; uniform vec2 uPos; uniform vec2 uResolution;
mat2 rot(float a){ return mat2(cos(a),-sin(a),sin(a),cos(a)); }
void main(){
  vec2 uv = vUv;
  vec2 aspectRatio = vec2(uResolution.x/uResolution.y, 1.0);
  vec2 skew = vec2(uSkew, 1.0 - uSkew);
  float halfRadius = uRadius * 0.5;
  float innerEdge = halfRadius - uFalloff * halfRadius * 0.5;
  float outerEdge = halfRadius + uFalloff * halfRadius * 0.5;
  vec2 scaledUV  = uv   * aspectRatio * skew;
  vec2 scaledPos = uPos * aspectRatio * skew;
  float radius = distance(scaledUV, scaledPos);
  float falloff = smoothstep(innerEdge, outerEdge, radius);
  fragColor = mix(vec4(uClearColor, 0.), vec4(uVignetteColor, 1.), falloff);
}`;

    const FS_SINE =
      HEAD +
      `
#define PI3 1.04709283144
uniform sampler2D tInput; uniform float uFrequency; uniform float uAmplitude; uniform float uTime; uniform vec2 uPos;
void main(){
  vec2 waveCoord = vUv * 2.0 - 1.0;
  float time = uTime * 0.25;
  float frequency = 20.0 * uFrequency;
  float amp = uAmplitude * 0.2;
  float waveX = sin((waveCoord.y + uPos.y) * frequency + (time * PI3)) * amp;
  waveCoord.x += waveX;
  fragColor = texture(tInput, waveCoord * 0.5 + 0.5);
}`;

    const FS_SHATTER =
      HEAD +
      `
#define PI 3.14159265359
uniform sampler2D tInput; uniform float uAmount; uniform float uSpread; uniform float uAngle;
uniform float uTime; uniform float uSkew; uniform vec2 uPos; uniform vec2 uResolution;
vec2 random2(vec2 p){ return fract(sin(vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))))*43758.5453); }
mat2 rot(float a){ return mat2(cos(a),-sin(a),sin(a),cos(a)); }
void main(){
  vec2 uv = vUv;
  float aspectRatio = uResolution.x/uResolution.y;
  vec2 skew = mix(vec2(1), vec2(1, 0), uSkew);
  vec2 st = (uv - uPos) * vec2(aspectRatio, 1.) * 50. * uAmount;
  st = st * rot(uAngle * 2. * PI) * skew;
  vec2 i_st = floor(st); vec2 f_st = fract(st);
  float m_dist = 15.; vec2 m_point = vec2(0.);
  for (int j=-1; j<=1; j++) for (int i=-1; i<=1; i++) {
    vec2 neighbor = vec2(float(i), float(j));
    vec2 point = random2(i_st + neighbor);
    point = 0.5 + 0.5 * sin(5. + uTime * 0.2 + 6.2831 * point);
    vec2 diff = neighbor + point - f_st;
    float dist = length(diff);
    if (dist < m_dist) { m_dist = dist; m_point = point; }
  }
  vec2 offset = (m_point * 0.2 * uSpread * 2.) - (uSpread * 0.2);
  fragColor = texture(tInput, uv + offset);
}`;

    const isMobileDevice =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        (window.matchMedia &&
          window.matchMedia("(hover: none) and (pointer: coarse)").matches));

    const BOKEH_ITERS = isMobileDevice ? "28.0" : "50.0";

    const FS_BOKEH =
      HEAD +
      `
#define PI2 6.28318530718
#define ITERATIONS ` +
      BOKEH_ITERS +
      `
#define GOLDEN_ANGLE 2.39996323
uniform sampler2D tInput; uniform sampler2D tBlueNoise; uniform vec2 uResolution; uniform vec2 uBlueNoiseResolution;
vec2 Sample(in float theta, inout float r){ r += 1.0 / r; return (r-1.0) * vec2(cos(theta), sin(theta)); }
float getBlueNoiseOffset(vec2 fc){ float n = texture(tBlueNoise, fc / uBlueNoiseResolution).r; return mod((n - 0.5) * PI2, PI2); }
void main(){
  vec3 accColor = vec3(0.0), accWeights = vec3(0.0); float accAlpha = 0.0;
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 pixelSize = vec2(1.0 / aspectRatio, 1.0) * 0.04 * 0.075;
  float r = 1.0;
  float noiseOffset = (getBlueNoiseOffset(gl_FragCoord.xy) - 0.5) * 0.01;
  float noiseAngle = noiseOffset * PI2;
  mat2 rotationMatrix = mat2(cos(noiseAngle), -sin(noiseAngle), sin(noiseAngle), cos(noiseAngle));
  for (float j = 0.0; j < GOLDEN_ANGLE * ITERATIONS; j += GOLDEN_ANGLE) {
    vec2 offset = Sample(j, r) * pixelSize;
    float jitterAmount = 0.05 * (sin(j * 0.1) * 0.5 + 0.5);
    offset *= 1.0 + jitterAmount * sin(j * 0.7 + noiseOffset);
    vec4 c = texture(tInput, vUv + rotationMatrix * offset);
    vec3 w = vec3(5.0) + pow(c.rgb, vec3(9.0)) * 150.0;
    accAlpha += c.a; accColor += c.rgb * w; accWeights += w;
  }
  fragColor = vec4(accColor / accWeights, accAlpha / ITERATIONS);
}`;

    const FS_OUTPUT =
      HEAD +
      `
uniform sampler2D tBgTexture; uniform sampler2D tInput;
uniform vec3 uBgColor; uniform vec3 uOutputColor; uniform float uTime;
uniform vec2 uResolution;
vec3 overlay(vec3 base, vec3 blend){ return mix(2.0*base*blend, 1.0 - 2.0*(1.0-base)*(1.0-blend), step(0.5, base)); }

// High quality pseudo-random hash for film grain
float hash(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main(){
  vec3 bgTex = texture(tBgTexture, vUv).rgb;
  vec3 base = mix(uBgColor, overlay(uBgColor, bgTex), 0.48);
  vec4 inp = texture(tInput, vUv);
  vec3 blend = mix(uOutputColor, inp.rgb, inp.a);
  vec3 col = base * mix(vec3(1.), blend, 0.28);

  // Very minimal, delicate cinematic micro-grain (just enough to prevent color banding and add soft analog warmth)
  vec2 grainCoord = vUv * uResolution * 2.0;
  float timeSeed = fract(uTime * 0.15);
  float filmGrain = hash(floor(grainCoord) + vec2(timeSeed * 137.0, timeSeed * 269.0)) * 2.0 - 1.0;
  col += (filmGrain * 0.012) * col;

  fragColor = vec4(col, 1.);
}`;

    /* ---------- GL helpers ---------- */
    function shader(type: number, src: string) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s) + "\n" + src);
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = shader(gl.VERTEX_SHADER, VS);
    if (!vs) {
      canvas.style.display = "none";
      return;
    }

    interface ProgramWithUniforms {
      p: WebGLProgram;
      u: Record<string, WebGLUniformLocation>;
      fs: WebGLShader;
    }

    function program(fsSrc: string): ProgramWithUniforms | null {
      const fs = shader(gl.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      if (!p) return null;
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.bindAttribLocation(p, 0, "a");
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(p));
        gl.deleteProgram(p);
        return null;
      }
      const u: Record<string, WebGLUniformLocation> = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const info = gl.getActiveUniform(p, i);
        if (info) {
          const loc = gl.getUniformLocation(p, info.name);
          if (loc) u[info.name] = loc;
        }
      }
      return { p, u, fs };
    }

    const pVig = program(FS_VIGNETTE);
    const pSine = program(FS_SINE);
    const pShatter = program(FS_SHATTER);
    const pBokeh = program(FS_BOKEH);
    const pOut = program(FS_OUTPUT);

    if (!pVig || !pSine || !pShatter || !pBokeh || !pOut) {
      canvas.style.display = "none";
      return;
    }

    const P = {
      vig: pVig,
      sine: pSine,
      shatter: pShatter,
      bokeh: pBokeh,
      out: pOut,
    };

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    interface Target {
      tex: WebGLTexture;
      fb: WebGLFramebuffer;
    }

    function target(w: number, h: number): Target | null {
      const t = gl.createTexture();
      if (!t) return null;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA8,
        w,
        h,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const f = gl.createFramebuffer();
      if (!f) return null;
      gl.bindFramebuffer(gl.FRAMEBUFFER, f);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        t,
        0
      );
      return { tex: t, fb: f };
    }

    function kill(t: Target | null) {
      if (t) {
        gl.deleteTexture(t.tex);
        gl.deleteFramebuffer(t.fb);
      }
    }

    /* ---------- textures (generated stand-ins; optional files override) ---------- */
    function imgTex(source: TexImageSource, repeat: boolean, nearest: boolean) {
      const t = gl.createTexture();
      if (!t) return null;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        nearest ? gl.NEAREST : gl.LINEAR
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        nearest ? gl.NEAREST : gl.LINEAR
      );
      const w = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, w);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, w);
      return t;
    }

    function makeGradient() {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const x = c.getContext("2d");
      if (x) {
        const g = x.createLinearGradient(0, 256, 256, 0);
        g.addColorStop(0, "#fde6b8");
        g.addColorStop(0.5, "#fed69f");
        g.addColorStop(1, "#fcd090");
        x.fillStyle = g;
        x.fillRect(0, 0, 256, 256);
      }
      return c;
    }

    function makeNoise() {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const x = c.getContext("2d");
      if (x) {
        const d = x.createImageData(256, 256);
        for (let i = 0; i < d.data.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
          d.data[i + 3] = 255;
        }
        x.putImageData(d, 0, 0);
      }
      return c;
    }

    let bgTex = imgTex(makeGradient(), true, false);
    let noiseTex = imgTex(makeNoise(), true, true);
    let noiseRes = [256, 256];

    function load(src: string, cb: (im: HTMLImageElement) => void) {
      if (!src) return;
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.onload = () => cb(im);
      im.src = src;
    }

    load(BG_GRADIENT_SRC, (im) => {
      if (bgTex) gl.deleteTexture(bgTex);
      bgTex = imgTex(im, true, false);
    });
    load(NOISE_SRC, (im) => {
      if (noiseTex) gl.deleteTexture(noiseTex);
      noiseTex = imgTex(im, true, true);
      noiseRes = [im.naturalWidth, im.naturalHeight];
    });

    /* ---------- sizing ---------- */
    let RW = 2,
      RH = 2;
    let A: Target | null = null;
    let B: Target | null = null;

    function resize() {
      // Clamp Device Pixel Ratio between 1.0 and 1.5 to prevent massive 4K/Retina framebuffer overhead
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      // Adaptive scale: 0.45 on mobile, 0.52 on desktop with DPR normalization
      const effectiveScale = isMobileDevice ? 0.42 : 0.5 * Math.min(dpr, 1.25);

      RW = Math.max(2, Math.round(window.innerWidth * effectiveScale));
      RH = Math.max(2, Math.round(window.innerHeight * effectiveScale));
      canvas.width = RW;
      canvas.height = RH;
      kill(A);
      kill(B);
      A = target(RW, RH);
      B = target(RW, RH);
      if (reduceMotion) frame(performance.now());
    }
    window.addEventListener("resize", resize, { passive: true });

    /* ---------- pointer ---------- */
    const pointer = [0.5, 0.5];
    const curr = [0.5, 0.5];

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        pointer[0] = (e.clientX - r.left) / r.width;
        pointer[1] = 1 - (e.clientY - r.top) / r.height;
      }
    };

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    /* ---------- render ---------- */
    function run(
      prog: ProgramWithUniforms,
      out: Target | null,
      inTex: WebGLTexture | null
    ) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, out ? out.fb : null);
      gl.viewport(0, 0, RW, RH);
      gl.useProgram(prog.p);
      if (inTex) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, inTex);
        if (prog.u.tInput) gl.uniform1i(prog.u.tInput, 0);
      }
    }

    let elapsed = 0;
    let last = performance.now();

    function frame(now: number) {
      if (!A || !B) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!reduceMotion) {
        elapsed += dt * 2;
        const e = 1 - Math.pow(0.9, dt * 60); // original eases 10% per frame
        curr[0] += (pointer[0] - curr[0]) * e;
        curr[1] += (pointer[1] - curr[1]) * e;
      }

      // Organic idle breeze (gentle leaf-sway motion like sunlight through a tree)
      const breezeX = reduceMotion ? 0 : Math.sin(elapsed * 0.45) * 0.022 + Math.cos(elapsed * 0.28) * 0.012;
      const breezeY = reduceMotion ? 0 : Math.cos(elapsed * 0.38) * 0.018 + Math.sin(elapsed * 0.19) * 0.009;
      const effectivePosX = curr[0] + breezeX;
      const effectivePosY = curr[1] + breezeY;

      // 1. vignette -> A
      run(P.vig, A, null);
      if (P.vig.u.uRadius) gl.uniform1f(P.vig.u.uRadius, CFG.vig.radius);
      if (P.vig.u.uFalloff) gl.uniform1f(P.vig.u.uFalloff, CFG.vig.falloff);
      if (P.vig.u.uSkew) gl.uniform1f(P.vig.u.uSkew, CFG.vig.skew);
      if (P.vig.u.uVignetteColor) gl.uniform3fv(P.vig.u.uVignetteColor, COL.vig);
      if (P.vig.u.uClearColor) gl.uniform3fv(P.vig.u.uClearColor, COL.bg);
      if (P.vig.u.uPos) gl.uniform2f(P.vig.u.uPos, effectivePosX, effectivePosY);
      if (P.vig.u.uResolution) gl.uniform2f(P.vig.u.uResolution, RW, RH);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // 2. sine A -> B
      run(P.sine, B, A.tex);
      if (P.sine.u.uFrequency)
        gl.uniform1f(P.sine.u.uFrequency, CFG.sine.frequency);
      if (P.sine.u.uAmplitude)
        gl.uniform1f(P.sine.u.uAmplitude, CFG.sine.amplitude);
      if (P.sine.u.uTime) gl.uniform1f(P.sine.u.uTime, elapsed);
      if (P.sine.u.uPos) gl.uniform2f(P.sine.u.uPos, 0.5, 0.5);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // 3. shatter B -> A
      run(P.shatter, A, B.tex);
      if (P.shatter.u.uAmount)
        gl.uniform1f(P.shatter.u.uAmount, CFG.shatter.scale);
      if (P.shatter.u.uSpread)
        gl.uniform1f(P.shatter.u.uSpread, CFG.shatter.amount);
      if (P.shatter.u.uAngle)
        gl.uniform1f(P.shatter.u.uAngle, CFG.shatter.angle / 360);
      if (P.shatter.u.uSkew) gl.uniform1f(P.shatter.u.uSkew, CFG.shatter.skew);
      if (P.shatter.u.uTime) gl.uniform1f(P.shatter.u.uTime, elapsed);
      if (P.shatter.u.uPos) gl.uniform2f(P.shatter.u.uPos, 0.5, 0.5);
      if (P.shatter.u.uResolution) gl.uniform2f(P.shatter.u.uResolution, RW, RH);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // 4. bokeh A -> B
      run(P.bokeh, B, A.tex);
      if (noiseTex) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, noiseTex);
        if (P.bokeh.u.tBlueNoise) gl.uniform1i(P.bokeh.u.tBlueNoise, 1);
      }
      if (P.bokeh.u.uResolution) gl.uniform2f(P.bokeh.u.uResolution, RW, RH);
      if (P.bokeh.u.uBlueNoiseResolution)
        gl.uniform2f(
          P.bokeh.u.uBlueNoiseResolution,
          noiseRes[0],
          noiseRes[1]
        );
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // 5. output B -> screen
      run(P.out, null, B.tex);
      if (bgTex) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, bgTex);
        if (P.out.u.tBgTexture) gl.uniform1i(P.out.u.tBgTexture, 1);
      }
      if (P.out.u.uBgColor) gl.uniform3fv(P.out.u.uBgColor, COL.bg);
      if (P.out.u.uOutputColor) gl.uniform3fv(P.out.u.uOutputColor, COL.out);
      if (P.out.u.uTime) gl.uniform1f(P.out.u.uTime, elapsed);
      if (P.out.u.uResolution) gl.uniform2f(P.out.u.uResolution, RW, RH);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    let animId = 0;
    let isRunning = false;
    let isVisible = true;
    let isIntersecting = true;

    function startLoop() {
      if (!isRunning && !reduceMotion && isVisible && isIntersecting) {
        isRunning = true;
        last = performance.now();
        animId = requestAnimationFrame(loop);
      }
    }

    function stopLoop() {
      if (isRunning) {
        cancelAnimationFrame(animId);
        isRunning = false;
      }
    }

    function loop(now: number) {
      if (!isRunning) return;
      frame(now);
      animId = requestAnimationFrame(loop);
    }

    // 1. Page Visibility API: pause when user switches tabs to save battery & GPU
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 2. IntersectionObserver: pause when canvas is scrolled out of viewport
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isIntersecting = entry.isIntersecting;
            if (isIntersecting) {
              startLoop();
            } else {
              stopLoop();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);
    }

    resize();

    if (reduceMotion) {
      frame(performance.now());
    } else {
      startLoop();
    }

    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (observer) observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      kill(A);
      kill(B);
      if (bgTex) gl.deleteTexture(bgTex);
      if (noiseTex) gl.deleteTexture(noiseTex);
      if (vbo) gl.deleteBuffer(vbo);
      [pVig, pSine, pShatter, pBokeh, pOut].forEach((prog) => {
        gl.deleteShader(prog.fs);
        gl.deleteProgram(prog.p);
      });
      gl.deleteShader(vs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg"
      className="fixed inset-0 w-full h-full block pointer-events-none z-0"
      style={{ background: "#F8EDD1" }}
      aria-hidden="true"
    />
  );
}
