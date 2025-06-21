import { initializeApp, getApp } from "firebase/app";
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

// Robust initialization to prevent re-initialization errors and ensure config is loaded.
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (e: any) {
    if (e.code === 'firebase/duplicate-app') {
        // This can happen in development with hot-reloading.
        app = getApp();
    } else {
        // Re-throw any other errors
        console.error("Firebase initialization failed:", e);
        throw e;
    }
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
