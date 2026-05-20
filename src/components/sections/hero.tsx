import Image from "next/image";

const NAV = ["Resume", "Contact"] as const;

export function Hero() {
  return (
    <section className="flex h-screen w-screen select-none items-center justify-center overflow-hidden bg-[#F8EDD1]">
      <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-12 py-16 md:px-20 lg:grid-cols-12">
        <div className="flex h-full max-h-[600px] flex-col justify-between py-4 lg:col-span-5">
          <div className="flex flex-col gap-1">
            <p className="font-gilroyRegular text-lg text-black/25">Hey, I&apos;m</p>
            <h1 className="font-gilroyBold text-5xl leading-tight tracking-tight text-text_primary md:text-6xl">
              Divyansh{" "}
              <span className="relative inline-flex h-[64px] w-[200px] items-center justify-center">
                <Image
                  src="/images/HighlightBox.svg"
                  alt=""
                  aria-hidden
                  width={200}
                  height={64}
                  className="pointer-events-none absolute inset-0 h-full w-full"
                />
                <span className="relative z-10 font-gilroyRegular">Baghel</span>
              </span>
            </h1>
            <p className="mt-2 font-gilroyRegular text-xl text-black/25">Design Engineer</p>

            <nav className="mt-12 flex gap-8 font-gilroyRegular text-lg font-medium text-text_primary">
              {NAV.map((label) => (
                <span
                  key={label}
                  className="underline decoration-text_primary/50 underline-offset-4"
                >
                  {label}
                </span>
              ))}
            </nav>
          </div>

          <footer className="mt-auto flex flex-col gap-2">
            <span className="inline-flex w-fit items-center rounded-full border border-[#A2F991] bg-[#A2F991]/20 px-4 py-1.5 font-mono text-sm text-text_primary">
              15:23 IST
            </span>
            <p className="text-xs text-black/25">© 2026 | Divyansh Baghel.</p>
          </footer>
        </div>

        <div className="relative flex h-full max-h-[750px] w-full items-center justify-end lg:col-span-7">
          <div className="relative aspect-[0.73] w-full max-w-[600px] overflow-hidden">
            <Image
              src="/images/Building.svg"
              alt="Building illustration"
              fill
              priority
              className="h-full w-full object-contain"
            />
            <Image
              src="/images/boy.svg"
              alt=""
              aria-hidden
              width={184}
              height={180}
              className="pointer-events-none absolute top-[43%] left-[21.8%] z-10 h-auto w-[23%] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
