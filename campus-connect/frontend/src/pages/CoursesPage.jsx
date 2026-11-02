import React, { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { Link } from 'react-router-dom';

export default function CoursesPage() {
  const { state } = useAuth();
  const { user } = state;
  const isAdminOrFaculty = user && (user.role === 'ADMIN' || user.role === 'FACULTY');
  const isAdmin = user && user.role === 'ADMIN';

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    courseCode: '',
    title: '',
    description: '',
    department: 'Computer Science',
    credits: 3,
    instructorName: '',
    capacity: 40,
    semester: 'Fall 2026',
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseService.getCourses({ query, department, semester });
      setCourses(data.content || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [query, department, semester]);

  const handleOpenCreateModal = () => {
    setEditingCourse(null);
    setFormData({
      courseCode: '',
      title: '',
      description: '',
      department: 'Computer Science',
      credits: 3,
      instructorName: user?.fullName || 'Prof. Smith',
      capacity: 40,
      semester: 'Fall 2026',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      courseCode: course.courseCode,
      title: course.title,
      description: course.description || '',
      department: course.department,
      credits: course.credits,
      instructorName: course.instructorName,
      capacity: course.capacity,
      semester: course.semester,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: (name === 'credits' || name === 'capacity') ? parseInt(value, 10) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

    try {
      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, formData);
      } else {
        await courseService.createCourse(formData);
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete course "${title}"?`)) return;
    try {
      await courseService.deleteCourse(id);
      fetchCourses();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="card-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Course Catalog</h1>
          <p className="card-desc">
            Spring MVC RestController &bull; <code>@RequestMapping("/api/courses")</code>
          </p>
        </div>

        {isAdminOrFaculty && (
          <button onClick={handleOpenCreateModal} className="btn btn-primary">
            + Create New Course
          </button>
        )}
      </div>

      {error && (
        <div className="form-error-msg" style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Filter Bar */}
      <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by code, title, instructor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="form-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics & Comm">Electronics &amp; Comm</option>
          </select>
          <select
            className="form-select"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">All Semesters</option>
            <option value="Fall 2026">Fall 2026</option>
            <option value="Spring 2027">Spring 2027</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching courses from Spring Boot REST API..." />
      ) : error ? (
        <div className="section-state-box section-state-error" style={{ margin: '1.5rem 0' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.4rem' }}>⚠️ Unable to load course catalog: {error}</p>
          <button type="button" onClick={fetchCourses} className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }}>
            Retry Load
          </button>
        </div>
      ) : courses.length === 0 ? (
        <EmptyState
          title="No courses match your filter"
          actionLabel={isAdminOrFaculty ? "Add Course" : undefined}
          onAction={isAdminOrFaculty ? handleOpenCreateModal : undefined}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {courses.map((course) => {
            const enrolled = course.enrolledCount || 0;
            const capacity = course.capacity || 40;
            const pct = Math.min(100, Math.round((enrolled / capacity) * 100));

            return (
              <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.8rem' }}>{course.courseCode}</span>
                  <span className="badge badge-neutral">{course.credits} Credits</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.35rem 0' }}>{course.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', flex: 1, marginBottom: '1rem', lineHeight: 1.4 }}>
                  {course.description || 'No detailed syllabus available.'}
                </p>

                <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.75rem', background: '#f8fafc', padding: '0.6rem 0.75rem', borderRadius: '6px' }}>
                  <div>👨‍🏫 Instructor: <strong>{course.instructorName}</strong></div>
                  <div style={{ marginTop: '0.2rem' }}>🏛️ Department: <strong>{course.department}</strong></div>
                  <div style={{ marginTop: '0.2rem' }}>🗓️ Semester: <strong>{course.semester}</strong></div>
                </div>

                {/* Capacity Progress Bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '0.25rem' }}>
                    <span>Enrollment Capacity</span>
                    <span><strong>{enrolled}</strong> / {capacity} ({pct}%)</span>
                  </div>
                  <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        background: pct >= 100 ? '#ef4444' : pct >= 75 ? '#f59e0b' : '#10b981',
                        height: '100%',
                        width: `${pct}%`,
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                  <Link to="/enrollments" className="btn btn-secondary btn-sm">
                    View Enrolled &rarr;
                  </Link>

                  {isAdminOrFaculty && (
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button onClick={() => handleOpenEditModal(course)} className="btn btn-secondary btn-sm">
                        Edit
                      </button>
                      {isAdmin && (
                        <button onClick={() => handleDelete(course.id, course.title)} className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? `Edit Course: ${editingCourse.courseCode}` : 'Create New Course'}
      >
        {formError && (
          <div className="form-error-msg" style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
            ⚠️ {formError}
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="courseCode">Course Code *</label>
              <input
                id="courseCode"
                name="courseCode"
                type="text"
                className="form-input"
                value={formData.courseCode}
                onChange={handleFormChange}
                required
                placeholder="e.g. CS-301"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Course Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                className="form-input"
                value={formData.title}
                onChange={handleFormChange}
                required
                placeholder="e.g. Advanced Java & Spring Boot"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="form-textarea"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Detailed syllabus topics..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
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
              <label className="form-label" htmlFor="instructorName">Instructor Name *</label>
              <input
                id="instructorName"
                name="instructorName"
                type="text"
                className="form-input"
                value={formData.instructorName}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="credits">Credits *</label>
              <input
                id="credits"
                name="credits"
                type="number"
                min="1"
                max="6"
                className="form-input"
                value={formData.credits}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="capacity">Capacity *</label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                max="200"
                className="form-input"
                value={formData.capacity}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="semester">Semester</label>
              <input
                id="semester"
                name="semester"
                type="text"
                className="form-input"
                value={formData.semester}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : editingCourse ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
