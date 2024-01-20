import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLYRPl3F6QTHHKrDxZ5FXpwThd9GabZVw",
  authDomain: "beatreal-de77c.firebaseapp.com",
  databaseURL:
    "https://beatreal-de77c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "beatreal-de77c",
  storageBucket: "beatreal-de77c.appspot.com",
  messagingSenderId: "902126848839",
  appId: "1:902126848839:web:c12af82f8b4ae0956b9a62",
  measurementId: "G-DC9N6CYT1G",
};

const firebaseApp = initializeApp(firebaseConfig);
initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default firebaseApp;
