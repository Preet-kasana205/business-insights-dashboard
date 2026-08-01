import { useState, useEffect } from "react";
import {
  getTotalListings,
  getCityWiseCounts,
  getCategoryWiseCounts,
  getSourceWiseCounts,
  getLatestListings,
} from "./api";
import ListingsBarChart from "./components/ListingsBarChart";
import SummaryCard from "./components/SummaryCard";
import ListingsTable from "./components/ListingsTable";
import "./App.css";

function App() {
  const [total, setTotal] = useState(0);
  const [cityData, setCityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [latestListings, setLatestListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getTotalListings(),
      getCityWiseCounts(),
      getCategoryWiseCounts(),
      getSourceWiseCounts(),
      getLatestListings(),
    ])
      .then(([totalRes, cityRes, categoryRes, sourceRes, latestRes]) => {
        setTotal(totalRes.data.total);
        setCityData(cityRes.data);
        setCategoryData(categoryRes.data);
        setSourceData(sourceRes.data);
        setLatestListings(latestRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data. Is the backend running?");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <p className="loading-text">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Business Listings Dashboard</h1>
        <p className="subtitle">Analytics of scraped business listings.</p>
      </header>

      <div className="summary-grid">
        <SummaryCard label="Total Listings" value={total} />
        <SummaryCard label="Total Cities" value={cityData.length} />
        <SummaryCard label="Total Categories" value={categoryData.length} />
        <SummaryCard label="Total Sources" value={sourceData.length} />
      </div>

      <div className="charts-grid">
        <ListingsBarChart title="Listings by City" data={cityData} dataKey="city" color="#2563eb" />
        <ListingsBarChart title="Listings by Category" data={categoryData} dataKey="category" color="#16a34a" />
        <ListingsBarChart title="Listings by Source" data={sourceData} dataKey="source" color="#ea580c" />
      </div>

      <section className="table-section">
        <h2>Latest Listings</h2>
        <ListingsTable data={latestListings} />
      </section>
    </div>
  );
}

export default App;
