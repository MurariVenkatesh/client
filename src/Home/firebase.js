
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyDR1Fs1Aw7QN0W0yUQ3yrcsoCfeMb1TW5U",
//     authDomain: "sample-6718f.firebaseapp.com",
//     projectId: "sample-6718f",
//     storageBucket: "sample-6718f.appspot.com",
//     messagingSenderId: "31632796550",
//     appId: "1:31632796550:web:31e83ab3feab8faba65a07",
//     measurementId: "G-L1F6XVPHYV"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { auth, provider, signInWithPopup };
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDR1Fs1Aw7QN0W0yUQ3yrcsoCfeMb1TW5U",
  authDomain: "sample-6718f.firebaseapp.com",
  projectId: "sample-6718f",
  storageBucket: "sample-6718f.appspot.com",
  messagingSenderId: "31632796550",
  appId: "1:31632796550:web:31e83ab3feab8faba65a07",
  measurementId: "G-L1F6XVPHYV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, signInWithPopup,storage };
