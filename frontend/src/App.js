import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import RefreshHandler from './pages/RefreshHandler';

function App() {

  const [isAuthenticated,setisAuthenticated] = useState(false);
  const PrivateRoute= ({element})=>{                     //agar user home par hai to wo doosry routes (login,signup par naa jaa saky bina logout keeyee iski private routin kehty)
       return isAuthenticated ? element : <Navigate to="login"/>
  }
  return (
    <div>
     <RefreshHandler setisAuthenticated={setisAuthenticated}/>
         <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/' element={<PrivateRoute element={<Home/>}/>}/>
     </Routes>
    </div>
  )
}

export default App
