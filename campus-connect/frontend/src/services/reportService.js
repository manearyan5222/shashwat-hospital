import { apiRequest } from './api';

export const reportService = {
  getDashboardSummary: () => apiRequest('/dashboard/summary'),
  getIoCDemo: () => apiRequest('/dashboard/ioc-demo'),
  getDepartmentAnalytics: () => apiRequest('/reports/department-analytics'),
  getSalaryStats: () => apiRequest('/reports/salary-stats'),
};
