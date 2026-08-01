import { useState, useEffect } from "react";
import {
  getTotalListings,
  getCityWiseCounts,
  getCategoryWiseCounts,
  getSourceWiseCounts,
} from "./api";
import ListingsBarChart from "./components/ListingsBarChart";
import "./App.css";

function App() {
  const [total, setTotal] = useState(null);
  const [cityData, setCityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getTotalListings(),
      getCityWiseCounts(),
      getCategoryWiseCounts(),
      getSourceWiseCounts(),
    ])
      .then(([totalRes, cityRes, categoryRes, sourceRes]) => {
        setTotal(totalRes.data.total);
        setCityData(cityRes.data);
        setCategoryData(categoryRes.data);
        setSourceData(sourceRes.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data. Is the backend running?");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="dashboard"><p>Loading...</p></div>;
  if (error) return <div className="dashboard"><p className="error">{error}</p></div>;

  return (
    <div className="dashboard">
      <h1>Business Listings Dashboard</h1>

      <div className="stat-card">
        <h2>Total Listings</h2>
        <p className="stat-number">{total}</p>
      </div>

      <div className="charts-grid">
        <ListingsBarChart title="Listings by City" data={cityData} dataKey="city" />
        <ListingsBarChart title="Listings by Category" data={categoryData} dataKey="category" />
        <ListingsBarChart title="Listings by Source" data={sourceData} dataKey="source" />
      </div>
    </div>
  );
}

export default App;