import { useState, useEffect } from "react";
import { getTotalListings } from "./api";
import "./App.css";

function App() {
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTotalListings()
      .then((response) => {
        setTotal(response.data.total);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data. Is the backend running?");
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Business Listings Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="stat-card">
          <h2>Total Listings</h2>
          <p className="stat-number">{total}</p>
        </div>
      )}
    </div>
  );
}

export default App;