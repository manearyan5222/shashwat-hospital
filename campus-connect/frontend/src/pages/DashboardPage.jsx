import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { reportService } from '../services/reportService';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import EmptyState from '../components/EmptyState';

export default function DashboardPage() {
  const { state } = useAuth();
  const { user, isAuthenticated } = state;

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Dynamic academic year computation
  const currentYear = new Date().getFullYear();
  const academicTerm = `Academic Year ${currentYear}–${currentYear + 1}`;

  const loadData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const data = await reportService.getDashboardSummary();
      setSummary(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics from backend.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const hasMetrics = summary && (summary.totalStudents > 0 || summary.totalCourses > 0 || summary.totalOpportunities > 0);
  const hasDepartments = summary && summary.studentsByDepartment && Object.keys(summary.studentsByDepartment).length > 0;
  const hasPlacements = summary && (summary.totalOpportunities > 0 || summary.totalApplications > 0 || summary.placedStudents > 0);

  return (
    <div>
      {/* Guest / Session Callout Banner when logged out */}
      {!isAuthenticated && (
        <div className="guest-callout" role="alert">
          <div className="guest-callout-text">
            👋 <strong>Public Campus Overview:</strong> You are currently viewing public metrics as a guest.
            Sign in as <strong>Student</strong>, <strong>Faculty</strong>, or <strong>Administrator</strong> to enroll in courses, submit placement applications, or access administrative tools.
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <Link to="/login" className="btn btn-primary btn-sm" aria-label="Sign In to account">
              Sign In Now &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Dashboard Top Header & Actions */}
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {user ? `Welcome back, ${user.fullName || user.username}` : 'Welcome to CampusConnect'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Campus operational summary &bull; Role:{' '}
            <strong style={{ color: user ? 'var(--primary)' : 'inherit' }}>
              {user ? user.role : 'PUBLIC GUEST'}
            </strong>
          </p>
        </div>

        <div className="dashboard-actions">
          <button
            type="button"
            onClick={() => loadData(true)}
            className="btn btn-secondary btn-sm"
            disabled={loading || refreshing}
            title="Reload live campus metrics from the server"
            aria-label="Refresh dashboard metrics"
          >
            {refreshing ? '🔄 Refreshing...' : '🔄 Refresh'}
          </button>
          <Link to="/students" className="btn btn-secondary btn-sm" aria-label="Go to Students Roster">
            Students Roster
          </Link>
          <Link to="/courses" className="btn btn-secondary btn-sm" aria-label="Go to Course Catalog">
            Course Catalog
          </Link>
          <Link to="/placements" className="btn btn-primary btn-sm" aria-label="Go to Placement Drives">
            Placement Drives
          </Link>
        </div>
      </div>

      {/* Global Error Banner if initial load fails */}
      {error && (
        <div
          className="section-state-box section-state-error"
          role="alert"
          style={{ marginBottom: '1.5rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <strong>⚠️ Dashboard Data Sync Error:</strong>
            <p style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>{error}</p>
          </div>
          <button
            type="button"
            onClick={() => loadData(false)}
            className="btn btn-danger btn-sm"
            aria-label="Retry loading dashboard data"
          >
            Try Again
          </button>
        </div>
      )}

      {/* SECTION 1: KPI Stat Cards Grid (Has Loading, Empty, and Error States) */}
      <section aria-labelledby="section-kpi-heading" style={{ marginBottom: '1.5rem' }}>
        <h2 id="section-kpi-heading" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
          Operational KPI Metrics
        </h2>

        {loading ? (
          <div className="grid-4" aria-busy="true" aria-label="Loading KPI statistics">
            <StatCard loading={true} />
            <StatCard loading={true} />
            <StatCard loading={true} />
            <StatCard loading={true} />
          </div>
        ) : error && !summary ? (
          <div className="section-state-box section-state-error">
            <p>Could not load operational KPI metrics.</p>
            <button
              type="button"
              onClick={() => loadData(false)}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '0.75rem' }}
            >
              Retry KPI Load
            </button>
          </div>
        ) : !hasMetrics ? (
          <EmptyState
            title="No Campus Metrics Available"
            description="The campus database currently has no registered students or courses. Add initial records to populate KPIs."
            actionLabel="Explore Course Catalog"
            onAction={() => window.location.assign('/courses')}
          />
        ) : (
          <div className="grid-4">
            <StatCard
              title="Total Enrolled Students"
              value={summary.totalStudents ?? 0}
              subtitle={`${summary.activeStudents ?? 0} active profiles`}
              icon="👨‍🎓"
              color="#2563eb"
              bg="#eff6ff"
            />
            <StatCard
              title="Academic Courses"
              value={summary.totalCourses ?? 0}
              subtitle={academicTerm}
              icon="📚"
              color="#059669"
              bg="#ecfdf5"
            />
            <StatCard
              title="Active Enrollments"
              value={summary.activeEnrollments ?? 0}
              subtitle="Course registrations"
              icon="📝"
              color="#d97706"
              bg="#fffbeb"
            />
            <StatCard
              title="Open Placements"
              value={summary.openOpportunities ?? 0}
              subtitle={`${summary.totalApplications ?? 0} student applications`}
              icon="💼"
              color="#7c3aed"
              bg="#f5f3ff"
            />
          </div>
        )}
      </section>

      {/* MIDDLE SECTION: Placement Analytics & Department Distribution */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* SECTION 2: Placement Performance Card (Has Loading, Empty, and Error States) */}
        <div className="card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div>
              <h3 className="card-title">Placement Success Metrics</h3>
              <p className="card-desc">Real-time candidate hiring analytics</p>
            </div>
            {summary && !loading && (
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>
                {summary.placementRatePercentage ?? 0}%
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {loading ? (
              <div aria-busy="true" aria-label="Loading placement metrics">
                <div className="skeleton" style={{ height: '70px', marginBottom: '1rem' }} />
                <div className="skeleton" style={{ height: '20px', width: '60%' }} />
              </div>
            ) : error && !summary ? (
              <div className="section-state-box section-state-error">
                <p style={{ fontSize: '0.88rem' }}>Unable to retrieve placement metrics.</p>
                <button
                  type="button"
                  onClick={() => loadData(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.5rem' }}
                >
                  Retry
                </button>
              </div>
            ) : !hasPlacements ? (
              <div className="section-state-box section-state-empty">
                <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  No Active Placement Drives
                </p>
                <p style={{ fontSize: '0.85rem' }}>
                  Placement rates will be calculated once corporate drives and student applications are posted.
                </p>
                <Link
                  to="/placements"
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.75rem', display: 'inline-flex' }}
                >
                  View Placement Drives &rarr;
                </Link>
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.4rem',
                      fontSize: '0.88rem',
                    }}
                  >
                    <span>Placed Students:</span>
                    <strong>
                      {summary.placedStudents ?? 0} of {summary.totalStudents ?? 0} candidates
                    </strong>
                  </div>
                  <div
                    style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}
                    role="progressbar"
                    aria-valuenow={summary.placementRatePercentage ?? 0}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label="Student placement percentage"
                  >
                    <div
                      style={{
                        background: '#10b981',
                        height: '100%',
                        width: `${Math.min(100, Math.max(0, summary.placementRatePercentage ?? 0))}%`,
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.85rem',
                    color: '#64748b',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <span>
                    Total Applications Submitted: <strong>{summary.totalApplications ?? 0}</strong>
                  </span>
                  <Link
                    to="/reports"
                    style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
                    aria-label="View analytical JDBC salary and placement report"
                  >
                    View JDBC Report &rarr;
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* SECTION 3: Department Distribution Card (Has Loading, Empty, and Error States) */}
        <div className="card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div>
              <h3 className="card-title">Students by Department</h3>
              <p className="card-desc">Academic distribution</p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {loading ? (
              <div aria-busy="true" aria-label="Loading department distribution">
                <div className="skeleton" style={{ height: '36px', marginBottom: '0.75rem' }} />
                <div className="skeleton" style={{ height: '36px', marginBottom: '0.75rem' }} />
                <div className="skeleton" style={{ height: '36px' }} />
              </div>
            ) : error && !summary ? (
              <div className="section-state-box section-state-error">
                <p style={{ fontSize: '0.88rem' }}>Unable to retrieve department statistics.</p>
                <button
                  type="button"
                  onClick={() => loadData(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.5rem' }}
                >
                  Retry
                </button>
              </div>
            ) : !hasDepartments ? (
              <div className="section-state-box section-state-empty">
                <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  No Department Data Available
                </p>
                <p style={{ fontSize: '0.85rem' }}>
                  Department metrics will be populated when student profiles are registered.
                </p>
                <Link
                  to="/students"
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.75rem', display: 'inline-flex' }}
                >
                  View Students Roster &rarr;
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.entries(summary.studentsByDepartment).map(([dept, count]) => {
                  const total = summary.totalStudents || 0;
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={dept}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.85rem',
                          marginBottom: '0.25rem',
                        }}
                      >
                        <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{dept}</span>
                        <span style={{ color: '#475569', fontWeight: 500 }}>
                          {count} {count === 1 ? 'student' : 'students'} ({pct}%)
                        </span>
                      </div>
                      <div
                        style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px', overflow: 'hidden' }}
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`${dept} student enrollment distribution percentage`}
                      >
                        <div
                          style={{
                            background: '#3b82f6',
                            height: '100%',
                            width: `${pct}%`,
                            transition: 'width 0.5s ease',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 4: Architecture Demonstration Guide & Tech Mapping */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>
          Educational Demonstration Guide &amp; Tech Mapping
        </h3>
        <p className="card-desc" style={{ marginBottom: '1.25rem' }}>
          Explore key full-stack concepts implemented across CampusConnect:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1rem',
          }}
        >
          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1rem',
              background: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#1e3a8a', marginBottom: '0.25rem' }}>
                ⚡ Raw JDBC Reporting
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.75rem' }}>
                Direct use of <code>PreparedStatement</code> and <code>ResultSet</code> for fast departmental analytical aggregation.
              </p>
            </div>
            <Link to="/reports" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Run JDBC Report &rarr;
            </Link>
          </div>

          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1rem',
              background: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#065f46', marginBottom: '0.25rem' }}>
                🔄 FLUX Data Architecture
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.75rem' }}>
                Unidirectional state flow visualizer: Action &rarr; Dispatcher &rarr; Reducer &rarr; Store &rarr; View.
              </p>
            </div>
            <Link to="/flux-demo" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Inspect FLUX Flow &rarr;
            </Link>
          </div>

          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1rem',
              background: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.25rem',
                }}
              >
                <div style={{ fontWeight: 700, color: '#92400e' }}>
                  🏛️ Legacy Servlets &amp; JSP (Local demo only)
                </div>
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#92400e',
                    fontSize: '0.68rem',
                    padding: '0.1rem 0.35rem',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  Local demo only
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.75rem' }}>
                Runs on embedded Tomcat 10: HttpServlet, JSTL tags (<code>c:forEach</code>, <code>c:choose</code>), and HttpSession.
              </p>
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: '#64748b',
                background: '#f1f5f9',
                padding: '0.45rem 0.65rem',
                borderRadius: '4px',
                textAlign: 'center',
                border: '1px solid var(--border)',
              }}
            >
              Academic Demo: Run <code>mvn exec:java</code> in <code>legacy-web/</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
