import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import styles from "./ReportDetailPage.module.css";

const ReportDetailPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get report ID from URL

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // This uses an admin endpoint, but police should have access to view single verified reports.
        // You may need to create a new police-specific endpoint or adjust middleware.
        // Assuming police can access this for now.
        const response = await api.get(`/reports/${id}`);
        setReport(response.data.data);
      } catch (error) {
        console.error("Failed to fetch report details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  if (loading)
    return <div className={styles.message}>Loading report details...</div>;
  if (!report) return <div className={styles.message}>Report not found.</div>;

  const isImage = (url) => /\.(jpeg|jpg|gif|png)$/.test(url.toLowerCase());

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div>
          <Link to="/police/reports" className={styles.backLink}>
            &larr; Back to All Reports
          </Link>
          <h1 className={styles.header}>Report Details</h1>
        </div>
        {/* Add the new button here */}
        <Link
          to={`/police/report/${id}/log-suspect`}
          className={styles.logSuspectButton}
        >
          Log Suspect for this Case
        </Link>
      </div>
      <div className={styles.grid}>
        <div className={styles.mainDetails}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Case ID</span>
            <span className={styles.value}>{report._id}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Date Reported</span>
            <span className={styles.value}>
              {new Date(report.createdAt).toLocaleString()}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Crime Type</span>
            <span className={styles.value}>{report.crimeType}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}>{report.location}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Status</span>
            <span
              className={`${styles.status} ${
                report.status === "Verified" ? styles.statusVerified : ""
              }`}
            >
              {report.status}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Reporter</span>
            <span className={styles.value}>
              {report.reporterName ? report.reporterName : "Anonymous"}
            </span>
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <h3 className={styles.sectionHeader}>Incident Description</h3>
          <p>{report.description}</p>
        </div>

        <div className={styles.multimediaSection}>
          <h3 className={styles.sectionHeader}>Submitted Evidence</h3>
          <div className={styles.mediaGrid}>
            {report.multimedia.length > 0 ? (
              report.multimedia.map((media) => (
                <div key={media.public_id} className={styles.mediaItem}>
                  {isImage(media.url) ? (
                    <img src={media.url} alt="Crime evidence" />
                  ) : (
                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Video/File
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p>No multimedia evidence was submitted.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
