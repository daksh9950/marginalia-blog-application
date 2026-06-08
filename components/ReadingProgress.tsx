"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      if (documentHeight <= windowHeight) {
        setProgress(0);
        return;
      }
      
      const calculated = (scrollY / (documentHeight - windowHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, calculated)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-[64px] z-50 h-[3px]"
      style={{
        background: "var(--accent)",
        width: `${progress}%`,
        transition: "width 150ms ease-out",
      }}
    />
  );
}
