import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const specialties = ['All specialties', 'General Doctor', 'Gynecologist', 'Dentist', 'Cardiologist', 'Neurologist']
const Alldoctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [filterDoc, setFilterDoc] = useState([])
  const [filter, setFilter] = useState(false)
  useEffect(() => setFilterDoc(speciality ? doctors.filter(doc => doc.speciality?.toLowerCase().trim() === speciality.toLowerCase().trim()) : doctors), [speciality, doctors])
  return <main className="mx-auto min-h-[65vh] max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
    <div className="mb-9"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#3c9074]">Personalized care</p><h1 className="mt-2 text-3xl font-extrabold text-[#183d35] sm:text-4xl">Find your doctor</h1><p className="mt-2 text-[#71847e]">Browse trusted specialists and choose the care that feels right.</p></div>
    <div className="grid items-start gap-7 sm:grid-cols-[220px_1fr]">
      <button className="rounded-xl border border-[#dce9e1] bg-white px-4 py-3 text-left font-semibold text-[#31584b] sm:hidden" onClick={() => setFilter(!filter)}>Browse specialties <span className="float-right">{filter ? '−' : '+'}</span></button>
      <aside className={`${filter ? 'flex' : 'hidden'} flex-col overflow-hidden rounded-2xl border border-[#e5eee8] bg-white p-2 shadow-sm sm:flex`}><p className="px-3 pb-2 pt-3 text-xs font-bold uppercase tracking-wider text-[#91a29b]">Specialty</p>{specialties.map((label, i) => { const active = i === 0 ? !speciality : speciality === label; return <button key={label} onClick={() => navigate(i ? `/doctors/${label}` : '/doctors')} className={`rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${active ? 'bg-[#eaf4ef] text-[#267b66]' : 'text-[#637970] hover:bg-[#f6f9f7]'}`}>{label}</button> })}</aside>
      <section><div className="mb-4 flex items-center justify-between"><p className="text-sm text-[#74877f]">{filterDoc.length} {filterDoc.length === 1 ? 'doctor' : 'doctors'} available</p></div>{filterDoc.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{filterDoc.map(doctor => <button key={doctor._id} onClick={() => navigate(`/appointment/${doctor._id}`)} className="group overflow-hidden rounded-2xl border border-[#e7eee9] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#254838]/10"><div className="relative h-56 overflow-hidden bg-[#eef5f0]"><img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"/><span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#368067]">● {doctor.available === false ? 'Availability varies' : 'Available for booking'}</span></div><div className="p-5"><p className="text-lg font-bold text-[#1d4037]">{doctor.name}</p><p className="mt-1 text-sm text-[#6e8179]">{doctor.speciality}</p><div className="mt-4 flex items-center justify-between border-t border-[#edf2ee] pt-4 text-sm"><span className="text-[#8b9b94]">{doctor.experience || 'Experienced'} {typeof doctor.experience === 'number' ? 'years experience' : ''}</span><span className="font-bold text-[#267b66]">View profile →</span></div></div></button>)}</div> : <div className="rounded-2xl border border-dashed border-[#cfded5] bg-white px-6 py-16 text-center"><p className="text-lg font-semibold text-[#31584b]">No doctors found</p><p className="mt-2 text-sm text-[#71847e]">Try choosing another specialty.</p></div>}</section>
    </div>
  </main>
}
export default Alldoctors

