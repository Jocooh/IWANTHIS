import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3G2zFLuMAVDpv3S0ptpmyxD8VmcKElz0",
  authDomain: "iwanthis-ab4f5.firebaseapp.com",
  projectId: "iwanthis-ab4f5",
  storageBucket: "iwanthis-ab4f5.appspot.com",
  messagingSenderId: "416719827307",
  appId: "1:416719827307:web:f95967bb6600a9ee629c2e",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
