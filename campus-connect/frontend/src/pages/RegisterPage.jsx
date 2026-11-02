import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: 'STUDENT',
    studentId: '',
    department: 'Computer Science',
    academicYear: 1,
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'academicYear' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    const result = await register(formData);
    setSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '520px', margin: '2rem auto' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Student &amp; User Registration</h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Create an account on the CampusConnect portal
          </p>
        </div>

        {error && (
          <div className="form-error-msg" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username *</label>
              <input
                id="username"
                name="username"
                type="text"
                className="form-input"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="e.g. jdoe24"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="user@campusconnect.edu"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-input"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password (min 6 chars) *</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          {formData.role === 'STUDENT' && (
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem', color: '#1e3a8a' }}>
                🎓 Student Academic Profile Information
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="studentId">Student ID Code</label>
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    className="form-input"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g. STU-2024-055"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="academicYear">Academic Year</label>
                  <select
                    id="academicYear"
                    name="academicYear"
                    className="form-select"
                    value={formData.academicYear}
                    onChange={handleChange}
                  >
                    <option value="1">Year 1 (Freshman)</option>
                    <option value="2">Year 2 (Sophomore)</option>
                    <option value="3">Year 3 (Junior)</option>
                    <option value="4">Year 4 (Senior)</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Comm">Electronics &amp; Comm</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem' }}
            disabled={submitting}
          >
            {submitting ? 'Registering Account...' : 'Complete Registration'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb', fontWeight: 600 }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
