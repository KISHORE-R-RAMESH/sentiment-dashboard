import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        📊 Customer Sentiment Analysis
      </div>

      <div className="nav-links">
        <div className="nav-item" onClick={() => navigate("/")}>🏠 Dashboard</div>
        <div className="nav-item" onClick={() => navigate("/sentiment")}>😊 Sentiment Overview</div>
        <div className="nav-item" onClick={() => navigate("/categories")}>📁 Categories</div>
        <div className="nav-item" onClick={() => navigate("/trends")}>📈 Trends</div>
        <div className="nav-item" onClick={() => navigate("/reports")}>📊 Reports</div>
      </div>
    </div>
  );
}
