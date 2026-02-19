import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-g80p7I3PnT4R766XnQw3jJvC9CnnawQ",
  authDomain: "learn-lingo-150c6.firebaseapp.com",
  projectId: "learn-lingo-150c6",
  storageBucket: "learn-lingo-150c6.firebasestorage.app",
  messagingSenderId: "1057017129990",
  appId: "1:1057017129990:web:41ecb542d128bbf7c9a787",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
