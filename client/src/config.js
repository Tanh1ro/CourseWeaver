// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  GENERATE_COURSE: `${API_BASE_URL}/api/generate-course`,
  CHECK_OUTCOME: `${API_BASE_URL}/api/check-outcome`,
  UPLOAD_SYLLABUS: `${API_BASE_URL}/api/upload-syllabus`,
  GET_BOOKS: `${API_BASE_URL}/api/get-books`,
  HEALTH: `${API_BASE_URL}/health`
};

export default API_ENDPOINTS; 