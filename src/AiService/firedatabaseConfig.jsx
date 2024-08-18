// Import the functions you need from the SDKs you need
import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFeubElM-R2iSXvaZ9hL63fIpiFic_M8M",
  authDomain: "ai-trip-planner-first-project.firebaseapp.com",
  projectId: "ai-trip-planner-first-project",
  storageBucket: "ai-trip-planner-first-project.appspot.com",
  messagingSenderId: "887762091538",
  appId: "1:887762091538:web:2eada68b895eac23f062cb",
  measurementId: "G-2VRQYS583X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);