import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import PublicReportPage from "./pages/PublicReportPage";
import AdminDashboard from "./pages/AdminDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import ProtectedRoute, { AdminRoute } from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CreateUserPage from "./pages/CreateUserPage";
import ReportsListPage from "./pages/ReportsListPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import SearchSuspectPage from "./pages/SearchSuspectPage";
import LogSuspectPage from "./pages/LogSuspectPage";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {/* Conditionally render the Header */}
      {!isLoginPage && <Header />}

      <main>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route path="/" element={<PublicReportPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/police/dashboard"
            element={
              <ProtectedRoute>
                <PoliceDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-user"
            element={
              <AdminRoute>
                <CreateUserPage />
              </AdminRoute>
            }
          />
          <Route
            path="/police/reports"
            element={
              <ProtectedRoute>
                <ReportsListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/police/report/:id"
            element={
              <ProtectedRoute>
                <ReportDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/police/search-suspects"
            element={
              <ProtectedRoute>
                <SearchSuspectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/police/report/:reportId/log-suspect"
            element={
              <ProtectedRoute>
                <LogSuspectPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
