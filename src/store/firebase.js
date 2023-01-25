// import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  setDoc,
  addDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
  query,
  deleteDoc,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCPkW0ZniWt3RaFA406gUtBpOy4P36Lpic',
  authDomain: 'grocery-list-20493.firebaseapp.com',
  projectId: 'grocery-list-20493',
  storageBucket: 'grocery-list-20493.appspot.com',
  messagingSenderId: '877405337194',
  appId: '1:877405337194:web:0e2c60694da88b182e7c13',
}

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const fbAuth = getAuth(fbApp)
const fbDB = getFirestore(fbApp)

export {
  fbApp,
  fbAuth,
  fbDB,
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  deleteDoc,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
}
