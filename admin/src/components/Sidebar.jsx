import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { FiGrid, FiCalendar, FiUserPlus, FiUsers, FiUser } from 'react-icons/fi'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  const linkClass = ({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] transition ${isActive ? 'bg-[#eaf4ef] font-bold text-[#267b66]' : 'text-[#526d62] hover:bg-[#f5f8f6] hover:text-[#267b66]'}`
  const item = (to, Icon, label) => <li key={to}><NavLink to={to} className={linkClass}><Icon aria-hidden="true" className="h-[19px] w-[19px] shrink-0 stroke-[2.2] text-[#347b63]" /><span className="max-md:hidden">{label}</span></NavLink></li>

  return <aside className="sticky top-[72px] min-h-[calc(100vh-72px)] w-[230px] shrink-0 border-r border-[#e5eee8] bg-white max-md:w-[68px]">
    <div className="px-5 pb-2 pt-7 text-[10px] font-bold uppercase tracking-[.16em] text-[#82968c] max-md:hidden">Workspace</div>
    {aToken && <ul className="flex flex-col gap-1.5 p-3 max-md:px-2">
      {item('/admin-dashboard', FiGrid, 'Dashboard')}
      {item('/all-appointments', FiCalendar, 'Appointments')}
      {item('/add-doctor', FiUserPlus, 'Add doctor')}
      {item('/doctor-list', FiUsers, 'Doctor directory')}
    </ul>}
    {dToken && <ul className="flex flex-col gap-1.5 p-3 max-md:px-2">
      {item('/doctor-dashboard', FiGrid, 'Dashboard')}
      {item('/doctor-appointments', FiCalendar, 'Appointments')}
      {item('/doctor-profile', FiUser, 'Profile')}
    </ul>}
  </aside>
}
export default Sidebar
