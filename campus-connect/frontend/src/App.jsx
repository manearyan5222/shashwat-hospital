import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
import EnrollmentsPage from './pages/EnrollmentsPage';
import PlacementsPage from './pages/PlacementsPage';
import ReportsPage from './pages/ReportsPage';
import FluxArchitecturePage from './pages/FluxArchitecturePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/enrollments" element={<EnrollmentsPage />} />
              <Route path="/placements" element={<PlacementsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/flux-demo" element={<FluxArchitecturePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <div className="footer-inner">
              <div className="footer-top">
                <div className="footer-brand-info">
                  <div className="footer-brand-name">🎓 CampusConnect Portal</div>
                  <p className="footer-brand-desc">
                    Comprehensive student, course, and campus placement management portal demonstrating modern full-stack web engineering.
                  </p>
                </div>
                <div className="footer-nav">
                  <div className="footer-heading">Quick Navigation</div>
                  <ul className="footer-nav-list">
                    <li><a href="/dashboard">Campus Dashboard</a></li>
                    <li><a href="/courses">Course Catalog</a></li>
                    <li><a href="/placements">Placement Drives</a></li>
                    <li><a href="/reports">JDBC Reports</a></li>
                    <li><a href="/flux-demo">FLUX Architecture</a></li>
                  </ul>
                </div>
                <div className="footer-tech">
                  <div className="footer-heading">Architecture Stack</div>
                  <div className="footer-tech-tags">
                    <span className="footer-tag">Spring Boot 3.3</span>
                    <span className="footer-tag">React 18 SPA</span>
                    <span className="footer-tag">MySQL &amp; JPA</span>
                    <span className="footer-tag">Embedded Tomcat</span>
                    <span className="footer-tag">Raw JDBC</span>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <div>&copy; {new Date().getFullYear()} CampusConnect Portal. All rights reserved.</div>
                <div className="footer-status-pill">
                  <span className="footer-status-dot" /> Backend Services Connected
                </div>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
