"use client";

import { useEffect } from "react";

export default function ScrollTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Leave deep links like /services#ai-and-innovation at their anchor.
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return null;
}
