import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration is hardcoded below
const firebaseConfig = {
  apiKey: "AIzaSyBKTFw_nmwW1R_KXzpzyiGRKaFI0fxCDfg",
  authDomain: "noteboard-13de1.firebaseapp.com",
  projectId: "noteboard-13de1",
  storageBucket: "noteboard-13de1.firebasestorage.app",
  messagingSenderId: "874285693727",
  appId: "1:874285693727:web:5eaee38fe5a977bac70e2a",
  measurementId: "G-1QEEC4L0SL"
};

// This guard clause ensures that the config object is populated before initialization.
if (!firebaseConfig.apiKey) {
    throw new Error("Firebase configuration is missing. Check src/lib/firebase-config.ts");
}

// Initialize Firebase using a more robust pattern
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
