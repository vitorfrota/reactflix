import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig: FirebaseOptions = {
   apiKey: String(import.meta.env.VITE_API_KEY),
   authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
   projectId: String(import.meta.env.VITE_PROJECT_ID),
   storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
   messagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
   appId: String(import.meta.env.VITE_APP_ID),
   databaseURL: String(import.meta.env.VITE_DATABASE_URL),
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getDatabase(firebase);

export { auth, firebase, db };
