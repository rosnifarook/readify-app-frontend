// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: window?.configs?.VITE_API_KEY || import.meta.env.VITE_API_KEY,
  authDomain: window?.configs?.VITE_AUTH_DOMAIN || import.meta.env.VITE_AUTH_DOMAIN,
  projectId: window?.configs?.VITE_PROJECT_ID || import.meta.env.VITE_PROJECT_ID,
  storageBucket: window?.configs?.VITE_STORAGE_BUCKET || import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: window?.configs?.VITE_MESSAGING_SENDERID || import.meta.env.VITE_MESSAGING_SENDERID,
  appId: window?.configs?.VITE_APPID || import.meta.env.VITE_APPID,
};

console.log("Firebase API key:", import.meta.env.VITE_API_KEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);