"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import ReactGA from "react-ga4";

const AnalyticsContext = createContext(null);

export function AnalyticsProvider({ measurementId = "G-F1ZHM4DRV4", children }) {
  // Initialize only on client
  useEffect(() => {
    if (!measurementId) return;
    try {
      ReactGA.initialize(measurementId);
      // send an initial pageview
      if (typeof window !== "undefined") {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
      }
    } catch (e) {
      // fail silently in dev or if GA blocked
      console.warn("ReactGA init failed", e);
    }
  }, [measurementId]);

  const api = useMemo(() => ({
    pageview: (path) => {
      if (!path && typeof window !== "undefined") path = window.location.pathname;
      try {
        ReactGA.send({ hitType: "pageview", page: path });
      } catch (e) {}
    },
    event: ({ category, action, label, value }) => {
      try {
        ReactGA.event({ category, action, label, value });
      } catch (e) {}
    },
  }), []);

  return <AnalyticsContext.Provider value={api}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) {
    throw new Error("useAnalytics must be used within AnalyticsProvider");
  }
  return ctx;
}

export default AnalyticsContext;
