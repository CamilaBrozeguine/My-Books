import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDiXbUmjmZZl8BcRuAgu7eHsfzri4hPcBg",
  authDomain: "my-books-7e274.firebaseapp.com",
  projectId: "my-books-7e274",
  storageBucket: "my-books-7e274.firebasestorage.app",
  messagingSenderId: "354496096398",
  appId: "1:354496096398:web:a58311024c14dac43341df",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);           // ← exporta auth
export const googleProvider = new GoogleAuthProvider(); // ← exporta provider