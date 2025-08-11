import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./PublicReportPage.module.css";

const PublicReportPage = () => {
  const [formData, setFormData] = useState({
    crimeType: "",
    location: "",
    description: "",
    reporterName: "", // For contact info
  });
  const [files, setFiles] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const { crimeType, location, description, reporterName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = (e) => setFiles(e.target.files);
  const handleAnonymousChange = (e) => setIsAnonymous(e.target.value === "yes");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!crimeType || !location || !description) {
      setError("Crime Type, Location, and Description are required.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("crimeType", crimeType);
    submissionData.append("location", location);
    submissionData.append("description", description);
    if (!isAnonymous) {
      submissionData.append("reporterName", reporterName);
    }

    for (let i = 0; i < files.length; i++) {
      submissionData.append("multimedia", files[i]);
    }

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reports`,
        submissionData,
        config
      );

      if (response.data.success) {
        setSuccess(
          "Report submitted successfully! Thank you for your contribution."
        );
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit report.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.mainHeader}>
        <h1>Report a Crime</h1>
        <p>Help keep your community safe by reporting criminal activities</p>
      </header>

      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          {/* Icon for Crime Report Form */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              d="M3.75 4.5a.75.75 0 01.75-.75h.75c.343 0 .68.043 1.001.124A4.5 4.5 0 0110.5 3.75h3a4.5 4.5 0 014.249 2.124c.321-.08.658-.124 1.001-.124h.75a.75.75 0 010 1.5h-.75a3 3 0 00-2.25 1.125A3 3 0 0015 8.25h-6a3 3 0 00-1.75.525A3 3 0 005.25 6h-.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
            <path d="M4.5 9.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75z" />
          </svg>
          <h2>Crime Report Form</h2>
        </div>
        <p
          style={{
            color: "#AAAAAA",
            fontSize: "0.9rem",
            marginTop: "-15px",
            marginBottom: "20px",
          }}
        >
          Provide as much detail as possible to help law enforcement respond
          effectively
        </p>

        {error && (
          <div className={`${styles.message} ${styles.error}`}>{error}</div>
        )}
        {success && (
          <div className={`${styles.message} ${styles.success}`}>{success}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={onChange}
              className={styles.input}
              placeholder="Enter address or landmark"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="crimeType" className={styles.label}>
              Crime Type
            </label>
            <select
              id="crimeType"
              name="crimeType"
              value={crimeType}
              onChange={onChange}
              className={styles.select}
            >
              <option value="">Select crime type</option>
              <option value="Theft/Robbery">Theft/Robbery</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Assault">Assault</option>
              <option value="Drug Activity">Drug Activity</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="description" className={styles.label}>
              Detailed Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={onChange}
              className={styles.textarea}
              placeholder="Describe what happened, when it occurred, and any other relevant details..."
            ></textarea>
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Upload Evidence</label>
            <input
              type="file"
              name="multimedia"
              onChange={onFileChange}
              multiple
              className={styles.input}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Submit Anonymously</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="anonymous"
                  value="yes"
                  checked={isAnonymous}
                  onChange={handleAnonymousChange}
                />{" "}
                Yes, I want to remain anonymous
              </label>
              <label>
                <input
                  type="radio"
                  name="anonymous"
                  value="no"
                  checked={!isAnonymous}
                  onChange={handleAnonymousChange}
                />{" "}
                No, provide my contact info
              </label>
            </div>
          </div>
          {!isAnonymous && (
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="reporterName" className={styles.label}>
                Contact Information (Optional)
              </label>
              <input
                type="text"
                id="reporterName"
                name="reporterName"
                value={reporterName}
                onChange={onChange}
                className={styles.input}
                placeholder="Phone number or email for follow up"
              />
            </div>
          )}
          <div className={styles.fullWidth}>
            <button type="submit" className={styles.submitButton}>
              Submit Crime Report
            </button>
          </div>
        </form>
      </div>

      <div className={styles.emergencyContacts}>
        <div className={styles.contactsGrid}>
          <div className={`${styles.contactCard} ${styles.emergency}`}>
            <h3>Emergency</h3>
            <p>911</p>
          </div>
          <div className={`${styles.contactCard} ${styles.nonEmergency}`}>
            <h3>Non-Emergency</h3>
            <p>(555) 123-4567</p>
          </div>
          <div className={`${styles.contactCard} ${styles.anonymousTip}`}>
            <h3>Anonymous Tip Line</h3>
            <p>(555) 987-6543</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicReportPage;
