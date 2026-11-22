"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Anonymous visit counter (GoatCounter: no cookies, no personal data).
// Dashboard: https://alokparihar-notes.goatcounter.com
const GOATCOUNTER_URL = "https://alokparihar-notes.goatcounter.com/count";

declare global {
  interface Window {
    goatcounter?: {
      count?: (vars?: { path?: string }) => void;
    };
  }
}

export default function GoatCounter() {
  const pathname = usePathname();
  // Remembers the last page we counted, so one visit is never counted twice.
  const lastCounted = useRef<string | null>(null);

  function count(path: string) {
    if (lastCounted.current === path) return;
    // The script may not have loaded yet; onLoad below counts the first page then.
    if (!window.goatcounter?.count) return;
    lastCounted.current = path;
    window.goatcounter.count({ path });
  }

  // Pages here switch without a full reload, so count every route change ourselves.
  useEffect(() => {
    count(pathname);
  }, [pathname]);

  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={GOATCOUNTER_URL}
      // no_onload: we do the counting above, so the script must not also count on load.
      data-goatcounter-settings='{"no_onload": true}'
      strategy="afterInteractive"
      onLoad={() => count(window.location.pathname)}
    />
  );
}
