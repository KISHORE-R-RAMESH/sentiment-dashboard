import React, { useEffect, useState } from "react";
import { fetchAnalysis } from "../api";

export default function CategoriesPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalysis().then(setData).catch(console.error);
  }, []);

  if (!data) return <div style={{ padding: "20px" }}>Loading...</div>;

  const categories = data.categories;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📁 Category Breakdown</h2>
      <p>Here is the sentiment distribution for each customer category.</p>

      <table style={{
        width: "70%",
        marginTop: "20px",
        borderCollapse: "collapse",
        background: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <thead>
          <tr style={{ background: "#1a2b3c", color: "white", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>Category</th>
            <th style={{ padding: "10px" }}>Positive</th>
            <th style={{ padding: "10px" }}>Neutral</th>
            <th style={{ padding: "10px" }}>Negative</th>
            <th style={{ padding: "10px" }}>Total</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(categories).map((cat) => (
            <tr key={cat}>
              <td style={{ padding: "10px", fontWeight: "bold" }}>{cat}</td>
              <td style={{ padding: "10px" }}>{categories[cat].positive}</td>
              <td style={{ padding: "10px" }}>{categories[cat].neutral}</td>
              <td style={{ padding: "10px" }}>{categories[cat].negative}</td>
              <td style={{ padding: "10px" }}>{categories[cat].total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br /><br />

      <h3>📄 Sample Reviews by Category</h3>
      {Object.keys(categories).map((cat) => (
        <div key={cat} style={{
          background: "#ffffff",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(0,0,0,0.1)"
        }}>
          <h4>{cat.toUpperCase()} ({categories[cat].total} reviews)</h4>
          <ul>
            {data.reviews
              .filter(r => r.category === cat)
              .slice(0, 5)
              .map(r => (
                <li key={r.id}>
                  <strong>{r.analysis.label.toUpperCase()}</strong>: {r.text}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
