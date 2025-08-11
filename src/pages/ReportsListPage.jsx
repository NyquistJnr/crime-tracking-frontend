import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./ReportsListPage.module.css";

const ReportsListPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerifiedReports = async () => {
      try {
        const response = await api.get("/reports/verified");
        setReports(response.data.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVerifiedReports();
  }, []);

  if (loading) return <div className={styles.message}>Loading reports...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Verified Crime Reports</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Crime Type</th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report._id}>
                  <td className={styles.td}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className={styles.td}>{report.crimeType}</td>
                  <td className={styles.td}>{report.location}</td>
                  <td className={styles.td}>
                    <span className={styles.statusVerified}>
                      {report.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <button
                      onClick={() => navigate(`/police/report/${report._id}`)}
                      className={styles.button}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.message}>
                  No verified reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsListPage;
