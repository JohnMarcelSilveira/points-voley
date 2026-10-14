import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyCtnshrY2MACodPUBbo7EbqDVvLup9G9EI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "points-voley.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "points-voley",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "points-voley.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "667579471619",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:667579471619:web:8c7f2d8abf4595e5957b36",
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const googleProvider = new GoogleAuthProvider();

if (db) {
  enableMultiTabIndexedDbPersistence(db).catch(() =>
    enableIndexedDbPersistence(db).catch(() => {}),
  );
}
