// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlJyyD6a9KryO40MhHL1vadD52Ws8VwGQ",
  authDomain: "codingforum-30f33.firebaseapp.com",
  projectId: "codingforum-30f33",
  storageBucket: "codingforum-30f33.appspot.com",
  messagingSenderId: "160938033157",
  appId: "1:160938033157:web:93849ec4443b56861d1c6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
// console.log(auth.currentUser);

export {fireDB, auth}