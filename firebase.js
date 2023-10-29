import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJaqGTcfOpmtiGh7EkVhWW7FfZqu2VlVE",
  authDomain: "travelbestie-32584.firebaseapp.com",
  projectId: "travelbestie-32584",
  storageBucket: "travelbestie-32584.appspot.com",
  messagingSenderId: "212838128581",
  appId: "1:212838128581:web:c4a2fa853ebc94d45bc9ac",
  measurementId: "G-0XTX8CX6MT"
};


if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const auth = firebase.auth();

export  { auth };