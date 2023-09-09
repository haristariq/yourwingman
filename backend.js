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

// Function to get favorite restaurants
async function getFavoriteRestaurants(firebaseToken) {
  try {
    const response = await axios.get(`${API_URL}/getFavoriteRestaurants`, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });

    const favorites = response.data;

    console.log('Favorite restaurants:', favorites);
    return favorites;
  } catch (error) {
    console.error('Error fetching favorite restaurants:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error; 
  }
}

const GetSpicyQuestions = async (firebaseToken) => {
  try {
      const response = await axios.get(`${API_URL}/getSpicyQuestions`, {
        headers: {
          Authorization: `${firebaseToken}`
        }
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching spicy questions:", error);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
      throw error;
  }
}

const AnswerSpicyQuestion = async (question, answer, firebaseToken) => {
  try {
      const response = await axios.post(`${API_URL}/answerSpicyQuestion`, { question, answer }, {
        headers: {
          Authorization: `${firebaseToken}`
        }
      });
      return response.data;
  } catch (error) {
      console.error("Error answering spicy question:", error);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
      throw error;
  }
}

const GetSpicyAnswers = async (firebaseToken) => {
  try {
    const response = await axios.get(`${API_URL}/getSpicyAnswers`, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });
    console.log(response.data);
    return response.data;  // Assuming the API returns a dictionary with questions as keys and answers as values
  } catch (error) {
    console.error('Error fetching spicy answers:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error;
  }
}

const GetPartnerSpicyAnswers = async (firebaseToken) => {
  try {
      const response = await axios.get(`${API_URL}/getPartnerSpicyAnswers`, {
        headers: {
          Authorization: `${firebaseToken}`
        }
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching partner's spicy answers:", error);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
      throw error;
  }
}

async function deleteUser(firebaseToken) {
  try {
      const response = await axios.delete(`${API_URL}/deleteUser`, {
          headers: {
              Authorization: `${firebaseToken}`
          }
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Error deleting user:', error.message);
      if (error.response) {
          console.error('Response:', error.response.data);
      }
      throw error;
  }
}

// Function to communicate with the chatbot
async function chatWithBot(userMessage, firebaseToken) {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message: userMessage }, {
      headers: {
        Authorization: `${firebaseToken}`
      }
    });
    return response.data.message; 
  } catch (error) {
    console.error('Error communicating with chatbot:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error;
  }
}


async function uploadUserPhoto(imageUri, firebaseToken) {
  const formData = new FormData();

  // Logging the imageUri received
  console.log('backend.js - Received imageUri:', imageUri);

  // Convert the image URI to a blob
  const response = await fetch(imageUri);
  console.log('backend.js - Fetch response:', response);
  
  const blob = await response.blob();
  console.log('backend.js - Converted imageUri to blob:', blob);

  // Convert blob to a File object
  const imageFile = new File([blob], "uploadedImage.jpg", { type: blob.type });
  console.log('backend.js - Converted blob to File:', imageFile);

  // Append the File object to the FormData
  //formData.append('image', imageFile);
  formData.append('image', { name: 'photo.jpg', uri: imageUri, type: 'image/jpeg',
});

  console.log('backend.js - Appended File to formData:', formData);

  try {
      const uploadResponse = await axios.post(`${API_URL}/uploadUserPhoto`, formData, {
          headers: {
              Authorization: `${firebaseToken}`,
              'Content-Type': 'multipart/form-data'
          }
      });

      console.log('backend.js - Upload photo response:');

  } catch (error) {
      console.error('backend.js - Error uploading user photo:', error.message);
      if (error.response) {
          console.error('backend.js - Server response:', error.response.data);
      }
      throw error;
  }
}



export { uploadUserPhoto ,updateUser, initializeUser, getUser, deleteUser, getRestaurantRecommendations, checkUserExists, addFavoriteRestaurant, getFavoriteRestaurants, AnswerSpicyQuestion, GetPartnerSpicyAnswers, GetSpicyAnswers, GetSpicyQuestions, chatWithBot };
