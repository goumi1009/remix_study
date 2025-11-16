import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBjmzW_6844phfH-pByW0__HEY1MennEdE',
  authDomain: 'modern-nats-ui.firebaseapp.com',
  projectId: 'modern-nats-ui',
  storageBucket: 'modern-nats-ui.firebasestorage.app',
  messagingSenderId: '476445953823',
  appId: '1:476445953823:web:f803360e0a4abce4f8ea2a',
  measurementId: 'G-7LLKX4349C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth();

export const signInFirebase = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = await userCredential.user.getIdToken();
    return user;
  } catch (e) {
    console.error('Firebase signIn error', e);
  }
};
