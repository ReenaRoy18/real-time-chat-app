import React from 'react'
import '../Stylesheets/Register.scss';
import Add  from '../img/addAvatar.png';
import {createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth,storage} from '../utils/firebase/firebase.js';
import { useState } from 'react';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../utils/firebase/firebase.js';
import { useNavigate,Link } from 'react-router-dom';

function Register() {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const file = e.target[4].files[0];

    
try{

  const res =await createUserWithEmailAndPassword(auth, email, password)

const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on(
  (error) => {
    setErr(true);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL
      });
      await setDoc(doc(db,'users',res.user.uid),{ //creating users collection
        uid:res.user.uid,
        displayName,
        email,
        password,
        confirmPassword,
        photoURL:downloadURL,
      });
      await setDoc(doc(db,'userChats',res.user.uid),{})
       //creating user chat document
          navigate('/'); //after successful operation it will go to home page
    });
  }
);
}
catch(error){
  setErr(true);
}

  
  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className='logo '>Free Chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder='display name' />
            <input type="email" placeholder='email' />
            <input type="password" placeholder='password' />
            <input type="password" placeholder='confirm password' />
            <input style={{display:"none"}} type="file" id='file' />
            <label htmlFor="file">  
            {/* this file is id  whatever i write here its going to represent file i/ps*/} 
                <img src={Add} alt="" />
                <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
            {err && <span>Something Went Wrong</span>}
            </form>
            <p>You Do Have An Account <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register