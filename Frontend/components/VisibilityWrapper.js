// components/VisibilityWrapper.js
"use client";

import React, { useRef, useEffect } from "react";

export default function VisibilityWrapper({
  children,
  onVisible,
  rootMargin = "0px 0px -20% 0px",
  threshold = 0.1,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
          obs.disconnect(); // only fire once
        }
      },
      { rootMargin, threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [onVisible, rootMargin, threshold]);

  return <div ref={ref}>{children}</div>;
}
