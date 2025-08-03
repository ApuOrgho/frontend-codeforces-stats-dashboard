// src/components/VerdictList.js
import React from "react";

export default function VerdictList({ verdicts }) {
  if (!verdicts) return null;

  // Colors for each verdict
  const verdictColors = {
    OK: "#4CAF50",
    WRONG_ANSWER: "#F44336",
    COMPILATION_ERROR: "#FF9800",
    RUNTIME_ERROR: "#9C27B0",
    TIME_LIMIT_EXCEEDED: "#2196F3",
    MEMORY_LIMIT_EXCEEDED: "#00BCD4",
    IDLENESS_LIMIT_EXCEEDED: "#795548",
    CHALLENGED: "#E91E63",
    SKIPPED: "#607D8B",
  };

  return (
    <section className="verdict-list-section">
      <h2>Verdict Summary</h2>
      <ul className="verdict-list">
        {Object.entries(verdicts).map(([verdict, count]) => (
          <li key={verdict} className="verdict-item">
            <span
              className="verdict-badge"
              style={{ backgroundColor: verdictColors[verdict] || "#888" }}
            >
              {verdict}
            </span>
            <span className="verdict-count">{count}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
