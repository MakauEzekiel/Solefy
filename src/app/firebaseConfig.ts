import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes, updateEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmC3jgQ5tTB8FbWpHHm42-0mki8Wt9kAg",
  authDomain: "luxe-25b80.firebaseapp.com",
  projectId: "luxe-25b80",
  storageBucket: "luxe-25b80.appspot.com",
  messagingSenderId: "613096724866",
  appId: "1:613096724866:web:ba011c7aafb91173a2579b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes, updateEmail };