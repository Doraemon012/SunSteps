// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // conf
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const database = getDatabase(app);
export const auth = getAuth(app);

export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      localStorage.clear();
      // toast.success("Logged out successfully", { transition: Zoom });
      console.log("Logged out successfully");

      window.location.href = "#/";
      window.location.reload();
    })
    .catch((error: any) => {
      // An error happened.
      console.error(error);
    });
};

// export {
//   auth,
//   firestore,
//   database,
  // storage,
  // signInWithGooglePopup,
//   signOutUser,
// };


// dample game creatingb 


