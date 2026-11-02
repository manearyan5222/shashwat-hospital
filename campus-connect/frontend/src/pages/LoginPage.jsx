import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, state } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
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

  return (
    <div style={{ maxWidth: '440px', margin: '3rem auto' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Welcome to CampusConnect</h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            Sign in with institutional credentials
          </p>
        </div>

        {errorMessage && (
          <div className="form-error-msg" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username or Email</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="e.g. admin or alex_chen"
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
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying Credentials...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Quick Demo Logins (1-Click Fill):
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setDemoUser('admin', 'password123')}
            >
              👑 Admin
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setDemoUser('prof_john', 'password123')}
            >
              👨‍🏫 Faculty
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setDemoUser('alex_chen', 'password123')}
            >
              👨‍🎓 Student
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: '#64748b' }}>
          Don't have an account? <Link to="/register" style={{ color: '#2563eb', fontWeight: 600 }}>Register student</Link>
        </div>
      </div>
    </div>
  );
}
