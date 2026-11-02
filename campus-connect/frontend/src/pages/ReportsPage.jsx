import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [salaryStats, setSalaryStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [executionTimestamp, setExecutionTimestamp] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const [deptReport, stats] = await Promise.all([
        reportService.getDepartmentAnalytics(),
        reportService.getSalaryStats(),
      ]);
      setReports(deptReport || []);
      setSalaryStats(stats);
      setExecutionTimestamp(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <div className="card-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Low-Level JDBC Reporting Engine</h1>
          <p className="card-desc">
            Direct Java Database Connectivity (JDBC) Execution &bull; <code>PreparedStatement</code> &bull; <code>ResultSet</code>
          </p>
        </div>

        <button onClick={fetchReports} className="btn btn-primary btn-sm">
          ⚡ Re-execute JDBC Query
        </button>
      </div>

      {/* Deep Architectural Comparison Panel */}
      <div className="card" style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.5rem' }}>
          Architectural Contrast: Low-Level JDBC vs. Spring Data JPA
        </h3>
        <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
          Both data access technologies are intentionally implemented in CampusConnect to demonstrate when and why each is chosen in enterprise software:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 700, color: '#2563eb', marginBottom: '0.4rem' }}>
              Low-Level JDBC API (Used in this Report)
            </div>
            <ul style={{ fontSize: '0.82rem', color: '#64748b', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
              <li><strong>Classes:</strong> <code>DataSource</code>, <code>Connection</code>, <code>PreparedStatement</code>, <code>ResultSet</code>.</li>
              <li><strong>Use Case:</strong> Heavy aggregation queries joining 4+ tables, bulk reporting, complex analytical projections.</li>
              <li><strong>Advantage:</strong> Zero ORM overhead; streams rows directly without Hibernate entity tracking.</li>
              <li><strong>Cost:</strong> Manual SQL authoring, manual resource management (try-with-resources), repetitive mapping code.</li>
            </ul>
          </div>

          <div style={{ background: 'white', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 700, color: '#059669', marginBottom: '0.4rem' }}>
              Spring Data JPA (Used across CRUD Features)
            </div>
            <ul style={{ fontSize: '0.82rem', color: '#64748b', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
              <li><strong>Classes:</strong> <code>@Entity</code>, <code>JpaRepository</code>, Hibernate Session, EntityManager.</li>
              <li><strong>Use Case:</strong> Domain business logic, CRUD endpoints, lifecycle cascades, dirty checking.</li>
              <li><strong>Advantage:</strong> Rapid productivity, typed queries, automatic change tracking, database dialect abstraction.</li>
              <li><strong>Cost:</strong> Entity cache overhead and N+1 query traps if relationships are unoptimized.</li>
            </ul>
          </div>
        </div>
      </div>

      {error && (
        <div className="form-error-msg" style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          ⚠️ JDBC Error: {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Executing native SQL queries via PreparedStatement and streaming ResultSet..." />
      ) : error ? (
        <div className="section-state-box section-state-error" style={{ margin: '1.5rem 0' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.4rem' }}>⚠️ Unable to execute JDBC queries: {error}</p>
          <button type="button" onClick={fetchReports} className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }}>
            Retry JDBC Query
          </button>
        </div>
      ) : (
        <>
          {/* Salary Statistics via java.sql.Statement */}
          {salaryStats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="card" style={{ marginBottom: 0, padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Active Drives</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e3a8a' }}>{salaryStats.totalOpenRoles}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Open placement drives</div>
              </div>

              <div className="card" style={{ marginBottom: 0, padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Highest CTC Offered</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669' }}>₹ {salaryStats.maxPackageLpa} LPA</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Peak offer on campus</div>
              </div>

              <div className="card" style={{ marginBottom: 0, padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Average CTC</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563eb' }}>₹ {salaryStats.avgPackageLpa} LPA</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Campus mean salary</div>
              </div>

              <div className="card" style={{ marginBottom: 0, padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Query Engine</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>{salaryStats.queryEngine}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Executed at: {executionTimestamp}</div>
              </div>
            </div>
          )}

          {/* Department Analytics Table */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Departmental Academic &amp; Placement Performance</h3>
                <p className="card-desc">
                  Populated row-by-row via <code>rs.getString()</code> and <code>rs.getLong()</code> from multi-table join
                </p>
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Students</th>
                    <th>Average GPA</th>
                    <th>Courses</th>
                    <th>Enrollments</th>
                    <th>Applications</th>
                    <th>Placed</th>
                    <th>Selection Rate</th>
                    <th>Top Package</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((row) => (
                    <tr key={row.department}>
                      <td><strong>{row.department}</strong></td>
                      <td>{row.totalStudents}</td>
                      <td><strong>{row.averageGpa?.toFixed(2)}</strong></td>
                      <td>{row.totalCourses}</td>
                      <td>{row.totalEnrollments}</td>
                      <td>{row.placementApplications}</td>
                      <td><span style={{ color: '#059669', fontWeight: 700 }}>{row.placedStudents}</span></td>
                      <td>
                        <span className={`badge ${row.placementRatePercentage > 0 ? 'badge-active' : 'badge-inactive'}`}>
                          {row.placementRatePercentage?.toFixed(1)}%
                        </span>
                      </td>
                      <td style={{ color: '#059669', fontWeight: 700 }}>
                        {row.highestPackageLpa > 0 ? `₹ ${row.highestPackageLpa?.toFixed(2)} LPA` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
