import React, { useEffect, useState } from "react";
import { fetchAnalysis } from "./api";

import SentimentKPI from "./components/SentimentKPI";
import SentimentPie from "./components/SentimentPie";
import SentimentTrend from "./components/SentimentTrend";
import CategoryBar from "./components/CategoryBar";
import DetailsPanel from "./components/DetailsPanel";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetchAnalysis().then(setData).catch(console.error);
  }, []);

  if (!data) return <div>Loading...</div>;

  const showSentimentDetails = (label) => {
    const filtered = data.reviews.filter(r => r.analysis.label === label);
    setDetails({ title: `${label.toUpperCase()} Reviews`, reviews: filtered });
  };

  const showCategoryDetails = (category) => {
    const filtered = data.reviews.filter(r => r.category === category);
    setDetails({ title: `${category.toUpperCase()} Category`, reviews: filtered });
  };

  return (
    <div className="dashboard">
      
      <div className="kpis">
        <SentimentKPI title="Positive" value={`${Math.round((data.pos/data.total)*100)}%`} />
        <SentimentKPI title="Neutral" value={`${Math.round((data.neu/data.total)*100)}%`} />
        <SentimentKPI title="Negative" value={`${Math.round((data.neg/data.total)*100)}%`} />
        <SentimentKPI title="Total Reviews" value={data.total} />
      </div>

      <div className="charts-row">
        <div className="card">
          <h3>Sentiment Distribution</h3>
          <SentimentPie 
            pos={data.pos} 
            neu={data.neu} 
            neg={data.neg}
            onSegmentClick={showSentimentDetails}
          />
        </div>

        <div className="card">
          <h3>Sentiment Trend</h3>
          <SentimentTrend trend={data.trend} />
        </div>
      </div>

      <div className="card">
        <h3>Category Breakdown</h3>
        <CategoryBar 
          categories={data.categories}
          onBarClick={showCategoryDetails}
        />
      </div>

      {details && (
        <DetailsPanel 
          title={details.title}
          reviews={details.reviews}
          onClose={() => setDetails(null)}
        />
      )}

    </div>
  );
}
