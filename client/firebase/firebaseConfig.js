// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNCBiGV-15kBYFYhBPnsg567h8p6cqSl8",
  authDomain: "bu-busy.firebaseapp.com",
  projectId: "bu-busy",
  storageBucket: "bu-busy.appspot.com",
  messagingSenderId: "548730044136",
  appId: "1:548730044136:web:2c7ccc6992585a1900935d",
  measurementId: "G-RF2FP0E88B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
