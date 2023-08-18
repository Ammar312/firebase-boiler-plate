import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAvpH542wCxa_VjokuMWrVBNpkWA1vgUo",
  authDomain: "boiler-plate-6ea86.firebaseapp.com",
  projectId: "boiler-plate-6ea86",
  storageBucket: "boiler-plate-6ea86.appspot.com",
  messagingSenderId: "859017546758",
  appId: "1:859017546758:web:a3639fa7975b81bee70787",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const signupEmail = document.querySelector("#signupEmail").value;
  const signupPassword = document.querySelector("#signupPassword").value;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user", user);
      console.log(userCredential);
      updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });

      alert("Signup Successfully");
      location.assign("../home/home.html");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", error);
      // ..
    });
});
