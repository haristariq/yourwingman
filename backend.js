import axios from 'axios';

const API_URL = 'https://yourwingman.uc.r.appspot.com/api';

// Function to update user info
async function updateUser(userData, firebaseToken) {
  try {
    const response = await axios.post(`${API_URL}/updateUser`, userData, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error('Error updating user info:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error;
  }
}

// Function to initialize a user
async function initializeUser(userData, firebaseToken) {
  try {
    const response = await axios.post(`${API_URL}/initializeUser`, userData, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error('Error initializing user info:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error;
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

    const user = response.data;

    console.log('User data:', user); 
    return user;
  } catch (error) {
    console.error('Error getting user info:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error; 
  }
}

// Function to get restaurant recommendations
// Function to get restaurant recommendations
async function getRestaurantRecommendations(userData, firebaseToken) {
  try {
    console.log(firebaseToken);
    const response = await axios.get(`${API_URL}/restaurantRecommendations`,{
      headers: {
        Authorization: `${firebaseToken}`
      }
    });
    
    const recommendedRestaurants = response.data;
    console.log('Recommended restaurants:', recommendedRestaurants);
    return recommendedRestaurants;
  } catch (error) {
    console.error('Error getting restaurant recommendations:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error;
  }
}


// Function to check if user exists
async function checkUserExists(firebaseToken) {
  try {
    const response = await axios.get(`${API_URL}/userExists`, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });

    const { exists } = response.data; // Destructure the result from the response

    console.log('User existence:', exists);
    return exists;

  } catch (error) {
    console.error('Error checking user existence:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error;
  }
}


// Function to add favorite restaurant
async function addFavoriteRestaurant(restaurantData, firebaseToken) {
  try {
    const response = await axios.post(`${API_URL}/addFavoriteRestaurant`, restaurantData, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error('Error adding favorite restaurant:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error;
  }
}

// ... [your other functions]

export { updateUser, initializeUser, getUser, getRestaurantRecommendations, checkUserExists, addFavoriteRestaurant };
