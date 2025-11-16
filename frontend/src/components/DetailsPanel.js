import React from "react";

export default function DetailsPanel({ title, reviews, onClose }) {
  if (!reviews) return null;

  return (
    <div className="details-panel">
      <button className="close-btn" onClick={onClose}>✖</button>
      <h2>{title}</h2>
      <ul>
        {reviews.map(r => (
          <li key={r.id}>
            <strong>{r.analysis.label.toUpperCase()}</strong> — {r.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
