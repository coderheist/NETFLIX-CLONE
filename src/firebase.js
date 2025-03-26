// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCYmfYMAg64WDQxH7G9QDrB7TJuP3oC3ls",
  authDomain: "netflix-clone-efda3.firebaseapp.com",
  projectId: "netflix-clone-efda3",
  storageBucket: "netflix-clone-efda3.firebasestorage.app",
  messagingSenderId: "559654270411",
  appId: "1:559654270411:web:e5c730a38b6b4061c5324e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db= getFirestore(app);


const signup=async(name,email,password)=>{
    try{

        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
    }
    catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(""));
    }
}
const login=async(email,password)=>{
    try{
        const res=await signInWithEmailAndPassword(auth,email,password);
        const user=res.user;
        console.log(user);
    }
    catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(""));
    }
}
const logout=()=>{
    signOut(auth);
}
export{auth,db,signup,login,logout};