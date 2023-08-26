import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUser } from './backend';  // adjust path to your backend file
import { getIdToken } from './firebase';  // adjust path to your firebase file
import { auth } from './firebase';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: 'Name',
    birthday: 'yyyy-dd-mm',
    preferences: { 
      cuisine: 'Any',
      activities: 'Any'
    },
    phone_number: '+12223456789',
    partner_number: '+12223456789',
    location: 'LA'
  });

  const [restaurants, setRestaurants] = useState([]);
  const [confirmationResult, setConfirmationResult] = useState(null); // Added state for restaurants

  // Fetch user data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      // Check if user is authenticated before proceeding
      if (auth.currentUser) {
        try {
          const token = await getIdToken();
          const fetchedData = await getUser(token);
          console.log("Fetched User Data:", fetchedData);
          setUserData(fetchedData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
}, []);


  return (
    <UserDataContext.Provider value={{ userData, setUserData, restaurants, setRestaurants, confirmationResult, setConfirmationResult }}>
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserData = () => {
  return useContext(UserDataContext);
}
