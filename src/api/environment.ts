const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://52.200.111.82:30082/v1/api';

export const environment = {
  customerApiUrl: `${API_BASE_URL}/customer`,
  tourApiUrl: `${API_BASE_URL}/tour-packages`,
};