// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpeQDcc9YiTvB2w2xA0FUiVZ4howpg8a8",
  authDomain: "spending-analysis-ab4dc.firebaseapp.com",
  projectId: "spending-analysis-ab4dc",
  storageBucket: "spending-analysis-ab4dc.appspot.com", // ✅ Fixed storageBucket
  messagingSenderId: "145769091380",
  appId: "1:145769091380:web:0d0ea0d23a6cf474335561",
  measurementId: "G-JL1QFHJVK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Make sure Firestore is properly initialized
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
