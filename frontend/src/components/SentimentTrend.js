import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Legend
);

export default function SentimentTrend({ trend }) {
  const counts = { positive: [], neutral: [], negative: [] };
  const labels = trend.map((t) => t.date);

  trend.forEach((t) => {
    counts.positive.push(t.label === "positive" ? 1 : 0);
    counts.neutral.push(t.label === "neutral" ? 1 : 0);
    counts.negative.push(t.label === "negative" ? 1 : 0);
  });

  const data = {
    labels,
    datasets: [
      { label: "Positive", data: counts.positive, borderColor: "#6f42c1", tension: 0.3 },
      { label: "Neutral", data: counts.neutral, borderColor: "#20c997", tension: 0.3 },
      { label: "Negative", data: counts.negative, borderColor: "#dc3545", tension: 0.3 }
    ]
  };

  return <Line data={data} />;
}
