import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

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
const db = getFirestore(app);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(user);
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const inputText = document.querySelector("#inputText").value;
      console.log(inputText);
      try {
        const docRef = await addDoc(collection(db, "todo"), {
          inputText: inputText,
          createdAt: serverTimestamp(),
        });
        form.reset();
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });

    // ...
  } else {
    // User is signed out
    // ...
    console.log("error");
  }
});

window.addEventListener("load", () => {
  const q = query(collection(db, "todo"), orderBy("createdAt", "desc"));
  const postSection = document.querySelector("#postSection");
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    postSection.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const post = document.createElement("div");
      post.innerText = doc.data().inputText;
      post.classList.add("post");

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn");
      deleteBtn.id = `${doc.id}`;
      deleteBtn.innerText = "Delete";

      const editBtn = document.createElement("button");
      editBtn.classList.add("btn");
      editBtn.id = `${doc.id}`;
      editBtn.innerText = "Edit";
      post.appendChild(deleteBtn);
      post.appendChild(editBtn);
      postSection.appendChild(post);
      deleteBtn.addEventListener("click", () => deletePostFunc(doc.id));
      editBtn.addEventListener("click", () =>
        editPostFunc(doc.id, doc.data().inputText)
      );
    });
    console.log("lkjfcsl");
  });
});

const deletePostFunc = async (id) => {
  await deleteDoc(doc(db, "todo", id));
};
const editPostFunc = (id, text) => {
  document.querySelector("#editForm").style.display = "block";
  document.querySelector("#editText").value = text;
};
