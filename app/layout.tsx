import type { Metadata } from "next";
import { Playfair_Display, Inter, DM_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

/* ── Font Definitions ──────────────────────────────────── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Marginalia",
  description: "A literary blog for the margins of thought",
  openGraph: {
    title: "Marginalia",
    description: "A literary blog for the margins of thought",
    type: "website",
  },
};

/* ── Root Layout ───────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-16">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

