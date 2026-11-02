import React, { useState, useEffect } from 'react';
import { enrollmentService } from '../services/enrollmentService';
import { studentService } from '../services/studentService';
import { courseService } from '../services/courseService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function EnrollmentsPage() {
  const { state } = useAuth();
  const { user, isAuthenticated } = state;
  const isStudent = user && user.role === 'STUDENT';
  const isAdminOrFaculty = user && (user.role === 'ADMIN' || user.role === 'FACULTY');

  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enroll Modal
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [enrollError, setEnrollError] = useState('');

  // Grade Edit Modal
  const [editingEnrollment, setEditingEnrollment] = useState(null);
  const [editGrade, setEditGrade] = useState('IP');
  const [editStatus, setEditStatus] = useState('ENROLLED');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // If student logged in, fetch their enrollments; else fetch all
      let enrollData = [];
      if (isStudent && user.studentProfileId) {
        enrollData = await enrollmentService.getEnrollmentsByStudent(user.studentProfileId);
      } else {
        enrollData = await enrollmentService.getAllEnrollments();
      }
      setEnrollments(enrollData || []);

      // Preload students and courses for the enrollment modal
      if (isAdminOrFaculty) {
        const studentRes = await studentService.getStudents({ size: 100 });
        const courseRes = await courseService.getCourses({ size: 100 });
        setStudents(studentRes.content || []);
        setCourses(courseRes.content || []);
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

  const handleOpenEnrollModal = () => {
    setEnrollError('');
    setSelectedStudentId(students[0]?.id?.toString() || '');
    setSelectedCourseId(courses[0]?.id?.toString() || '');
    setIsEnrollModalOpen(true);
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setEnrollError('');

    try {
      await enrollmentService.enroll({
        studentId: parseInt(selectedStudentId, 10),
        courseId: parseInt(selectedCourseId, 10),
        grade: 'IP',
        status: 'ENROLLED',
      });
      setIsEnrollModalOpen(false);
      loadData();
    } catch (err) {
      setEnrollError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenGradeModal = (enrollment) => {
    setEditingEnrollment(enrollment);
    setEditGrade(enrollment.grade || 'IP');
    setEditStatus(enrollment.status || 'ENROLLED');
  };

  const handleUpdateGradeSubmit = async (e) => {
    e.preventDefault();
    if (!editingEnrollment) return;

    try {
      await enrollmentService.updateGrade(editingEnrollment.id, {
        grade: editGrade,
        status: editStatus,
      });
      setEditingEnrollment(null);
      loadData();
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  const handleDrop = async (id, courseTitle) => {
    if (!window.confirm(`Are you sure you want to drop course "${courseTitle}"?`)) return;
    try {
      await enrollmentService.dropEnrollment(id);
      loadData();
    } catch (err) {
      alert(`Drop failed: ${err.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <div className="card-header">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Course Enrollments</h1>
            <p className="card-desc">Protected Academic Records &bull; Role-Based Access Control</p>
          </div>
        </div>
        <EmptyState
          title="Sign-In Required to Manage Enrollments"
          description="Enrollment records, grades, and course registration require student, faculty, or administrator authentication."
          actionLabel="Sign In Now &rarr;"
          onAction={() => window.location.assign('/login')}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="card-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Course Enrollments</h1>
          <p className="card-desc">
            Many-to-Many Association Entity &bull; <code>@Entity Enrollment</code> &bull; Roster management
          </p>
        </div>

        {isAdminOrFaculty && (
          <button onClick={handleOpenEnrollModal} className="btn btn-primary">
            + Enroll Student
          </button>
        )}
      </div>

      {error && (
        <div className="form-error-msg" style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Loading course enrollments..." />
      ) : error ? (
        <div className="section-state-box section-state-error" style={{ margin: '1.5rem 0' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.4rem' }}>⚠️ Unable to load enrollments: {error}</p>
          <button type="button" onClick={loadData} className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }}>
            Retry Load
          </button>
        </div>
      ) : enrollments.length === 0 ? (
        <EmptyState
          title="No enrollments recorded"
          description="Students can be enrolled into active courses by Faculty or Administrators."
          actionLabel={isAdminOrFaculty ? "Enroll Student" : undefined}
          onAction={isAdminOrFaculty ? handleOpenEnrollModal : undefined}
        />
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Enroll Date</th>
                <th>Grade</th>
                <th>Status</th>
                {isAdminOrFaculty && <th style={{ textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td><strong>{enrollment.studentName}</strong></td>
                  <td>{enrollment.studentCode}</td>
                  <td><span className="badge badge-primary">{enrollment.courseCode}</span></td>
                  <td>{enrollment.courseTitle}</td>
                  <td>{enrollment.enrollmentDate}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: enrollment.grade === 'A' ? '#059669' : '#334155' }}>
                      {enrollment.grade || 'IP'}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={enrollment.status} />
                  </td>
                  {isAdminOrFaculty && (
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => handleOpenGradeModal(enrollment)}
                        className="btn btn-secondary btn-sm"
                        style={{ marginRight: '0.35rem' }}
                      >
                        Grade / Status
                      </button>
                      {enrollment.status !== 'DROPPED' && (
                        <button
                          onClick={() => handleDrop(enrollment.id, enrollment.courseTitle)}
                          className="btn btn-danger btn-sm"
                        >
                          Drop
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Enroll Student Modal */}
      <Modal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        title="Enroll Student in Course"
      >
        {enrollError && (
          <div className="form-error-msg" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
            ⚠️ {enrollError}
          </div>
        )}

        <form onSubmit={handleEnrollSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="studentSelect">Select Student *</label>
            <select
              id="studentSelect"
              className="form-select"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              required
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.studentId}) &bull; {s.department}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="courseSelect">Select Course *</label>
            <select
              id="courseSelect"
              className="form-select"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              required
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.courseCode}: {c.title} ({c.enrolledCount}/{c.capacity} enrolled)
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEnrollModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Enrolling...' : 'Confirm Enrollment'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Grade Update Modal */}
      <Modal
        isOpen={!!editingEnrollment}
        onClose={() => setEditingEnrollment(null)}
        title={`Update Grade: ${editingEnrollment?.studentName} in ${editingEnrollment?.courseCode}`}
      >
        <form onSubmit={handleUpdateGradeSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="editGrade">Assigned Grade</label>
            <select
              id="editGrade"
              className="form-select"
              value={editGrade}
              onChange={(e) => setEditGrade(e.target.value)}
            >
              <option value="IP">IP (In Progress)</option>
              <option value="A">A (Excellent - 4.0)</option>
              <option value="A-">A- (3.7)</option>
              <option value="B+">B+ (3.3)</option>
              <option value="B">B (3.0)</option>
              <option value="C">C (2.0)</option>
              <option value="F">F (Fail)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="editStatus">Enrollment Status</label>
            <select
              id="editStatus"
              className="form-select"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="ENROLLED">ENROLLED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="DROPPED">DROPPED</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingEnrollment(null)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
