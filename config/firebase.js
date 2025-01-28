// // Change import to require
// const { initializeApp } = require("firebase/app");
// const { getStorage } = require("firebase/storage");

// const firebaseConfig = {
//   apiKey: "AIzaSyBwq4XnZSPjHRIuZINfnMDXguYfDKM5XLg",
//   authDomain: "attedancemanagement.firebaseapp.com",
//   databaseURL: "https://attedancemanagement-default-rtdb.firebaseio.com",
//   projectId: "attedancemanagement",
//   storageBucket: "attedancemanagement.appspot.com",
//   messagingSenderId: "989743515065",
//   appId: "1:989743515065:web:150d3891159e478dbe2268",
//   measurementId: "G-PXG6PJ2343"
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// module.exports = { app, storage }; // Use module.exports instead of export

// config/firebase.js

const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyBwq4XnZSPjHRIuZINfnMDXguYfDKM5XLg",
  authDomain: "attedancemanagement.firebaseapp.com",
  databaseURL: "https://attedancemanagement-default-rtdb.firebaseio.com",
  projectId: "attedancemanagement",
  storageBucket: "attedancemanagement.appspot.com",
  messagingSenderId: "989743515065",
  appId: "1:989743515065:web:150d3891159e478dbe2268",
  measurementId: "G-PXG6PJ2343"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { app, storage };  // Export app and storage only once
