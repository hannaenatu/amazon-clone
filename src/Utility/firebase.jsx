import firebase from "firebase/compat/app"; // Import the compat version of Firebase

import { getAuth } from "firebase/auth";
import "firebase/compat/firestore"; // Import Firestore compat
import "firebase/compat/auth"; // Import Auth compat

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfX9T7Dyp6wvH2gQ8luIWxOsZ4Db-HReM",
  authDomain: "clone-265cb.firebaseapp.com",
  projectId: "clone-265cb",
  storageBucket: "clone-265cb.appspot.com",
  messagingSenderId: "1038660387284",
  appId: "1:1038660387284:web:16af41cc71a16995521641",
};

// Initialize Firebase using the compat version
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app); // Use Firebase compat Auth
export const db = firebase.firestore(); // Use Firebase compat Firestore
