import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./SearchSuspectPage.module.css";

const SearchSuspectPage = () => {
  const [nin, setNin] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!nin) {
      setError("Please enter an NIN to search.");
      return;
    }
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const response = await api.get(`/suspects/verify/${nin}`);
      setResults(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (reportId) => {
    navigate(`/police/report/${reportId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Verify Suspect by NIN</h1>
      <p className={styles.subHeader}>
        Enter a National Identification Number to check for prior records.
      </p>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={nin}
          onChange={(e) => setNin(e.target.value)}
          className={styles.searchInput}
          placeholder="Enter 9-digit NIN..."
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className={styles.resultsContainer}>
        {error && (
          <p className={`${styles.message} ${styles.error}`}>{error}</p>
        )}

        {results && results.length > 0 && (
          <>
            <h2 className={styles.resultsHeader}>
              Found {results.length} Record(s)
            </h2>
            {results.map((record) => (
              <div
                key={record._id}
                className={styles.recordCard}
                onClick={() => handleCardClick(record.linkedReport._id)}
              >
                <div className={styles.recordHeader}>
                  <h3>{record.crimeType}</h3>
                  <span className={styles.recordDate}>
                    Logged: {new Date(record.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={styles.recordDescription}>
                  {record.crimeDescription}
                </p>
                <div className={styles.recordFooter}>
                  <span>
                    <strong>Bail Status:</strong> {record.bailStatus}
                  </span>
                  <span>
                    <strong>Linked Case ID:</strong> {record.linkedReport._id}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}

        {results && results.length === 0 && (
          <p className={styles.message}>No records found for this NIN.</p>
        )}
      </div>
    </div>
  );
};

export default SearchSuspectPage;
