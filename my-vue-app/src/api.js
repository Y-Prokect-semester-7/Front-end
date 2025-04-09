// api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchPosts = async (token) => {
  try {
    const response = await fetch('http://localhost:5000/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(token);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching posts:', err);
    throw err; 
  }
};
