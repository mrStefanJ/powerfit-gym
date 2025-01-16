import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUKchuwuvEPMdwCSqc-KOHPGoKKYcTxfk",
  authDomain: "powerfit-gym-a2e69.firebaseapp.com",
  projectId: "powerfit-gym-a2e69",
  storageBucket: "powerfit-gym-a2e69.firebasestorage.app",
  messagingSenderId: "420516372153",
  appId: "1:420516372153:web:414d75fee16f4022d8c568",
  measurementId: "G-NC4XEEFKLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);