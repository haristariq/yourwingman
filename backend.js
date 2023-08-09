import axios from 'axios';

const API_URL = 'https://yourwingman.uc.r.appspot.com/api';

// Function to update user info
async function updateUser(userInfo, firebaseToken) {
  try {
    const response = await axios.post(`${API_URL}/updateUserInfo`, userInfo, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error updating user info:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Function to initialize a user
async function initializeUser(userData, firebaseToken) {
  try {

    console.log(userData, `Bearer ${firebaseToken}`)
    const response = await axios.post(`${API_URL}/initializeUser`, userData, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error initializing user info:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Function to get user information
async function getUser(firebaseToken) {
  try {
    const response = await axios.get(`${API_URL}/getUser`, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error getting user info:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

export { updateUser, initializeUser, getUser };
