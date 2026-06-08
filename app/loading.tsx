export default function Loading() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* ── Hero Section Skeleton ─────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden px-6 pb-[80px] pt-[120px] text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(232,197,71,0.12), transparent 70%)",
            animation: "pulse-glow 4s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center">
          {/* Label Skeleton */}
          <div className="mb-6 h-4 w-32 animate-pulse rounded bg-[#1A1A1A]"></div>
          {/* Title Skeleton */}
          <div className="mb-3 h-16 w-3/4 animate-pulse rounded bg-[#2A2A2A] md:h-20"></div>
          <div className="h-16 w-1/2 animate-pulse rounded bg-[#1A1A1A] md:h-20"></div>
          {/* Subtitle Skeleton */}
          <div className="mt-8 h-5 w-2/3 animate-pulse rounded bg-[#1A1A1A]"></div>
          <div className="mt-3 h-5 w-1/2 animate-pulse rounded bg-[#1A1A1A]"></div>
        </div>
      </section>

      {/* ── Grid Section Skeleton ─────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1280px]">
        {/* Sticky filter bar skeleton */}
        <div
          className="sticky top-16 z-40 flex flex-wrap items-center justify-between gap-4 border-b bg-[#0A0A0A] px-6 py-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="h-10 w-full max-w-[320px] animate-pulse rounded-lg bg-[#111111] border" style={{ borderColor: "var(--border)" }}></div>
          <div className="flex gap-2 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-9 w-24 animate-pulse rounded-full bg-[#111111] border"
                style={{ borderColor: "var(--border)" }}
              ></div>
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="px-6 py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex h-full flex-col overflow-hidden rounded-xl border bg-[#111111]"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="h-[200px] w-full animate-pulse bg-[#1A1A1A]"></div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 h-5 w-24 animate-pulse rounded bg-[#2A2A2A]"></div>
                  <div className="mb-3 h-8 w-full animate-pulse rounded bg-[#2A2A2A]"></div>
                  <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-[#2A2A2A]"></div>
                  <div className="mb-6 h-4 w-full animate-pulse rounded bg-[#1A1A1A]"></div>
                  <div className="mb-6 h-4 w-5/6 animate-pulse rounded bg-[#1A1A1A]"></div>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-[#2A2A2A]"></div>
                    <div className="h-4 w-24 animate-pulse rounded bg-[#1A1A1A]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
