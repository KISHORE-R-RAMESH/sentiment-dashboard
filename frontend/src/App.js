import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import SentimentOverview from "./pages/SentimentOverview";
import CategoriesPage from "./pages/CategoriesPage";
import TrendsPage from "./pages/TrendsPage";
import ReportsPage from "./pages/ReportsPage";

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/sentiment" element={<SentimentOverview />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
