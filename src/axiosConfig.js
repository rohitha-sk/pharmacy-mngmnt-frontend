import axios from 'axios';

// Get token from localStorage
const token = localStorage.getItem('authToken');

// Set the Authorization header if the token exists
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  // Optional: Handle the case when no token is available
  console.log('No token found');
}

export default axios;
