import React from 'react'
import Add  from '../img/addAvatar.png';
import {useNavigate,Link} from 'react-router-dom';
import {useState} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../utils/firebase/firebase.js';

function Login() {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    
try{
 await signInWithEmailAndPassword(auth, email, password)
  navigate('/'); //if there is user then navigate to home page
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
            <input type="email" placeholder='email' />
            <input type="password" placeholder='password' />
            
            <button>Sign In</button>
            {err && <span>Something went wrong</span>}
            </form>
            <p>You Don't Have An Account? <Link to='/register'>Register</Link></p>
        </div>
    </div>
  )
}

export default Login