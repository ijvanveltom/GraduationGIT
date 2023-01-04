import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-sKXewfW8_WahcSvpQcL6xk1qgx_C-mg",
  authDomain: "vue-auth-poc-ce24b.firebaseapp.com",
  projectId: "vue-auth-poc-ce24b",
  storageBucket: "vue-auth-poc-ce24b.appspot.com",
  messagingSenderId: "162260923217",
  appId: "1:162260923217:web:10d8592bdd671ad7599970"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()

export { app, auth }