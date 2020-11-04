import * as firebase from "firebase/app";
import "firebase/auth"
import "firebase/storage";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyD2afCskbVSYf8Mmld_P4ShIqVEARZ9l-A",
  authDomain: "ra-memories.firebaseapp.com",
  databaseURL: "https://ra-memories.firebaseio.com",
  projectId: "ra-memories",
  storageBucket: "ra-memories.appspot.com",
  messagingSenderId: "14784083912",
  appId: "1:14784083912:web:ec2faff02ecedb1b4db2fd",
  measurementId: "G-V2S8DQR31W",
};

firebase.default.initializeApp(config);