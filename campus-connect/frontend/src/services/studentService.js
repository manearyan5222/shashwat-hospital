import { apiRequest } from './api';

export const studentService = {
  getStudents: (params = {}) => apiRequest('/students', { params }),
  getStudentById: (id) => apiRequest(`/students/${id}`),
  createStudent: (studentData) => apiRequest('/students', { method: 'POST', body: studentData }),
  updateStudent: (id, studentData) => apiRequest(`/students/${id}`, { method: 'PUT', body: studentData }),
  deleteStudent: (id) => apiRequest(`/students/${id}`, { method: 'DELETE' }),
};
