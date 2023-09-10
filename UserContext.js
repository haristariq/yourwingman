import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUser } from './backend';  // adjust path to your backend file
import { getIdToken, auth } from './firebase';  // adjust path to your firebase file

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  console.log("[UserDataContext] Initializing state...");

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
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Fetch user data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      console.log("[UserDataContext] Checking authentication status...");

      if (!auth.currentUser) {
        console.log("[UserDataContext] No authenticated user found.");
        return; 
      }

      console.log("[UserDataContext] User is authenticated. Fetching token...");

      try {
        const token = await getIdToken();
        console.log("[UserDataContext] Token fetched:", token);

        console.log("[UserDataContext] Fetching user data...");

      } catch (error) {
        console.error("[UserDataContext] Error:", error);
      }
    };

    fetchData();
  }, []);

  console.log("[UserDataContext] Rendering Provider...");

  return (
    <UserDataContext.Provider value={{ userData, setUserData, restaurants, setRestaurants, confirmationResult, setConfirmationResult }}>
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserData = () => {
  console.log("[UserDataContext] useUserData hook called.");
  return useContext(UserDataContext);
}
