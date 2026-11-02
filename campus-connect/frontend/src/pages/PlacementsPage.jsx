import React, { useState, useEffect } from 'react';
import { placementService } from '../services/placementService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function PlacementsPage() {
  const { state } = useAuth();
  const { user } = state;
  const isStudent = user && user.role === 'STUDENT';
  const isAdminOrFaculty = user && (user.role === 'ADMIN' || user.role === 'FACULTY');
  const isAdmin = user && user.role === 'ADMIN';

  const [activeTab, setActiveTab] = useState('opportunities'); // 'opportunities' or 'applications'
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Opportunity Modal
  const [isOppModalOpen, setIsOppModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState(null);
  const [oppFormData, setOppFormData] = useState({
    companyName: '',
    jobRole: '',
    description: '',
    eligibleDepartments: 'Computer Science, Information Technology',
    minGpa: '3.50',
    packageLpa: '12.00',
    location: 'Bangalore / Remote',
    applicationDeadline: '2026-12-31',
    status: 'OPEN',
  });
  const [oppSubmitting, setOppSubmitting] = useState(false);
  const [oppError, setOppError] = useState('');

  // Apply Modal
  const [applyingOpportunity, setApplyingOpportunity] = useState(null);
  const [applyNotes, setApplyNotes] = useState('');
  const [applyingSubmitting, setApplyingSubmitting] = useState(false);
  const [applyError, setApplyError] = useState('');

  // Status Change Modal
  const [updatingApplication, setUpdatingApplication] = useState(null);
  const [newStatus, setNewStatus] = useState('APPLIED');
  const [statusNotes, setStatusNotes] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const oppData = await placementService.getOpportunities({ size: 50 });
      setOpportunities(oppData.content || []);

      if (isStudent && user.studentProfileId) {
        const studentApps = await placementService.getApplicationsByStudent(user.studentProfileId);
        setApplications(studentApps || []);
      } else if (isAdminOrFaculty) {
        // Fetch all applications
        const allApps = [];
        for (const opp of (oppData.content || [])) {
          const apps = await placementService.getApplicationsByOpportunity(opp.id);
          allApps.push(...apps);
        }
        setApplications(allApps);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleOpenCreateOppModal = () => {
    setEditingOpp(null);
    setOppFormData({
      companyName: '',
      jobRole: '',
      description: '',
      eligibleDepartments: 'Computer Science, Information Technology',
      minGpa: '3.50',
      packageLpa: '12.00',
      location: 'Bangalore / Remote',
      applicationDeadline: '2026-12-31',
      status: 'OPEN',
    });
    setOppError('');
    setIsOppModalOpen(true);
  };

  const handleOpenEditOppModal = (opp) => {
    setEditingOpp(opp);
    setOppFormData({
      companyName: opp.companyName,
      jobRole: opp.jobRole,
      description: opp.description,
      eligibleDepartments: opp.eligibleDepartments,
      minGpa: opp.minGpa?.toString() || '3.00',
      packageLpa: opp.packageLpa?.toString() || '10.00',
      location: opp.location,
      applicationDeadline: opp.applicationDeadline,
      status: opp.status,
    });
    setOppError('');
    setIsOppModalOpen(true);
  };

  const handleOppSubmit = async (e) => {
    e.preventDefault();
    setOppSubmitting(true);
    setOppError('');

    try {
      const payload = {
        ...oppFormData,
        minGpa: parseFloat(oppFormData.minGpa),
        packageLpa: parseFloat(oppFormData.packageLpa),
      };

      if (editingOpp) {
        await placementService.updateOpportunity(editingOpp.id, payload);
      } else {
        await placementService.createOpportunity(payload);
      }

      setIsOppModalOpen(false);
      loadData();
    } catch (err) {
      setOppError(err.message);
    } finally {
      setOppSubmitting(false);
    }
  };

  const handleApplyClick = (opp) => {
    if (!user || !user.studentProfileId) {
      alert('You must be logged in as a registered Student to apply for placement opportunities.');
      return;
    }
    setApplyingOpportunity(opp);
    setApplyNotes('');
    setApplyError('');
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!applyingOpportunity || !user.studentProfileId) return;

    setApplyingSubmitting(true);
    setApplyError('');

    try {
      await placementService.applyForOpportunity({
        studentId: user.studentProfileId,
        opportunityId: applyingOpportunity.id,
        notes: applyNotes,
      });
      setApplyingOpportunity(null);
      loadData();
      alert('Application submitted successfully!');
    } catch (err) {
      setApplyError(err.message);
    } finally {
      setApplyingSubmitting(false);
    }
  };

  const handleOpenStatusModal = (app) => {
    setUpdatingApplication(app);
    setNewStatus(app.status);
    setStatusNotes(app.notes || '');
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    if (!updatingApplication) return;

    try {
      await placementService.updateApplicationStatus(updatingApplication.id, newStatus, statusNotes);
      setUpdatingApplication(null);
      loadData();
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="card-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Placement &amp; Career Portal</h1>
          <p className="card-desc">
            Campus Recruitment Drives &bull; Candidate Eligibility Evaluation &bull; Status Pipeline
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isAdminOrFaculty && (
            <button onClick={handleOpenCreateOppModal} className="btn btn-primary">
              + Post Placement Drive
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="form-error-msg" style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('opportunities')}
          className="btn"
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'opportunities' ? '3px solid #2563eb' : '3px solid transparent',
            color: activeTab === 'opportunities' ? '#2563eb' : '#64748b',
            fontWeight: 700,
            borderRadius: 0,
            padding: '0.75rem 1.25rem',
          }}
        >
          💼 Opportunities ({opportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className="btn"
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'applications' ? '3px solid #2563eb' : '3px solid transparent',
            color: activeTab === 'applications' ? '#2563eb' : '#64748b',
            fontWeight: 700,
            borderRadius: 0,
            padding: '0.75rem 1.25rem',
          }}
        >
          📄 {isStudent ? 'My Applications' : 'Student Applications'} ({applications.length})
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading placement drives and applications..." />
      ) : error ? (
        <div className="section-state-box section-state-error" style={{ margin: '1.5rem 0' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.4rem' }}>⚠️ Unable to load placement drives: {error}</p>
          <button type="button" onClick={loadData} className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }}>
            Retry Load
          </button>
        </div>
      ) : activeTab === 'opportunities' ? (
        opportunities.length === 0 ? (
          <EmptyState
            title="No placement drives posted"
            actionLabel={isAdminOrFaculty ? "Post Placement Drive" : undefined}
            onAction={isAdminOrFaculty ? handleOpenCreateOppModal : undefined}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {opportunities.map((opp) => (
              <div key={opp.id} className="card" style={{ display: 'flex', flexDirection: 'column', marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a' }}>{opp.companyName}</span>
                  <StatusBadge status={opp.status} />
                </div>

                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                  {opp.jobRole}
                </div>

                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669', marginBottom: '0.75rem' }}>
                  ₹ {opp.packageLpa?.toFixed(2)} LPA <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>(CTC)</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#64748b', flex: 1, marginBottom: '1rem', lineHeight: 1.4 }}>
                  {opp.description}
                </p>

                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem', color: '#334155' }}>
                  <div>📍 Location: <strong>{opp.location}</strong></div>
                  <div style={{ marginTop: '0.25rem' }}>🎯 Min GPA: <strong>{opp.minGpa?.toFixed(2)}</strong></div>
                  <div style={{ marginTop: '0.25rem' }}>🏛️ Eligible: <strong>{opp.eligibleDepartments}</strong></div>
                  <div style={{ marginTop: '0.25rem' }}>⏳ Deadline: <strong>{opp.applicationDeadline}</strong></div>
                  <div style={{ marginTop: '0.25rem' }}>👥 Total Applicants: <strong>{opp.totalApplications}</strong></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                  {isStudent ? (
                    <button
                      onClick={() => handleApplyClick(opp)}
                      disabled={opp.status !== 'OPEN'}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                    >
                      {opp.status === 'OPEN' ? 'Apply Now' : 'Applications Closed'}
                    </button>
                  ) : isAdminOrFaculty ? (
                    <div style={{ display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleOpenEditOppModal(opp)} className="btn btn-secondary btn-sm">
                        Edit
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Log in as Student to apply</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Applications Table */
        applications.length === 0 ? (
          <EmptyState
            title="No applications submitted yet"
            description={isStudent ? "Explore open placement drives and submit your profile." : "Student submissions will appear here for review."}
          />
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student Candidate</th>
                  <th>Student ID</th>
                  <th>Department</th>
                  <th>GPA</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Package (LPA)</th>
                  <th>Applied Date</th>
                  <th>Pipeline Status</th>
                  {isAdminOrFaculty && <th style={{ textAlign: 'right' }}>Review</th>}
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td><strong>{app.studentName}</strong></td>
                    <td>{app.studentCode}</td>
                    <td>{app.department}</td>
                    <td><strong>{app.studentGpa?.toFixed(2)}</strong></td>
                    <td><strong>{app.companyName}</strong></td>
                    <td>{app.jobRole}</td>
                    <td style={{ color: '#059669', fontWeight: 700 }}>₹ {app.packageLpa?.toFixed(2)}</td>
                    <td>{app.appliedDate}</td>
                    <td><StatusBadge status={app.status} /></td>
                    {isAdminOrFaculty && (
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleOpenStatusModal(app)}
                          className="btn btn-secondary btn-sm"
                        >
                          Update Status
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Opportunity Modal */}
      <Modal
        isOpen={isOppModalOpen}
        onClose={() => setIsOppModalOpen(false)}
        title={editingOpp ? `Edit Placement Drive: ${editingOpp.companyName}` : 'Post Placement Opportunity'}
      >
        {oppError && (
          <div className="form-error-msg" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
            ⚠️ {oppError}
          </div>
        )}

        <form onSubmit={handleOppSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="companyName">Company Name *</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                className="form-input"
                value={oppFormData.companyName}
                onChange={(e) => setOppFormData({ ...oppFormData, companyName: e.target.value })}
                required
                placeholder="e.g. Google, Amazon, Microsoft"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="jobRole">Job Role *</label>
              <input
                id="jobRole"
                name="jobRole"
                type="text"
                className="form-input"
                value={oppFormData.jobRole}
                onChange={(e) => setOppFormData({ ...oppFormData, jobRole: e.target.value })}
                required
                placeholder="e.g. Software Development Engineer"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="form-textarea"
              value={oppFormData.description}
              onChange={(e) => setOppFormData({ ...oppFormData, description: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="packageLpa">Package LPA *</label>
              <input
                id="packageLpa"
                name="packageLpa"
                type="number"
                step="0.1"
                min="1"
                className="form-input"
                value={oppFormData.packageLpa}
                onChange={(e) => setOppFormData({ ...oppFormData, packageLpa: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="minGpa">Min GPA (0-4) *</label>
              <input
                id="minGpa"
                name="minGpa"
                type="number"
                step="0.01"
                min="0"
                max="4"
                className="form-input"
                value={oppFormData.minGpa}
                onChange={(e) => setOppFormData({ ...oppFormData, minGpa: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="applicationDeadline">Deadline *</label>
              <input
                id="applicationDeadline"
                name="applicationDeadline"
                type="date"
                className="form-input"
                value={oppFormData.applicationDeadline}
                onChange={(e) => setOppFormData({ ...oppFormData, applicationDeadline: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="eligibleDepartments">Eligible Departments (Comma-separated) *</label>
            <input
              id="eligibleDepartments"
              name="eligibleDepartments"
              type="text"
              className="form-input"
              value={oppFormData.eligibleDepartments}
              onChange={(e) => setOppFormData({ ...oppFormData, eligibleDepartments: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                className="form-input"
                value={oppFormData.location}
                onChange={(e) => setOppFormData({ ...oppFormData, location: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="status">Drive Status</label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={oppFormData.status}
                onChange={(e) => setOppFormData({ ...oppFormData, status: e.target.value })}
              >
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsOppModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={oppSubmitting}>
              {oppSubmitting ? 'Saving...' : editingOpp ? 'Update Drive' : 'Publish Opportunity'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Apply Modal */}
      <Modal
        isOpen={!!applyingOpportunity}
        onClose={() => setApplyingOpportunity(null)}
        title={`Apply to ${applyingOpportunity?.companyName} - ${applyingOpportunity?.jobRole}`}
      >
        {applyError && (
          <div className="form-error-msg" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
            ⚠️ {applyError}
          </div>
        )}

        <form onSubmit={handleApplySubmit}>
          <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.88rem' }}>
            <div>🏢 Company: <strong>{applyingOpportunity?.companyName}</strong></div>
            <div>💰 Package: <strong>₹ {applyingOpportunity?.packageLpa} LPA</strong></div>
            <div>🎯 Required GPA: <strong>{applyingOpportunity?.minGpa}</strong></div>
            <div>🏛️ Eligible Depts: <strong>{applyingOpportunity?.eligibleDepartments}</strong></div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="applyNotes">Candidate Notes / Statement of Purpose (Optional)</label>
            <textarea
              id="applyNotes"
              rows={3}
              className="form-textarea"
              value={applyNotes}
              onChange={(e) => setApplyNotes(e.target.value)}
              placeholder="Highlight your key projects, open source contributions, or internship experience..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setApplyingOpportunity(null)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={applyingSubmitting}>
              {applyingSubmitting ? 'Submitting Application...' : 'Confirm Application'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Review Status Modal */}
      <Modal
        isOpen={!!updatingApplication}
        onClose={() => setUpdatingApplication(null)}
        title={`Review Candidate: ${updatingApplication?.studentName}`}
      >
        <form onSubmit={handleStatusSubmit}>
          <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.88rem' }}>
            <div>👨‍🎓 Candidate: <strong>{updatingApplication?.studentName} ({updatingApplication?.studentCode})</strong></div>
            <div>🏛️ Department: <strong>{updatingApplication?.department}</strong> | GPA: <strong>{updatingApplication?.studentGpa}</strong></div>
            <div>💼 Role: <strong>{updatingApplication?.jobRole} at {updatingApplication?.companyName}</strong></div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newStatus">Application Pipeline Stage</label>
            <select
              id="newStatus"
              className="form-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="APPLIED">APPLIED</option>
              <option value="SHORTLISTED">SHORTLISTED</option>
              <option value="INTERVIEWING">INTERVIEWING</option>
              <option value="SELECTED">SELECTED (Hired)</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="statusNotes">Evaluation / Interview Notes</label>
            <textarea
              id="statusNotes"
              rows={3}
              className="form-textarea"
              value={statusNotes}
              onChange={(e) => setStatusNotes(e.target.value)}
              placeholder="e.g. Cleared technical interview round 1..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setUpdatingApplication(null)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Decision
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
