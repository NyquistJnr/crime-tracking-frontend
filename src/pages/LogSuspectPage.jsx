import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./LogSuspectPage.module.css";

const LogSuspectPage = () => {
  const { reportId } = useParams(); // Get the report ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    NIN: "",
    name: "",
    crimeType: "",
    crimeDescription: "",
    bailStatus: "In Custody",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { NIN, name, crimeType, crimeDescription, bailStatus } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!NIN || !name || !crimeType || !crimeDescription) {
      setError("All fields except Bail Status are required.");
      return;
    }

    const suspectData = { ...formData, linkedReportId: reportId };

    try {
      const response = await api.post("/suspects", suspectData);
      if (response.data.success) {
        setSuccess("Suspect successfully logged! Redirecting...");
        setTimeout(() => {
          navigate(`/police/report/${reportId}`); // Redirect back to the report detail page
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to log suspect.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Log New Suspect</h1>
        <p className={styles.subHeader}>
          Enter details for a suspect linked to Case ID:{" "}
          <strong>{reportId}</strong>
        </p>

        {error && (
          <div className={`${styles.message} ${styles.error}`}>{error}</div>
        )}
        {success && (
          <div className={`${styles.message} ${styles.success}`}>{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="NIN" className={styles.label}>
                Suspect NIN
              </label>
              <input
                type="text"
                id="NIN"
                name="NIN"
                value={NIN}
                onChange={onChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Suspect Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                className={styles.input}
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="crimeType" className={styles.label}>
              Crime Type
            </label>
            <input
              type="text"
              id="crimeType"
              name="crimeType"
              value={crimeType}
              onChange={onChange}
              className={styles.input}
              placeholder="e.g., Grand Larceny"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="crimeDescription" className={styles.label}>
              Crime Description
            </label>
            <textarea
              id="crimeDescription"
              name="crimeDescription"
              value={crimeDescription}
              onChange={onChange}
              className={styles.textarea}
              placeholder="Describe the suspect's involvement..."
              required
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bailStatus" className={styles.label}>
              Bail Status
            </label>
            <select
              id="bailStatus"
              name="bailStatus"
              value={bailStatus}
              onChange={onChange}
              className={styles.select}
            >
              <option value="In Custody">In Custody</option>
              <option value="On Bail">On Bail</option>
              <option value="Released">Released</option>
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Log Suspect
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogSuspectPage;
