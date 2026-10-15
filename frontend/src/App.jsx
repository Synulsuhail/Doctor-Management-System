import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Alldoctors from './Pages/Alldoctors'
import Contact from './Pages/Contact'
import Home from './Pages/Home'
import Myappointment from './Pages/Myappointment'

import Myprofile from './Pages/Myprofile'
import About from './Pages/About'
import Navbar from './components/Navbar'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import Footer from './components/Footer'
import Appointment from './Pages/BookAppointment.jsx'
import Services from './components/Services'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const App = () => {
  return (
    <div>
   <ToastContainer/>
   <Navbar/>
 
     
<Routes>
   <Route path='/' element={<Home/>}/>
  <Route path='/doctors' element={<Alldoctors/>}/>
   <Route path='/doctors/:speciality' element={<Alldoctors/>}/>
  <Route path='/contact' element={<Contact/>}/>
 
  <Route path='/myappointment' element={<Myappointment/>}/>
  <Route path='/appointment' element={<Appointment/>}/>
  <Route path='/appointment/:docId' element={<Appointment/>}/>
  <Route path='/myprofile' element={<Myprofile/>}/>
  <Route path='/about' element={<About/>}/>
   <Route path='/services' element={<Services/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path="/forgot-password" element={<ForgotPassword />} />
   <Route path="/reset-password" element={<ResetPassword />} />
  
</Routes>

    
     <Footer/>
      </div>
  )
}

export default App

