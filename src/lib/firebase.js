// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: ProcessingInstruction.env.FIREBASE_API_KEY,
  authDomain: "mycodego-60df6.firebaseapp.com",
  projectId: "mycodego-60df6",
  storageBucket: "mycodego-60df6.appspot.com",
  messagingSenderId: "565208117805",
  appId: "1:565208117805:web:29f290dd08bf9e1f13bea4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);