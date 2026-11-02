import React, { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function StudentsPage() {
  const { state } = useAuth();
  const { user, isAuthenticated } = state;
  const isAdminOrFaculty = user && (user.role === 'ADMIN' || user.role === 'FACULTY');
  const isAdmin = user && user.role === 'ADMIN';

  // Component State
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Pagination State
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Initial Form Data State
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    department: 'Computer Science',
    academicYear: 1,
    gpa: '3.50',
    skills: '',
    profileStatus: 'ACTIVE',
  });

  // Fetch Students from REST API (Demonstrates useEffect & async data fetching)
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentService.getStudents({
        query,
        department,
        year: year ? parseInt(year, 10) : undefined,
        status: status || undefined,
        page,
        size: 8,
      });

      setStudents(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [query, department, year, status, page]);

  // Handlers demonstrating Unidirectional Data Flow and Events
  const handleOpenCreateModal = () => {
    setEditingStudent(null);
    setFormData({
      studentId: `STU-2024-${Math.floor(100 + Math.random() * 900)}`,
      firstName: '',
      lastName: '',
      email: '',
      department: 'Computer Science',
      academicYear: 1,
      gpa: '3.50',
      skills: '',
      profileStatus: 'ACTIVE',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setFormData({
      studentId: student.studentId,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      department: student.department,
      academicYear: student.academicYear,
      gpa: student.gpa?.toString() || '0.00',
      skills: student.skills || '',
      profileStatus: student.profileStatus || 'ACTIVE',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'academicYear' ? parseInt(value, 10) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const payload = {
        ...formData,
        gpa: parseFloat(formData.gpa),
      };

      if (editingStudent) {
        await studentService.updateStudent(editingStudent.id, payload);
      } else {
        await studentService.createStudent(payload);
      }

      setIsModalOpen(false);
      fetchStudents();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student profile "${name}"?`)) {
      return;
    }
    try {
      await studentService.deleteStudent(id);
      fetchStudents();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <div className="card-header">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Directory &amp; Profiles</h1>
            <p className="card-desc">Protected Academic Records &bull; Role-Based Access Control</p>
          </div>
        </div>
        <EmptyState
          title="Sign-In Required to View Students Roster"
          description="The student academic directory contains confidential profile and academic information. Please sign in with your campus account."
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Directory &amp; Profiles</h1>
          <p className="card-desc">
            Spring Data JPA Entity &bull; <code>@Entity Student</code> &bull; JpaRepository CRUD
          </p>
        </div>

        {isAdminOrFaculty && (
          <button onClick={handleOpenCreateModal} className="btn btn-primary">
            + Add New Student
          </button>
        )}
      </div>

      {error && (
        <div className="form-error-msg" style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', alignItems: 'center' }}>
          <div>
            <input
              type="text"
              className="form-input"
              placeholder="Search by name, ID, or skills..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
            />
          </div>

          <div>
            <select
              className="form-select"
              value={department}
              onChange={(e) => { setDepartment(e.target.value); setPage(0); }}
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Comm">Electronics &amp; Comm</option>
            </select>
          </div>

          <div>
            <select
              className="form-select"
              value={year}
              onChange={(e) => { setYear(e.target.value); setPage(0); }}
            >
              <option value="">All Years</option>
              <option value="1">Year 1 (Freshman)</option>
              <option value="2">Year 2 (Sophomore)</option>
              <option value="3">Year 3 (Junior)</option>
              <option value="4">Year 4 (Senior)</option>
            </select>
          </div>

          <div>
            <select
              className="form-select"
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(0); }}
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="GRADUATED">GRADUATED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      {loading ? (
        <LoadingSpinner message="Querying students via Spring Data JPA..." />
      ) : error ? (
        <div className="section-state-box section-state-error" style={{ margin: '1.5rem 0' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.4rem' }}>⚠️ Unable to load students roster: {error}</p>
          <button type="button" onClick={fetchStudents} className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }}>
            Retry Query
          </button>
        </div>
      ) : students.length === 0 ? (
        <EmptyState
          title="No students found"
          description="Try adjusting your search query or department filters."
          actionLabel={isAdminOrFaculty ? "Add Student" : undefined}
          onAction={isAdminOrFaculty ? handleOpenCreateModal : undefined}
        />
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>GPA</th>
                <th>Status</th>
                <th>Skills</th>
                {isAdminOrFaculty && <th style={{ textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {/* Demonstrates rendering lists with map() and stable unique keys */}
              {students.map((student) => (
                <tr key={student.id}>
                  <td><strong>{student.studentId}</strong></td>
                  <td>{student.fullName}</td>
                  <td style={{ color: '#475569' }}>{student.email}</td>
                  <td>
                    <span className="badge badge-neutral">{student.department}</span>
                  </td>
                  <td>Year {student.academicYear}</td>
                  <td>
                    <strong>{student.gpa?.toFixed(2)}</strong>
                  </td>
                  <td>
                    <StatusBadge status={student.profileStatus} />
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '200px' }}>
                    {student.skills || '—'}
                  </td>
                  {isAdminOrFaculty && (
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => handleOpenEditModal(student)}
                        className="btn btn-secondary btn-sm"
                        style={{ marginRight: '0.35rem' }}
                      >
                        Edit
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(student.id, student.fullName)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <span style={{ fontSize: '0.85rem', color: '#64748b', marginRight: '0.5rem' }}>
            Page {page + 1} of {totalPages} ({totalElements} total)
          </span>
          <button
            className="page-btn"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            &larr; Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page-btn ${page === i ? 'active' : ''}`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="page-btn"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next &rarr;
          </button>
        </div>
      )}

      {/* Modal Dialog for Add / Edit Student */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? `Edit Student: ${editingStudent.fullName}` : 'Add New Student'}
      >
        {formError && (
          <div className="form-error-msg" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
            ⚠️ {formError}
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="studentId">Student ID *</label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                className="form-input"
                value={formData.studentId}
                onChange={handleFormChange}
                required
                placeholder="e.g. STU-2024-001"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="form-input"
                value={formData.firstName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="form-input"
                value={formData.lastName}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                className="form-select"
                value={formData.department}
                onChange={handleFormChange}
                required
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Comm">Electronics &amp; Comm</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="academicYear">Year *</label>
              <select
                id="academicYear"
                name="academicYear"
                className="form-select"
                value={formData.academicYear}
                onChange={handleFormChange}
                required
              >
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="gpa">GPA (0.00-4.00) *</label>
              <input
                id="gpa"
                name="gpa"
                type="number"
                step="0.01"
                min="0"
                max="4"
                className="form-input"
                value={formData.gpa}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="skills">Technical Skills</label>
            <input
              id="skills"
              name="skills"
              type="text"
              className="form-input"
              value={formData.skills}
              onChange={handleFormChange}
              placeholder="e.g. Java, Spring Boot, React, MySQL"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="profileStatus">Status</label>
            <select
              id="profileStatus"
              name="profileStatus"
              className="form-select"
              value={formData.profileStatus}
              onChange={handleFormChange}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="GRADUATED">GRADUATED</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formSubmitting}
            >
              {formSubmitting ? 'Saving...' : editingStudent ? 'Update Student' : 'Create Student'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
