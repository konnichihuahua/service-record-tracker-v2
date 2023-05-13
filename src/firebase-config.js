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
  apiKey: "AIzaSyBD0-q3fi_g7tG23ns0SSjSZirREGSbC3E",
  authDomain: "service-record-tracker-d131c.firebaseapp.com",
  projectId: "service-record-tracker-d131c",
  storageBucket: "service-record-tracker-d131c.appspot.com",
  messagingSenderId: "408872689340",
  appId: "1:408872689340:web:9335b6bd78db9cb8f53ab9",
  measurementId: "G-ZRPMY540MB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
