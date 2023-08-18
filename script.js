import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector("#loginEmail").value;
  const loginPassword = document.querySelector("#loginPassword").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user", user);
      console.log(userCredential);
      alert("Signup Successfully");
      location.assign("home/home.html");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", error);
      // ..
    });
});
