import { apiRequest } from './api';

export const enrollmentService = {
  getAllEnrollments: () => apiRequest('/enrollments'),
  getEnrollmentsByStudent: (studentId) => apiRequest(`/enrollments/student/${studentId}`),
  getEnrollmentsByCourse: (courseId) => apiRequest(`/enrollments/course/${courseId}`),
  enroll: (enrollmentData) => apiRequest('/enrollments', { method: 'POST', body: enrollmentData }),
  updateGrade: (id, updateData) => apiRequest(`/enrollments/${id}`, { method: 'PUT', body: updateData }),
  dropEnrollment: (id) => apiRequest(`/enrollments/${id}`, { method: 'DELETE' }),
};
