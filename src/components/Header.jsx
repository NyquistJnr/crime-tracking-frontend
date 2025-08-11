import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const AdminLinks = () => (
    <>
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/admin/create-user"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
        }
      >
        Create User
      </NavLink>
      <NavLink
        to="/police/reports"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
        }
      >
        All Reports
      </NavLink>
    </>
  );

  const PoliceLinks = () => (
    <>
      <NavLink
        to="/police/dashboard"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/police/reports"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
        }
      >
        Verified Reports
      </NavLink>
      <NavLink
        to="/police/search-suspects"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
        }
      >
        Search Suspects
      </NavLink>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          {/* Placeholder for a real logo */}
          <svg
            className={styles.logoIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18a.75.75 0 00.75-.75v-4.5a.75.75 0 00-1.5 0v4.5A.75.75 0 0012 18zm0-8.25a.75.75 0 000 1.5.75.75 0 000-1.5z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className={styles.logoTitle}>Sentinel</h1>
        </div>
      </div>

      <nav className={styles.nav}>
        {user?.role === "Admin" && <AdminLinks />}
        {user?.role === "Police" && <PoliceLinks />}
      </nav>

      <div className={styles.rightSection}>
        {user && (
          <div className={styles.profileContainer}>
            <span className={styles.userName}>{user.name}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
