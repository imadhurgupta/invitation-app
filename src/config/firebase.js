import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3FfFpT4PTZHaA8P-xumWARwyEASxsLqk",
  authDomain: "my-pro1-adf8e.firebaseapp.com",
  projectId: "my-pro1-adf8e",
  storageBucket: "my-pro1-adf8e.firebasestorage.app",
  messagingSenderId: "528563746038",
  appId: "1:528563746038:web:81c18f569056f270a8e8d7",
  measurementId: "G-WQ8GVWQKXE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);