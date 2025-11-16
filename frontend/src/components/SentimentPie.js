import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SentimentPie({ pos, neu, neg, onSegmentClick }) {
  const data = {
    labels: ["positive", "neutral", "negative"],
    datasets: [
      {
        data: [pos, neu, neg],
        backgroundColor: ["#6f42c1", "#20c997", "#dc3545"],
      },
    ],
  };

  const options = {
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];
        onSegmentClick(label);
      }
    },
  };

  return <Pie data={data} options={options} />;
}
