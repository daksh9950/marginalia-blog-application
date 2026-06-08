import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <article className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* ── Back Button ────────────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-6 py-6">
        <div className="inline-flex items-center gap-2 text-sm text-[#888880]">
          <ArrowLeft size={16} />
          Back to Home
        </div>
      </div>

      {/* ── Banner Image Skeleton ──────────────────────────── */}
      <div className="relative h-[280px] w-full animate-pulse bg-[#1A1A1A] md:h-[480px]">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, #0A0A0A 100%)",
          }}
        />
      </div>

      {/* ── Post Header Skeleton ───────────────────────────── */}
      <header
        className="relative z-10 mx-auto max-w-[760px] px-6"
        style={{ marginTop: "-80px" }}
      >
        <div className="h-6 w-24 animate-pulse rounded bg-[#2A2A2A]"></div>
        
        <div className="mt-6 h-10 w-full animate-pulse rounded bg-[#2A2A2A] md:h-12"></div>
        <div className="mt-3 h-10 w-3/4 animate-pulse rounded bg-[#2A2A2A] md:h-12"></div>

        <div className="mt-8 flex items-center gap-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#2A2A2A]"></div>
          <div className="h-4 w-24 animate-pulse rounded bg-[#1A1A1A]"></div>
          <div className="h-4 w-32 animate-pulse rounded bg-[#1A1A1A]"></div>
        </div>
      </header>

      {/* ── Content Body Skeleton ──────────────────────────── */}
      <div className="mx-auto max-w-[680px] px-6 py-12 pb-20 md:py-16">
        <div className="flex flex-col gap-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="h-4 w-full animate-pulse rounded bg-[#1A1A1A]"></div>
              <div className="h-4 w-full animate-pulse rounded bg-[#1A1A1A]"></div>
              <div className="h-4 w-5/6 animate-pulse rounded bg-[#1A1A1A]"></div>
              <div className="h-4 w-3/4 animate-pulse rounded bg-[#1A1A1A]"></div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
