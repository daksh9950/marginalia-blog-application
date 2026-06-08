import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/submit", label: "Submit a Post" },
];

const categories = [
  "Technology",
  "Design",
  "Lifestyle",
  "Travel",
  "Food",
];

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      {/* ── Accent Top Line ──────────────────────────────── */}
      <div
        className="h-[2px] w-full"
        style={{ background: "var(--accent)" }}
      />

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Column 1 — Brand */}
          <div>
            <Link href="/" className="flex items-center gap-0 select-none">
              <span
                className="font-bold text-xl"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  color: "var(--accent)",
                }}
              >
                M·
              </span>
              <span
                className="text-xl"
                style={{
                  fontFamily: "var(--font-heading), serif",
                  color: "var(--text)",
                }}
              >
                Marginalia
              </span>
            </Link>
            <p
              className="mt-3 max-w-[220px] text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Thoughtful writing on technology, design, and the small choices
              that shape everyday life.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3
              className="text-[11px] font-medium uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "var(--accent)",
              }}
            >
              Navigation
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-[#F5F5F0]"
                    style={{ color: "var(--muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Categories */}
          <div>
            <h3
              className="text-[11px] font-medium uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "var(--accent)",
              }}
            >
              Categories
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <span
                    className="cursor-pointer text-sm transition-colors duration-200 hover:text-[#E8C547]"
                    style={{ color: "var(--muted)" }}
                  >
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────── */}
      <div
        className="px-6 py-5 text-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="text-[11px]"
          style={{
            fontFamily: "var(--font-mono), monospace",
            color: "#444440",
          }}
        >
          &copy; 2026 Marginalia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
