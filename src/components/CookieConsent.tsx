"use client";

import { useState, useEffect, useCallback } from "react";

const CONSENT_KEY = "actahub_cookie_consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Delay showing banner to not impact LCP
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setIsVisible(false);
    // Load analytics after consent (GA4)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }, []);

  const handleReject = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de Cookies"
      aria-describedby="cookie-consent-description"
      className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
    >
      <div className="bg-neutral-dark border-t-4 border-accent-yellow mx-auto max-w-5xl mb-4 mx-4 sm:mx-auto rounded-lg shadow-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-bg-white font-bold text-lg mb-1">
              🍪 Política de Cookies
            </h3>
            <p
              id="cookie-consent-description"
              className="text-neutral-light text-sm leading-relaxed"
            >
              Utilizamos cookies para melhorar sua experiência e analisar o
              tráfego do site. Ao aceitar, você concorda com nossa{" "}
              <a
                href="/privacidade"
                className="text-accent-yellow underline hover:text-accent-orange transition-colors"
              >
                Política de Privacidade
              </a>{" "}
              conforme a LGPD (Lei 13.709/2018).
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleReject}
              className="px-5 py-2.5 text-sm font-medium text-neutral-light 
                         border border-neutral-light rounded-lg
                         hover:bg-neutral-light hover:text-neutral-dark
                         transition-all duration-200
                         focus-visible:ring-2 focus-visible:ring-accent-yellow"
              aria-label="Rejeitar cookies"
            >
              Rejeitar
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 text-sm font-bold text-neutral-dark 
                         bg-accent-yellow rounded-lg
                         hover:bg-accent-orange hover:text-bg-white
                         transition-all duration-200
                         focus-visible:ring-2 focus-visible:ring-bg-white"
              aria-label="Aceitar cookies"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend Window for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
