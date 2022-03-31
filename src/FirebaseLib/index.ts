import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig  = {
    apiKey: "AIzaSyA5JO3BUoL1Lfx3J_IneZu-cIZ4tuG1rD0",
    authDomain: "svelte-crud-d9502.firebaseapp.com",
    projectId: "svelte-crud-d9502",
    storageBucket: "svelte-crud-d9502.appspot.com",
    messagingSenderId: "621723302637",
    appId: "1:621723302637:web:9a2b265ca5e2e92d5baae4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
