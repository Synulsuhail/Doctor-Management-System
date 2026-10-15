import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import Doctorslist from './pages/Admin/Doctorslist'
import AddDoctors from './pages/Admin/AddDoctors'
import { Route, Routes } from 'react-router-dom'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import DoctorForgotPassword from './pages/Doctor/DoctorForgetPassword'
import DoctorResetPassword from './pages/Doctor/DoctorResetPassword'
import './App.css'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  const isAuthenticated = aToken || dToken

  return <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/doctor-forgot-password" element={<DoctorForgotPassword />} />
      <Route path="/doctor-reset-password" element={<DoctorResetPassword />} />
      {isAuthenticated && <Route path="/*" element={<>
        <Navbar />
        <div className="admin-shell flex items-start">
          <Sidebar />
          <main className="admin-main">
            <div className="admin-page">
              <Routes>
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-doctor" element={<AddDoctors />} />
                <Route path="/doctor-list" element={<Doctorslist />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
              </Routes>
            </div>
          </main>
        </div>
      </>} />}
    </Routes>
  </>
}

export default App
