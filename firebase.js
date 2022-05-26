// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD03tPq1TYmJTJwPSx25S4-OZ_jZK_c3D0",
  authDomain: "whatsapp-clone-6c6ad.firebaseapp.com",
  projectId: "whatsapp-clone-6c6ad",
  storageBucket: "whatsapp-clone-6c6ad.appspot.com",
  messagingSenderId: "34383439024",
  appId: "1:34383439024:web:888348ba775aa474768775"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {db,auth,provider}