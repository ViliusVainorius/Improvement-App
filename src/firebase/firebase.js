// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-VvgwTnu2CyaOyvL2vEF06yWlkH8BLbc",
  authDomain: "improvement-app-a32a3.firebaseapp.com",
  projectId: "improvement-app-a32a3",
  storageBucket: "improvement-app-a32a3.appspot.com",
  messagingSenderId: "247810229810",
  appId: "1:247810229810:web:2e8d1f33b9234511729e2b",
  measurementId: "G-E5Z0HSNVQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };