import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCc-Zd2jwZu1XkieJOiwo7K12pYeAv0GIM",
  authDomain: "chat-3212b.firebaseapp.com",
  projectId: "chat-3212b",
  storageBucket: "chat-3212b.appspot.com",
  messagingSenderId: "310809379041",
  appId: "1:310809379041:web:ebcffbd4ca4a745d4077a0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
