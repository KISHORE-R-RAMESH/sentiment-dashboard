import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CategoryBar({ categories, onBarClick }) {
  const labels = Object.keys(categories);
  const pos = labels.map(l => categories[l].positive);
  const neu = labels.map(l => categories[l].neutral);
  const neg = labels.map(l => categories[l].negative);

  const data = {
    labels,
    datasets: [
      { label: "Positive", data: pos, backgroundColor: "#6f42c1" },
      { label: "Neutral", data: neu, backgroundColor: "#20c997" },
      { label: "Negative", data: neg, backgroundColor: "#dc3545" },
    ],
  };

  const options = {
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        onBarClick(labels[index]);
      }
    },
    responsive: true,
    scales: { y: { beginAtZero: true } },
  };

  return <Bar data={data} options={options} />;
}
