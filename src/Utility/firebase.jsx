// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
//get auth is used for authentication purposes

import {getFirestore} from "firebase/firestore";
//needed to use the firestore db

import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDfX9T7Dyp6wvH2gQ8luIWxOsZ4Db-HReM",
  authDomain: "clone-265cb.firebaseapp.com",
  projectId: "clone-265cb",
  storageBucket: "clone-265cb.appspot.com",
  messagingSenderId: "1038660387284",
  appId: "1:1038660387284:web:16af41cc71a16995521641",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
