/**
 * Central HTTP API Service Layer with Self-Contained Demo Mode Engine.
 * 
 * Demonstrates:
 * - Decoupling React UI components from low-level fetch/HTTP details.
 * - Centralized Bearer Token injection via request headers.
 * - Standardized error parsing and HTTP status code normalization.
 * - Dynamic fallback / switch to self-contained demo mode (VITE_DEMO_MODE=true)
 *   with zero external network, localhost, or tunnel dependencies.
 */

import {
  isDemoMode,
  getDemoDashboardSummary,
  getDemoDepartmentAnalytics,
  getDemoSalaryStats,
  getDemoIoCDemo,
  getDemoStudents,
  getDemoStudentById,
  createDemoStudent,
  updateDemoStudent,
  deleteDemoStudent,
  getDemoCourses,
  getDemoCourseById,
  createDemoCourse,
  updateDemoCourse,
  deleteDemoCourse,
  getDemoEnrollments,
  getDemoEnrollmentsByStudent,
  getDemoEnrollmentsByCourse,
  createDemoEnrollment,
  updateDemoEnrollmentGrade,
  dropDemoEnrollment,
  getDemoOpportunities,
  getDemoOpportunityById,
  createDemoOpportunity,
  updateDemoOpportunity,
  deleteDemoOpportunity,
  getDemoApplicationsByStudent,
  getDemoApplicationsByOpportunity,
  createDemoApplication,
  updateDemoApplicationStatus,
} from './demoStore';

export { isDemoMode };

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || '/api';

/**
 * In-Memory Request Dispatcher for Demo Mode
 */
async function dispatchDemoRequest(endpoint, { method = 'GET', body = null, params = {} } = {}) {
  // Realistic micro-delay so UI loading spinners and transitions render naturally
  await new Promise(resolve => setTimeout(resolve, 30));

  // 1. Dashboard & Reports
  if (endpoint === '/dashboard/summary') {
    return getDemoDashboardSummary();
  }
  if (endpoint === '/dashboard/ioc-demo') {
    return getDemoIoCDemo();
  }
  if (endpoint === '/reports/department-analytics') {
    return getDemoDepartmentAnalytics();
  }
  if (endpoint === '/reports/salary-stats') {
    return getDemoSalaryStats();
  }

  // 2. Students
  if (endpoint === '/students') {
    if (method === 'POST') return createDemoStudent(body);
    return getDemoStudents(params);
  }
  const studentMatch = endpoint.match(/^\/students\/(\d+)$/);
  if (studentMatch) {
    const id = parseInt(studentMatch[1], 10);
    if (method === 'GET') return getDemoStudentById(id);
    if (method === 'PUT') return updateDemoStudent(id, body);
    if (method === 'DELETE') return deleteDemoStudent(id);
  }

  // 3. Courses
  if (endpoint === '/courses') {
    if (method === 'POST') return createDemoCourse(body);
    return getDemoCourses(params);
  }
  const courseMatch = endpoint.match(/^\/courses\/(\d+)$/);
  if (courseMatch) {
    const id = parseInt(courseMatch[1], 10);
    if (method === 'GET') return getDemoCourseById(id);
    if (method === 'PUT') return updateDemoCourse(id, body);
    if (method === 'DELETE') return deleteDemoCourse(id);
  }

  // 4. Enrollments
  if (endpoint === '/enrollments') {
    if (method === 'POST') return createDemoEnrollment(body);
    return getDemoEnrollments();
  }
  const enrollStudentMatch = endpoint.match(/^\/enrollments\/student\/(\d+)$/);
  if (enrollStudentMatch) {
    return getDemoEnrollmentsByStudent(parseInt(enrollStudentMatch[1], 10));
  }
  const enrollCourseMatch = endpoint.match(/^\/enrollments\/course\/(\d+)$/);
  if (enrollCourseMatch) {
    return getDemoEnrollmentsByCourse(parseInt(enrollCourseMatch[1], 10));
  }
  const enrollMatch = endpoint.match(/^\/enrollments\/(\d+)$/);
  if (enrollMatch) {
    const id = parseInt(enrollMatch[1], 10);
    if (method === 'PUT') return updateDemoEnrollmentGrade(id, body);
    if (method === 'DELETE') return dropDemoEnrollment(id);
  }

  // 5. Placements - Opportunities
  if (endpoint === '/placements/opportunities') {
    if (method === 'POST') return createDemoOpportunity(body);
    return getDemoOpportunities(params);
  }
  const oppMatch = endpoint.match(/^\/placements\/opportunities\/(\d+)$/);
  if (oppMatch) {
    const id = parseInt(oppMatch[1], 10);
    if (method === 'GET') return getDemoOpportunityById(id);
    if (method === 'PUT') return updateDemoOpportunity(id, body);
    if (method === 'DELETE') return deleteDemoOpportunity(id);
  }

  // 6. Placements - Applications
  if (endpoint === '/placements/applications') {
    if (method === 'POST') return createDemoApplication(body);
    return [];
  }
  const appStudentMatch = endpoint.match(/^\/placements\/applications\/student\/(\d+)$/);
  if (appStudentMatch) {
    return getDemoApplicationsByStudent(parseInt(appStudentMatch[1], 10));
  }
  const appOppMatch = endpoint.match(/^\/placements\/applications\/opportunity\/(\d+)$/);
  if (appOppMatch) {
    return getDemoApplicationsByOpportunity(parseInt(appOppMatch[1], 10));
  }
  const appStatusMatch = endpoint.match(/^\/placements\/applications\/(\d+)\/status$/);
  if (appStatusMatch) {
    const id = parseInt(appStatusMatch[1], 10);
    return updateDemoApplicationStatus(id, body.status, body.notes);
  }

  throw new Error(`Demo store: Handler not found for ${method} ${endpoint}`);
}

/**
 * Standardized API Request Execution
 */
export async function apiRequest(endpoint, { method = 'GET', body = null, params = {} } = {}) {
  // If Demo Mode is enabled, handle entirely in-memory with local JSON mock data
  if (isDemoMode()) {
    return dispatchDemoRequest(endpoint, { method, body, params });
  }

  const token = localStorage.getItem('cc_token');

  // Build query string
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      queryParams.append(key, val);
    }
  });

  const queryString = queryParams.toString();
  const url = `${API_BASE}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const headers = {
    'Accept': 'application/json',
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, config);
  } catch (netErr) {
    const error = new Error(`Network connection error: Unable to reach ${url}. Please ensure the Spring Boot server is running on port 8080.`);
    error.status = 0;
    error.cause = netErr;
    throw error;
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    // If 401 Unauthorized and a token was attached, the session is expired or invalid
    if (response.status === 401 && token) {
      localStorage.removeItem('cc_token');
      localStorage.removeItem('cc_user');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }

    let errorMsg = (data && data.message) || `HTTP Error ${response.status}: ${response.statusText}`;
    if (data && data.validationErrors) {
      const fieldErrors = Object.entries(data.validationErrors)
        .map(([field, msg]) => `${field}: ${msg}`)
        .join(', ');
      errorMsg = `${errorMsg} (${fieldErrors})`;
    }
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
