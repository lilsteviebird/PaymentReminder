import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA1R7T36mhkiDUJ-HV2KP6RTNqSt5P5tJM",
    authDomain: "paymentreminder-2a12e.firebaseapp.com",
    projectId: "paymentreminder-2a12e",
    storageBucket: "paymentreminder-2a12e.appspot.com",
    messagingSenderId: "1044220576077",
    appId: "1:1044220576077:web:92746b9feab2218c5d3704"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;