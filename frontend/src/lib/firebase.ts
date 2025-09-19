import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import type { User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBaLDPauECqHSYPIbABpX4Lsw4M3aAhwU",
  authDomain: "peer-pitch.firebaseapp.com",
  projectId: "peer-pitch",
  storageBucket: "peer-pitch.appspot.com",
  messagingSenderId: "781924769704",
  appId: "1:781924769704:web:ac3f7c1dd7ccc45210479d",
  measurementId: "G-FNHZGP40BH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const firebaseLoginGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    return res.user;
  } catch (error: any) {
    if (error.code === 'auth/cancelled-popup-request') {
      // Ignore cancelled popup requests
      return null;
    }
    throw error;
  }
};

export const firebaseLogout = async () => {
  await signOut(auth);
};

export const listenAuth = (cb: (u: User | null) => void) => {
  return onAuthStateChanged(auth, cb);
};
