// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-mern-app-b3b93.firebaseapp.com",
  projectId: "blog-mern-app-b3b93",
  storageBucket: "blog-mern-app-b3b93.appspot.com",
  messagingSenderId: "490746541609",
  appId: "1:490746541609:web:e1ec2c6baceac244550e38"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);