import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../toast';
import {ToastContainer} from 'react-toastify'

function Home() {

  const [loggedinUser,setloggedinUser] = useState('');
  const [products,setproducts] = useState('');
  const navigate = useNavigate();
  
useEffect(()=>{
  setloggedinUser(localStorage.getItem('loggedinUser'))
})

const handleLogout =(e)=>{
  localStorage.removeItem('token');
  localStorage.removeItem('loggedinUser');
  handleSuccess('User LoggedOut')
  setTimeout(()=>{
   navigate('/login')
  },1000)
}

const fetchProducts =async ()=>{
  try{
    const url = "http://localhost:9090/products"
    const headers ={ headers:{
      "Authorization" : localStorage.getItem("token")
    }
  }
  const response = await fetch(url,headers)
  const result =await response.json();
  console.log(result)
  setproducts(result)

  }catch(err){
    handleError(err)
  }
}
   useEffect(()=>{
      fetchProducts();
        },[])

  return (
    <div>
      <h1>{loggedinUser}</h1>
      <div>
        {products && products.map((item,index)=>(
          <ul key={index}>
            <span>{item.name} : {item.price }</span>
          </ul>
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
      
      <ToastContainer/>
    </div>
  )
}

export default Home
