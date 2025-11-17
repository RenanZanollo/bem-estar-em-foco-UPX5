// frontend/src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Substitua pelos dados reais do seu projeto Firebase (web config)
const firebaseConfig = {
  apiKey: "AIzaSyAX_7mZLCU2685xdo4VYAIffPdhz5IySNA",
  authDomain: "bem-estar-em-foco.firebaseapp.com",
  projectId: "bem-estar-em-foco",
  storageBucket: "bem-estar-em-foco.firebasestorage.app",
  messagingSenderId: "197569743511",
  appId: "1:197569743511:web:27fd3e975bb3cb9fd1f7d2",
  measurementId: "G-5KXR4Y82D7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
