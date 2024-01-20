// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
// ...

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj68ZvTPmtjzrc7vX7l2eNXTzaY3GyYC0",
  authDomain: "olechar-56783.firebaseapp.com",
  projectId: "olechar-56783",
  storageBucket: "olechar-56783.appspot.com",
  messagingSenderId: "288468386140",
  appId: "1:288468386140:web:cecf00424bb20801d74199"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getFirestore(app);

export {app, storage, doc, setDoc};

