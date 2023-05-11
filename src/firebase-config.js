// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUZZX0XHzKVG6VjZx6YoOO1agzKtF3Etc",
  authDomain: "service-record-tracker-v2.firebaseapp.com",
  projectId: "service-record-tracker-v2",
  storageBucket: "service-record-tracker-v2.appspot.com",
  messagingSenderId: "416361953557",
  appId: "1:416361953557:web:ee3370110adc1f8e4b111c",
  measurementId: "G-Q5B755LZPY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
