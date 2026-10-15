import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { FiLogOut, FiActivity } from 'react-icons/fi'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()
  const logout = () => {
    navigate('/')
    if (aToken) { setAToken(''); localStorage.removeItem('aToken') }
    if (dToken) { setDToken(''); localStorage.removeItem('dToken') }
  }
  return <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-[#e5eee8] bg-white/95 px-5 backdrop-blur sm:px-8">
    <button onClick={() => navigate(aToken ? '/admin-dashboard' : '/doctor-dashboard')} className="flex items-center gap-3 text-left">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf4ef] text-xl text-[#267b66]"><FiActivity /></span>
      <span><span className="block text-lg font-extrabold tracking-tight text-[#173d35]">Doc<span className="text-[#4b9b7d]">Booking</span></span><span className="block text-[11px] font-semibold uppercase tracking-[.13em] text-[#82958c]">Healthcare management</span></span>
    </button>
    <div className="flex items-center gap-4">
      <span className="hidden rounded-full bg-[#edf6f1] px-3 py-1.5 text-xs font-bold text-[#347a62] sm:inline-flex">{aToken ? 'Admin portal' : 'Doctor portal'}</span>
      <button onClick={logout} className="flex items-center gap-2 rounded-xl border border-[#e6eee9] px-3.5 py-2.5 text-sm font-bold text-[#526b61] transition hover:border-[#d5e6dc] hover:bg-[#f5faf7] hover:text-[#267b66]"><FiLogOut /><span className="hidden sm:inline">Log out</span></button>
    </div>
  </header>
}
export default Navbar
