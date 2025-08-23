"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function MermaidFlowChart() {
  const ref = useRef(null);

  const chart = `
    flowchart TD
      A[Fetch order data from database] --> B[Group orders by date]
      B --> C[Return aggregated data via API]
      C --> D[Client fetches data from API]
      D --> E[Display daily order count in UI]
  `;

  useEffect(() => {
    if (ref.current) {
      // Inject the Mermaid diagram syntax as text content
      ref.current.innerHTML = chart;

      // Initialize and render Mermaid diagrams inside this element
      mermaid.initialize({ startOnLoad: true });

      // This tells Mermaid to parse and render all diagrams inside the DOM,
      // including the one we just added.
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div
      ref={ref}
      className="mermaid"
      style={{
        backgroundColor: "#1e293b",
        color: "#fff",
        padding: "1rem",
        borderRadius: "8px",
      }}
    />
  );
}
