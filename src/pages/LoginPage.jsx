import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(
          result.data.role === "Admin"
            ? "/admin/dashboard"
            : "/police/dashboard"
        );
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.logo}>
          {/* Replace with your actual logo image or component */}
          <div
            style={{
              backgroundColor: "#C00",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
              color: "#FFF",
              fontSize: "2em",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm11.25-1.5a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zM12 13.5a.75.75 0 01-.75-.75V9a.75.75 0 011.5 0v3.75a.75.75 0 01-.75.75zM7.5 9a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0V9zm9 0a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h2 className={styles.title}>Crime Tracking System</h2>
        <p className={styles.subtitle}>Authorized Personnel Only</p>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <div className={styles.inputWithIcon}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67a3 3 0 00-3-3H4.5a3 3 0 00-3 3z" />
                <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0V9zM11.25 13.5a.75.75 0 001.5 0v.75a.75.75 0 00-1.5 0v-.75z" />
              </svg>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="officer@department.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWithIcon}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M1.34 2.64a3 3 0 013.597-2.107c1.545.63 3.31.937 5.253.937 1.943 0 3.708-.307 5.253-.937a3 3 0 013.597 2.107v19.72a3 3 0 01-3.597 2.107c-1.545-.63-3.31-.937-5.253-.937-1.943 0-3.708.307-5.253.937a3 3 0 01-3.597-2.107V2.64zm10.5 8.25a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className={styles.togglePassword}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18z" />
                  <path d="M12 5.5a7 7 0 017 7 7 7 0 01-7 7 7 7 0 01-7-7 7 7 0 017-7zm0 9a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.options}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              Remember me
            </label>
            <button type="button" className={styles.forgotPassword}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className={styles.loginButton}>
            Secure Login
          </button>
        </form>

        <p className={styles.disclaimer}>
          This system is for authorized personnel only. All activities are
          monitored and logged.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
