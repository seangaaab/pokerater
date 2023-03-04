import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyBlwPQlVAnpt3s4emFcg94aZr8WoMVpRJE",

  authDomain: "pokerater-firebase-hackathon.firebaseapp.com",

  projectId: "pokerater-firebase-hackathon",

  storageBucket: "pokerater-firebase-hackathon.appspot.com",

  messagingSenderId: "185745144218",

  appId: "1:185745144218:web:f79c4fdad6561f13302223"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
