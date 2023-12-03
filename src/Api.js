// api.js

const BASE_URL = 'https://stg.dhunjam.in/account';

const apiEndpoints = {
  adminLogin: `${BASE_URL}/admin/login`,
  getAdminDetails: (adminId) => `${BASE_URL}/admin/${adminId}`,
  updateAdminPrice: (adminId) => `${BASE_URL}/admin/${adminId}`,
};

export default apiEndpoints;
