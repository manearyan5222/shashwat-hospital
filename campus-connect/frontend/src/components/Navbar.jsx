import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isDemoMode } from '../services/demoStore';

export default function Navbar() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const { user, isAuthenticated } = state;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <div className="brand-icon" aria-hidden="true">🎓</div>
          <div>
            <div className="brand-name">CampusConnect</div>
          </div>
          <span className="brand-tag">Spring + React</span>
          {isDemoMode() && (
            <span className="demo-mode-badge" title="Self-contained demo mode: zero backend or tunnel dependencies">
              Demo Mode
            </span>
          )}
        </NavLink>

        {/* Collapsible Hamburger Toggle Button */}
        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Nav Links Container */}
        <nav className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/dashboard" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-icon" aria-hidden="true">📊</span>
                <span className="nav-text">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/students" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-icon" aria-hidden="true">👨‍🎓</span>
                <span className="nav-text">Students</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-icon" aria-hidden="true">📚</span>
                <span className="nav-text">Courses</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrollments" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-icon" aria-hidden="true">📝</span>
                <span className="nav-text">Enrollments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/placements" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-icon" aria-hidden="true">💼</span>
                <span className="nav-text">Placements</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-icon" aria-hidden="true">⚡</span>
                <span className="nav-text">JDBC Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/flux-demo" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-icon" aria-hidden="true">🔄</span>
                <span className="nav-text">FLUX Architecture</span>
              </NavLink>
            </li>
          </ul>

          <div className="user-controls">
            {isAuthenticated && user ? (
              <div className="user-profile-group">
                <div className="user-pill">
                  <span className="user-name">{user.fullName || user.username}</span>
                  <span className={`user-role-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  title="Log Out of your account"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink 
                to="/login" 
                onClick={closeMenu} 
                className="btn btn-primary btn-sm btn-signin"
                style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Sign In
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
