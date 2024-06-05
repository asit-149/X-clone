// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-clone-project-v4.firebaseapp.com",
  projectId: "x-clone-project-v4",
  storageBucket: "x-clone-project-v4.appspot.com",
  messagingSenderId: "828958781540",
  appId: "1:828958781540:web:5d8f90f10340293412af71",
  measurementId: "G-G2E7223Z2Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);