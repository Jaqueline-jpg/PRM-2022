import dotenv from 'dotenv';
import { initializeApp, FirebaseError } from "firebase/app";
import { AsyncLocalStorage } from 'async_hooks';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

//carregar variaveis de ambiente
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Autenticação
const signInAdmin = (email: string, password: string) => (signInWithEmailAndPassword(getAuth(), email, password))

//Envia mensagem a fila
const sendtoQueeu = async (message: string) => {
    await 
}


export { FirebaseError, signInAdmin}