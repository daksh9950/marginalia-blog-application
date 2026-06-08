"use client";

import { useState } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackElement?: React.ReactNode;
}

export default function ImageWithFallback({
  fallbackElement,
  src,
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if ((error || !src) && fallbackElement) {
    return <>{fallbackElement}</>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
      {...props}
    />
  );
}
