import React, { useState, useContext, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { FaChevronDown } from 'react-icons/fa'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const logout = () => { setToken(false); localStorage.removeItem('token'); navigate('/') }
  useEffect(() => setProfileOpen(false), [token])
  useEffect(() => {
    const handleClickOutside = (event) => { if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false) }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const navClass = ({ isActive }) => `rounded-full px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-[#eaf4ef] text-[#267b66]' : 'text-[#667c74] hover:text-[#267b66]'}`

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e9efeb] bg-white/95 shadow-[0_3px_18px_rgba(28,60,45,0.035)] backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center px-5 sm:px-8 lg:px-12">
        <button onClick={() => navigate('/')} aria-label="DocBooking home" className="shrink-0"><img src={assets.Docbooking} alt="DocBooking" className="h-11 w-40 object-contain object-left" /></button>
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"><NavLink to="/" end className={navClass}>Home</NavLink><NavLink to="/about" className={navClass}>About</NavLink><NavLink to="/doctors" className={navClass}>Find a doctor</NavLink><NavLink to="/contact" className={navClass}>Contact</NavLink></div>
        <div className="ml-auto flex items-center gap-3">
          {!token ? <button onClick={() => navigate('/login')} className="hidden rounded-full bg-[#267b66] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#267b66]/15 transition hover:-translate-y-0.5 hover:bg-[#1e6c59] sm:block">Create account <span aria-hidden="true">→</span></button> : <div className="relative" ref={profileRef}><button aria-label="Open profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-full border border-[#e6eeea] p-1.5"><img src={userData?.image || assets.upload_area} alt="" className="h-9 w-9 rounded-full border border-[#e4ece7] object-cover"/><FaChevronDown className={`mr-1 text-[10px] text-[#658077] transition-transform ${profileOpen ? 'rotate-180' : ''}`} /></button>{profileOpen && <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-[#e8efeb] bg-white p-2 shadow-xl"><button onClick={() => { navigate('/myprofile'); setProfileOpen(false) }} className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#36554a] hover:bg-[#f2f7f4]">My profile</button><button onClick={() => { navigate('/myappointment'); setProfileOpen(false) }} className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#36554a] hover:bg-[#f2f7f4]">My appointments</button><button onClick={logout} className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50">Log out</button></div>}</div>}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} className="grid h-10 w-10 place-items-center rounded-full border border-[#e6eeea] text-[#31584b] md:hidden"><span className="text-xl leading-none">{menuOpen ? '×' : '☰'}</span></button>
        </div>
      </div>
      {menuOpen && <div className="border-t border-[#edf2ef] bg-white px-5 py-4 md:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-1"><NavLink onClick={() => setMenuOpen(false)} to="/" end className={navClass}>Home</NavLink><NavLink onClick={() => setMenuOpen(false)} to="/about" className={navClass}>About</NavLink><NavLink onClick={() => setMenuOpen(false)} to="/doctors" className={navClass}>Find a doctor</NavLink><NavLink onClick={() => setMenuOpen(false)} to="/contact" className={navClass}>Contact</NavLink>{!token && <button onClick={() => { setMenuOpen(false); navigate('/login') }} className="mt-2 rounded-full bg-[#267b66] px-5 py-3 text-sm font-bold text-white">Create account</button>}</div></div>}
    </nav>
  )
}

export default Navbar



