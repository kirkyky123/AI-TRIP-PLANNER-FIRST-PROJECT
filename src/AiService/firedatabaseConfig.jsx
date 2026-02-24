import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAFeubElM-R2iSXvaZ9hL63fIpiFic_M8M",
  authDomain: "ai-trip-planner-first-project.firebaseapp.com",
  projectId: "ai-trip-planner-first-project",
  storageBucket: "ai-trip-planner-first-project.appspot.com",
  messagingSenderId: "887762091538",
  appId: "1:887762091538:web:2eada68b895eac23f062cb",
  measurementId: "G-2VRQYS583X",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
