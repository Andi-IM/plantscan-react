import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_9OlrRkQ5wBHoTPN1e2H5c-fcVpuBKLc",
  authDomain: "orchid-app-7fe3d.firebaseapp.com",
  databaseURL:
    "https://orchid-app-7fe3d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "orchid-app-7fe3d",
  storageBucket: "orchid-app-7fe3d.appspot.com",
  messagingSenderId: "1016216753198",
  appId: "1:1016216753198:web:c99ae3fce334fbc0c67bbf",
  measurementId: "G-JCQ7Q85J2C",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
