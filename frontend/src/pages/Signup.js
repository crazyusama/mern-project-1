import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../toast';



function Signup() {

  const [SignupInfo,setSignupInfo] = useState({
    name:'',
    email:'',
    password:''
  })

  const handleChanje = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    const copySignupInfo = {...SignupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }

  const navigate = useNavigate()

  const hanleSignupRefresh =async (e)=>{
    e.preventDefault();
    const {name,email,password} = SignupInfo;
    if(!name || !email || !password){                  //for client-side validation
      return handleError('name,email and password are required')
    }
    try{
         const url = "http://localhost:9090/auth/signup";
         const response = await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(SignupInfo)
         })
         const result = await response.json();
         const {success,message,error} =result;
         if(success){
          handleSuccess(message);
          setTimeout(()=>{
           navigate('/login')
          },2000)
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
   
   <h2>Signup</h2>
      <form onSubmit={hanleSignupRefresh}>
        <div>
            <label htmlFor='name'>Name</label>
            <input onChange={handleChanje} value={SignupInfo.name} type='text' name='name' placeholder='Enter your name...'/>
        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <input onChange={handleChanje} value={SignupInfo.email} type='email' name='email' placeholder='Enter your email...'/>
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input onChange={handleChanje} value={SignupInfo.password} type='password' name='password' placeholder='Enter your password...'/>
        </div>
        <button>Signup</button>
      <span>Already have an account? <Link to='/login'>Login</Link></span>
     
      </form>

      <ToastContainer/>
 
    </div>

  )
}

export default Signup
