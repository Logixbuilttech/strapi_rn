"use client";
import Script from "next/script";
import { useEffect, useRef } from "react";

export default function TurnstileWidget({ siteKey, onSuccess }) {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Wait for the script to load
    const renderTurnstile = () => {
      if (window.turnstile && widgetRef.current) {
        window.turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          callback: (token) => onSuccess(token),
          "expired-callback": () => onSuccess(""),
          "error-callback": () => onSuccess(""),
        });
      }
    };
    // If script already loaded
    if (window.turnstile) {
      renderTurnstile();
    } else {
      window.onloadTurnstile = renderTurnstile;
    }
    // Clean up
    return () => {
      if (widgetRef.current) widgetRef.current.innerHTML = "";
    };
  }, [siteKey, onSuccess]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        onLoad={() => {
          if (window.onloadTurnstile) window.onloadTurnstile();
        }}
      />
      <div ref={widgetRef} className="cf-turnstile" />
    </>
  );
}