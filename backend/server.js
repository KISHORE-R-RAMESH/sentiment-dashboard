const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { analyzeText } = require("./sentiment");

const app = express();
app.use(cors());
app.use(express.json());

// Load reviews
const DATA_PATH = path.join(__dirname, "sample_reviews.json");
let rawReviews = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

// API: analyze all reviews
app.get("/api/analyze", (req, res) => {
  const reviews = rawReviews.map((r) => {
    const analysis = analyzeText(r.text);
    return { ...r, analysis };
  });

  const total = reviews.length;
  const pos = reviews.filter((r) => r.analysis.label === "positive").length;
  const neg = reviews.filter((r) => r.analysis.label === "negative").length;
  const neu = reviews.filter((r) => r.analysis.label === "neutral").length;

  // Trend mock data
  const trend = reviews.map((r, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    label: r.analysis.label
  }));

  // Category breakdown
  const categories = {};
  reviews.forEach((r) => {
    const cat = r.category || "other";
    if (!categories[cat]) {
      categories[cat] = { positive: 0, negative: 0, neutral: 0, total: 0 };
    }
    categories[cat].total++;
    categories[cat][r.analysis.label]++;
  });

  res.json({ total, pos, neg, neu, reviews, trend, categories });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
