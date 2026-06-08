import SubmitForm from "@/components/SubmitForm";
import { CheckCircle2 } from "lucide-react";

export default function SubmitPage() {
  return (
    <main className="animate-fade-in min-h-screen" style={{ background: "var(--bg)" }}>
      {/* ── Page Heading ─────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-[80px]">
        <h1
          className="text-[42px]"
          style={{ fontFamily: "var(--font-heading), serif", color: "#F5F5F0" }}
        >
          Submit Your Story
        </h1>
        <p className="mt-2" style={{ color: "#888880" }}>
          Share your ideas with our readers.
        </p>
      </section>

      {/* ── Two-Column Layout ────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-12 pb-[80px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Form Area (3 cols) */}
          <div className="lg:col-span-3">
            <SubmitForm />
          </div>

          {/* Info Panel (2 cols) */}
          <div className="lg:col-span-2">
            <div
              className="sticky top-24 rounded-xl border p-6"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              {/* Guidelines */}
              <h2
                className="text-[20px]"
                style={{
                  fontFamily: "var(--font-heading), serif",
                  color: "#F5F5F0",
                }}
              >
                Submission Guidelines
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {[
                  "Minimum 300 words in the content body",
                  "Use a high-quality thumbnail image URL",
                  "Keep your excerpt under 200 characters",
                  "Posts are reviewed within 24–48 hours",
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--accent)" }}
                    />
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        color: "#888880",
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="my-6 border-t"
                style={{ borderColor: "var(--border)" }}
              />

              {/* What happens next? */}
              <h3
                className="text-xs uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  color: "#444440",
                }}
              >
                What happens next?
              </h3>
              <div className="relative mt-4 flex flex-col gap-4">
                {/* Vertical Line */}
                <div
                  className="absolute bottom-[20px] left-[13px] top-[14px] w-[1px]"
                  style={{ background: "var(--border)", zIndex: 0 }}
                />
                {[
                  {
                    title: "Submission Received",
                    desc: "We log your post immediately",
                  },
                  {
                    title: "Editorial Review",
                    desc: "Our team reviews within 48 hours",
                  },
                  {
                    title: "Goes Live",
                    desc: "Approved posts appear on the homepage",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex gap-4">
                    <div
                      className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border text-xs"
                      style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--accent)",
                        fontFamily: "var(--font-mono), monospace",
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#F5F5F0" }}
                      >
                        {step.title}
                      </p>
                      <p
                        className="mt-0.5 text-xs"
                        style={{ color: "#444440" }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
