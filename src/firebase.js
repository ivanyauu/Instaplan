import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyABKVUcMGLzWaF_-jYLrG8K5A3mX5QykDw",
  authDomain: "cs35-final-68bdc.firebaseapp.com",
  projectId: "cs35-final-68bdc",
  storageBucket: "cs35-final-68bdc.appspot.com",
  messagingSenderId: "1051495536072",
  appId: "1:1051495536072:web:cdff99e34fa20e2bb49cfd"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };