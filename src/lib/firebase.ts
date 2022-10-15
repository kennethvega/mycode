// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  collectionGroup,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mycodego-60df6.firebaseapp.com",
  projectId: "mycodego-60df6",
  storageBucket: "mycodego-60df6.appspot.com",
  messagingSenderId: "565208117805",
  appId: "1:565208117805:web:29f290dd08bf9e1f13bea4",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { app, db, auth, storage };

