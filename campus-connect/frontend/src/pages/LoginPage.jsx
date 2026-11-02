import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isDemoMode } from '../services/demoStore';

export default function LoginPage() {
  const { login, state } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@Campus2026!');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = await login(username, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Invalid credentials');
    }
  };

  const setDemoUser = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setErrorMessage('');
  };

  const handleQuickLogin = async (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setErrorMessage('');
    setIsSubmitting(true);
    const result = await login(user, pass);
    setIsSubmitting(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '460px', margin: '3rem auto' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Welcome to CampusConnect</h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            Institutional Portal Authentication
          </p>
          {isDemoMode() && (
            <div style={{ marginTop: '0.5rem' }}>
              <span className="demo-mode-badge">
                Standalone Demo Active
              </span>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="form-error-msg" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', color: '#991b1b', fontSize: '0.88rem' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username or Institutional Email</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="e.g. admin, faculty, or student"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', fontWeight: 600 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Demo Institutional Accounts:
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Click to Sign In</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '0.6rem 0.75rem', 
                background: '#f8fafc', 
                borderRadius: '6px', 
                border: '1px solid var(--border)',
                cursor: 'pointer',
              }}
              onClick={() => handleQuickLogin('admin', 'Admin@Campus2026!')}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>👑 Administrator</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>admin / Admin@Campus2026!</div>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={(e) => { e.stopPropagation(); handleQuickLogin('admin', 'Admin@Campus2026!'); }}
              >
                Sign In &rarr;
              </button>
            </div>

            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '0.6rem 0.75rem', 
                background: '#f8fafc', 
                borderRadius: '6px', 
                border: '1px solid var(--border)',
                cursor: 'pointer',
              }}
              onClick={() => handleQuickLogin('faculty', 'Faculty@Campus2026!')}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>👨‍🏫 Faculty Member</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>faculty / Faculty@Campus2026!</div>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={(e) => { e.stopPropagation(); handleQuickLogin('faculty', 'Faculty@Campus2026!'); }}
              >
                Sign In &rarr;
              </button>
            </div>

            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '0.6rem 0.75rem', 
                background: '#f8fafc', 
                borderRadius: '6px', 
                border: '1px solid var(--border)',
                cursor: 'pointer',
              }}
              onClick={() => handleQuickLogin('student', 'Student@Campus2026!')}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>👨‍🎓 Student</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>student / Student@Campus2026!</div>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={(e) => { e.stopPropagation(); handleQuickLogin('student', 'Student@Campus2026!'); }}
              >
                Sign In &rarr;
              </button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: '#64748b' }}>
          Need a student profile? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create student account</Link>
        </div>
      </div>
    </div>
  );
}
