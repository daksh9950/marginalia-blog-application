"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isSubmitActive = pathname.startsWith("/submit");

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Main Bar ─────────────────────────────────────── */}
      <nav
        className="h-16 border-b backdrop-blur-md"
        style={{
          background: "rgba(10,10,10,0.85)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0 select-none"
            onClick={() => setIsOpen(false)}
          >
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

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActiveLink(link.href)
                    ? "var(--accent)"
                    : "var(--muted)",
                }}
                onMouseEnter={(e) => {
                  if (!isActiveLink(link.href))
                    e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (!isActiveLink(link.href))
                    e.currentTarget.style.color = "var(--muted)";
                }}
              >
                {link.label}
                {/* Active dot indicator */}
                {isActiveLink(link.href) && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      bottom: "-8px",
                      width: "4px",
                      height: "4px",
                      background: "var(--accent)",
                    }}
                  />
                )}
              </Link>
            ))}

            {/* Submit pill button */}
            <Link
              href="/submit"
              className="rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200"
              style={{
                borderColor: "var(--accent)",
                color: isSubmitActive ? "#000" : "var(--accent)",
                background: isSubmitActive ? "var(--accent)" : "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                if (!isSubmitActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--accent)";
                }
              }}
            >
              Submit the Blog
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center transition-colors duration-200 md:hidden"
            style={{ color: "var(--text)" }}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown ──────────────────────────────── */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out md:hidden"
        style={{
          maxHeight: isOpen ? "320px" : "0px",
          background: "var(--surface)",
          borderBottom: isOpen ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200"
              style={{
                color: isActiveLink(link.href)
                  ? "var(--accent)"
                  : "var(--muted)",
              }}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-2">
                {isActiveLink(link.href) && (
                  <span
                    className="inline-block rounded-full"
                    style={{
                      width: "4px",
                      height: "4px",
                      background: "var(--accent)",
                    }}
                  />
                )}
                {link.label}
              </span>
            </Link>
          ))}

          {/* Submit pill — mobile */}
          <Link
            href="/submit"
            className="mt-2 rounded-full border px-4 py-2 text-center text-sm font-medium transition-all duration-200"
            style={{
              borderColor: "var(--accent)",
              color: isSubmitActive ? "#000" : "var(--accent)",
              background: isSubmitActive ? "var(--accent)" : "transparent",
            }}
            onClick={() => setIsOpen(false)}
          >
            Submit the Blog
          </Link>
        </div>
      </div>
    </header>
  );
}
