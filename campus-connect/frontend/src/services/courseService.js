import { apiRequest } from './api';

export const courseService = {
  getCourses: (params = {}) => apiRequest('/courses', { params }),
  getCourseById: (id) => apiRequest(`/courses/${id}`),
  createCourse: (courseData) => apiRequest('/courses', { method: 'POST', body: courseData }),
  updateCourse: (id, courseData) => apiRequest(`/courses/${id}`, { method: 'PUT', body: courseData }),
  deleteCourse: (id) => apiRequest(`/courses/${id}`, { method: 'DELETE' }),
};
