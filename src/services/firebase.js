// Importamos las librerias para acceder al SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCInm1PCJreg4imrei0KrRXgSQbZHEdH5M",
  authDomain: "forgetapas.firebaseapp.com",
  projectId: "forgetapas",
  storageBucket: "forgetapas.appspot.com",
  messagingSenderId: "438754117618",
  appId: "1:438754117618:web:f2b88156f5709a13f08d6b",
  measurementId: "G-D01GF8WTKS"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Configura Firebase Auth con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Se inicializa Firestore
const db = getFirestore(app);

// Exportamos las instancias para todos los códigos
export { auth, db };
