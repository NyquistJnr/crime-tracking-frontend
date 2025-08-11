import React from "react";
import { Link } from "react-router-dom";
import styles from "./PoliceDashboard.module.css";

const PoliceDashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Police Dashboard</h1>
      <p className={styles.subHeader}>Welcome. Please select an action.</p>
      <div className={styles.actionGrid}>
        <Link to="/police/reports" className={styles.actionCard}>
          <h2>View Verified Reports</h2>
          <p>
            Review all incoming reports that have been verified by an
            administrator.
          </p>
        </Link>
        <Link to="/police/search-suspects" className={styles.actionCard}>
          <h2>Search Suspects</h2>
          <p>Look up individuals by NIN or other identifiers.</p>
        </Link>
        <div className={`${styles.actionCard} ${styles.disabled}`}>
          <h2>Active Cases</h2>
          <p>Manage your assigned and active investigations. (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;
