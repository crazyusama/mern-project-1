import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../toast';



function Login() {

  const [ loginInfo,setloginInfo] = useState({
    email:'',
    password:''
  })

  const handleChanje = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    const copyloginInfo = {...loginInfo};
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  }

  const navigate = useNavigate()

  const hanleloginRefresh =async (e)=>{
    e.preventDefault();
    const {email,password} = loginInfo;
    if( !email || !password){                  //for client-side validation
      return handleError('email and password are required')
    }
    try{
         const url = "https://mern-project-1-api.vercel.app/auth/login";
         const response = await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'       // yeh POST method ka leeye hai 
          },
          body:JSON.stringify(loginInfo)
         })
         const result = await response.json();
         
         const {success,message,jwtToken,name,error} =result;
         if(success){
          handleSuccess(message);
          setTimeout(()=>{
           navigate('/home')
          },2000)
          
          localStorage.setItem('loggedinUser',name);
          localStorage.setItem('token',jwtToken);

         } else if(error){
          const details = error.details[0].message;
          handleError(details)
         }else if(!success){
          handleError(message)
         }
         console.log(result)
    }catch(err){
       handleError(err)
    }
  }
  return (
   <div className='container'>
   
   <h2>Login</h2>
      <form onSubmit={hanleloginRefresh}>
        <div>
            <label htmlFor='email'>Email</label>
            <input onChange={handleChanje} value={loginInfo.email} type='email' name='email' placeholder='Enter your email...'/>
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input onChange={handleChanje} value={loginInfo.password} type='password' name='password' placeholder='Enter your password...'/>
        </div>
        <button>Login</button>
      <span>Don't have an account? <Link to='/signup'>Signup</Link></span>
     
      </form>

      <ToastContainer/>
 
    </div>

  )
}

export default  Login
