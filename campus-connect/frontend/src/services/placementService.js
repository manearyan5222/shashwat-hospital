import { apiRequest } from './api';

export const placementService = {
  getOpportunities: (params = {}) => apiRequest('/placements/opportunities', { params }),
  getOpportunityById: (id) => apiRequest(`/placements/opportunities/${id}`),
  createOpportunity: (data) => apiRequest('/placements/opportunities', { method: 'POST', body: data }),
  updateOpportunity: (id, data) => apiRequest(`/placements/opportunities/${id}`, { method: 'PUT', body: data }),
  deleteOpportunity: (id) => apiRequest(`/placements/opportunities/${id}`, { method: 'DELETE' }),

  getApplicationsByStudent: (studentId) => apiRequest(`/placements/applications/student/${studentId}`),
  getApplicationsByOpportunity: (opportunityId) => apiRequest(`/placements/applications/opportunity/${opportunityId}`),
  applyForOpportunity: (applicationData) => apiRequest('/placements/applications', { method: 'POST', body: applicationData }),
  updateApplicationStatus: (id, status, notes) => 
    apiRequest(`/placements/applications/${id}/status`, {
      method: 'PATCH',
      body: { status, notes }
    }),
};
