import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVAOpEaZhbU8kACTEsGM6PuIsTcX09ATw",
  authDomain: "pokerater-9d1fd.firebaseapp.com",
  projectId: "pokerater-9d1fd",
  storageBucket: "pokerater-9d1fd.appspot.com",
  messagingSenderId: "347104440672",
  appId: "1:347104440672:web:f41a57bc8127c2bf17ee05",
  measurementId: "G-0L0LQ4NC14"
};


let app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
