import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // IWANTHIS
  // apiKey: "AIzaSyC3G2zFLuMAVDpv3S0ptpmyxD8VmcKElz0",
  // authDomain: "iwanthis-ab4f5.firebaseapp.com",
  // projectId: "iwanthis-ab4f5",
  // storageBucket: "iwanthis-ab4f5.appspot.com",
  // messagingSenderId: "416719827307",
  // appId: "1:416719827307:web:f95967bb6600a9ee629c2e",
  // IWANTHIS2
  apiKey: "AIzaSyAMlnRl_K4BBJ7Ah0R6366ZeCSqnnlJw1k",
  authDomain: "iwanthis2-b1c77.firebaseapp.com",
  projectId: "iwanthis2-b1c77",
  storageBucket: "iwanthis2-b1c77.appspot.com",
  messagingSenderId: "831653698564",
  appId: "1:831653698564:web:60f0ee54328af3bf87a951",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
