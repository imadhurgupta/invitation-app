import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export const AuthContext = createContext();

// 1. Custom Hook to use the context easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. The Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Auth Functions ---

  // Sign Up (Email/Password)
  const signup = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Immediately update the profile with the display name
    await updateProfile(userCredential.user, {
      displayName: fullName
    });
    return userCredential;
  };

  // Login (Email/Password)
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login (Google)
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Reset Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // --- State Listener ---

  useEffect(() => {
    // Firebase listener that runs whenever auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Stop loading once we know if user is logged in or not
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {/* We only render children after the initial check is done 
          to prevent flashing the login screen to an authenticated user */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;