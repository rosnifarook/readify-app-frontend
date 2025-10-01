// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: window.configs.firebase.apiKey,
  authDomain: window.configs.firebase.authDomain,
  projectId: window.configs.firebase.projectId,
  storageBucket: window.configs.firebase.storageBucket,
  messagingSenderId: window.configs.firebase.messagingSenderId,
  appId: window.configs.firebase.appId,
};

console.log("Firebase API key:", import.meta.env.VITE_API_KEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);