import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyASi2XWHNpX8N0apjkXna1AxrBoq8FlOss",
  authDomain: "m1b-website.firebaseapp.com",
  projectId: "m1b-website",
  storageBucket: "m1b-website.firebasestorage.app",
  messagingSenderId: "832099135223",
  appId: "1:832099135223:web:8744b40577e1c0f3d26df2",
  measurementId: "G-1QNXWWMD65"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);