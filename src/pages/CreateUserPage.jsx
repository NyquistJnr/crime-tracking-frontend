import React, { useState } from "react";
import api from "../services/api";
import styles from "./CreateUserPage.module.css";

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Police", // Default role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { name, email, password, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !role) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await api.post("/users/register", formData);
      if (response.data.success) {
        setSuccess(`User "${response.data.data.name}" created successfully!`);
        // Clear the form
        setFormData({ name: "", email: "", password: "", role: "Police" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Create New User</h1>
        <p className={styles.subHeader}>
          Create accounts for new "Admin" or "Police" personnel.
        </p>

        {error && (
          <div className={`${styles.message} ${styles.error}`}>{error}</div>
        )}
        {success && (
          <div className={`${styles.message} ${styles.success}`}>{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              className={styles.input}
              placeholder="e.g., John Doe"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className={styles.input}
              placeholder="e.g., officer@department.gov"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              className={styles.input}
              placeholder="Enter a strong password"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.label}>
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={onChange}
              className={styles.select}
              required
            >
              <option value="Police">Police</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
