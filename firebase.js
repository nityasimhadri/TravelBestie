// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJaqGTcfOpmtiGh7EkVhWW7FfZqu2VlVE",
  authDomain: "travelbestie-32584.firebaseapp.com",
  projectId: "travelbestie-32584",
  storageBucket: "travelbestie-32584.appspot.com",
  messagingSenderId: "212838128581",
  appId: "1:212838128581:web:c4a2fa853ebc94d45bc9ac",
  measurementId: "G-0XTX8CX6MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);