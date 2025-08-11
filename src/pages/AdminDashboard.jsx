import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import styles from "./AdminDashboard.module.css";
// import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import api from "../services/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const [reportsRes, statsRes] = await Promise.all([
        api.get("/reports"),
        api.get("/reports/stats"),
      ]);

      setReports(reportsRes.data.data);
      setStats(statsRes.data.data);
    } catch (err) {
      setError("Failed to fetch dashboard data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (reportId) => {
    if (!window.confirm("Are you sure you want to verify this report?")) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await api.put(`/reports/${reportId}/verify`, {});
      fetchData(); // Refresh all data
    } catch (err) {
      alert("Failed to verify report.");
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user]);

  const getStatusClass = (status) => {
    if (status === "Pending") return styles.statusPending;
    if (status === "Verified") return styles.statusVerified;
    return styles.statusClosed;
  };

  if (loading)
    return <div className={styles.message}>Loading Dashboard...</div>;
  if (error)
    return <div className={`${styles.message} ${styles.error}`}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.header}>Admin Dashboard</h1>
        <Link to="/admin/create-user" className={styles.headerButton}>
          + Create New User
        </Link>
      </div>
      <div className={styles.topStats}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Reports</div>
          <div className={styles.statNumber}>{reports.length}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pending</div>
          <div className={styles.statNumber}>
            {reports.filter((r) => r.status === "Pending").length}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Verified</div>
          <div className={styles.statNumber}>
            {reports.filter((r) => r.status === "Verified").length}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>System Uptime</div>
          <div className={styles.statNumber}>99.8%</div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartHeader}>Monthly Statistics</h3>
          <BarChart />
        </div>
        <div className={styles.chartCard}>
          <h3 className={styles.chartHeader}>Crime Distribution</h3>
          <div className={styles.chartWrapper}>
            {stats.length > 0 ? (
              <DoughnutChart chartData={stats} />
            ) : (
              <div className={styles.message}>No data for chart.</div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h2 className={styles.header}>Recent Crime Reports</h2>
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
              reports.slice(0, 5).map((report) => (
                <tr key={report._id}>
                  <td className={styles.td}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className={styles.td}>{report.crimeType}</td>
                  <td className={styles.td}>{report.location}</td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.status} ${getStatusClass(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    {report.status === "Pending" && (
                      <button
                        onClick={() => handleVerify(report._id)}
                        className={styles.button}
                      >
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.message}>
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
