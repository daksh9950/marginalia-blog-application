import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Marginalia",
  description: "Learn more about the mission and statistics behind Marginalia.",
};

export default function AboutPage() {
  return (
    <main className="animate-fade-in min-h-screen" style={{ background: "var(--bg)" }}>
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[760px] px-6 pb-[60px] pt-[100px] text-center">
        {/* Decorative Quote Mark */}
        <div
          className="pointer-events-none absolute right-0 top-8 select-none"
          style={{
            fontSize: "220px",
            fontFamily: "var(--font-heading), serif",
            color: "var(--accent)",
            opacity: 0.06,
            lineHeight: 1,
          }}
        >
          &quot;
        </div>

        {/* Label */}
        <div
          className="text-xs tracking-widest"
          style={{
            fontFamily: "var(--font-mono), monospace",
            color: "var(--accent)",
          }}
        >
          ABOUT US
        </div>

        {/* Title */}
        <h1
          className="mt-4 text-[52px] font-black"
          style={{
            fontFamily: "var(--font-heading), serif",
            color: "#F5F5F0",
            lineHeight: 1.1,
          }}
        >
          About Marginalia
        </h1>

        {/* Horizontal Line */}
        <div
          className="mx-auto mt-6 h-[2px] w-[48px]"
          style={{ background: "var(--accent)" }}
        />
      </section>

      {/* ── Content Section ──────────────────────────────────── */}
      <section className="mx-auto max-w-[680px] px-6 pb-[64px]">
        <div className="flex flex-col">
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "17px",
              lineHeight: 1.85,
              color: "#D0D0C8",
            }}
          >
            Marginalia was founded with a simple yet ambitious mission: to carve
            out a quiet corner on the internet for deep thinking, thoughtful
            discussion, and the sharing of diverse ideas. In a world
            characterized by fleeting attention spans and endless scrolling, we
            believe in the power of the written word to inspire, challenge, and
            connect us.
          </p>
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "17px",
              lineHeight: 1.85,
              color: "#D0D0C8",
            }}
          >
            Our writers come from all walks of life—technologists, artists,
            philosophers, and everyday observers—bringing their unique
            perspectives to the table. We curate content that ranges from
            in-depth technical tutorials and design explorations to personal
            essays and cultural commentary. Every piece published here is
            carefully crafted to offer value, spark curiosity, and encourage
            meaningful engagement.
          </p>
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "17px",
              lineHeight: 1.85,
              color: "#D0D0C8",
            }}
          >
            As we continue to grow, our commitment remains the same:
            prioritizing quality over quantity, fostering a respectful
            community, and maintaining an ad-free, distraction-free reading
            experience. We invite you to explore our categories, read deeply,
            and perhaps even leave your own marginalia along the way. Thank you
            for being a part of our journey.
          </p>
        </div>
      </section>

      {/* ── Stats Row ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[680px] px-6 pb-[64px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Stat 1 */}
          <div className="group rounded-xl border border-[#2A2A2A] bg-[#111111] p-6 text-center transition-all duration-300 hover:border-[rgba(232,197,71,0.3)]">
            <div
              className="text-[42px] font-black"
              style={{
                fontFamily: "var(--font-heading), serif",
                color: "var(--accent)",
              }}
            >
              10+
            </div>
            <div
              className="mt-2 text-xs uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "#444440",
              }}
            >
              Total Posts
            </div>
          </div>

          {/* Stat 2 */}
          <div className="group rounded-xl border border-[#2A2A2A] bg-[#111111] p-6 text-center transition-all duration-300 hover:border-[rgba(232,197,71,0.3)]">
            <div
              className="text-[42px] font-black"
              style={{
                fontFamily: "var(--font-heading), serif",
                color: "var(--accent)",
              }}
            >
              5
            </div>
            <div
              className="mt-2 text-xs uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "#444440",
              }}
            >
              Categories
            </div>
          </div>

          {/* Stat 3 */}
          <div className="group rounded-xl border border-[#2A2A2A] bg-[#111111] p-6 text-center transition-all duration-300 hover:border-[rgba(232,197,71,0.3)]">
            <div
              className="text-[42px] font-black"
              style={{
                fontFamily: "var(--font-heading), serif",
                color: "var(--accent)",
              }}
            >
              2026
            </div>
            <div
              className="mt-2 text-xs uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "#444440",
              }}
            >
              Year Founded
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission Card ─────────────────────────────────────── */}
      <section className="mx-auto max-w-[680px] px-6 pb-[120px]">
        <div className="relative rounded-xl border border-[#2A2A2A] bg-[#111111] p-8">
          {/* Left Accent Line */}
          <div
            className="absolute bottom-[32px] left-[0px] top-[32px] w-[3px] rounded-r"
            style={{ background: "var(--accent)" }}
          />

          <h2
            className="text-[24px]"
            style={{
              fontFamily: "var(--font-heading), serif",
              color: "#F5F5F0",
            }}
          >
            Our Mission
          </h2>
          <p
            className="mt-4 text-[15px]"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              lineHeight: 1.8,
              color: "#888880",
            }}
          >
            To provide a digital sanctuary for slow reading and deep thinking.
            We prioritize quality over quantity, focusing on enduring insights
            rather than fleeting trends. By stripping away distractions and
            maintaining a minimalist design, we put the focus exactly where it
            belongs: on the words and the ideas they convey.
          </p>
        </div>
      </section>
    </main>
  );
}
