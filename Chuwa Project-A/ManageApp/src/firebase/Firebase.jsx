import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDta9LFliaVvP63EU1YPJp2lvrFj6BnAZQ",
  authDomain: "my-products-management.firebaseapp.com",
  projectId: "my-products-management",
  storageBucket: "my-products-management.appspot.com",
  messagingSenderId: "400615682510",
  appId: "1:400615682510:web:b932ce7688e04460a7fb9f",
  measurementId: "G-XJ7BZ4H5D4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export default firebaseApp;