import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { FiCalendar, FiClock, FiCheck, FiX, FiCreditCard } from 'react-icons/fi'

const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(amount) || 0)

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getAppointments()
  }, [dToken])

  const rows = [...appointments].reverse()

  return <section className="mx-auto max-w-7xl pb-10">
    <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div><p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-[#42896e]">Schedule</p><h1 className="text-3xl font-extrabold text-[#173d35]">Appointments</h1><p className="mt-2 text-sm text-[#758980]">Review patient bookings and update their status.</p></div>
      <div className="flex items-center gap-2 rounded-xl border border-[#e4ede7] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#60766b]"><FiCalendar className="text-[#42896e]" />{appointments.length} total</div>
    </header>

    <div className="overflow-hidden rounded-3xl border border-[#e4ede7] bg-white shadow-[0_14px_44px_rgba(32,70,52,0.06)]">
      {rows.length ? <>
        <div className="hidden grid-cols-[minmax(190px,1.2fr)_100px_165px_115px_130px] gap-4 border-b border-[#edf2ee] bg-[#f8fbf9] px-6 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-[#84958d] md:grid"><span>Patient</span><span>Age</span><span>Date & time</span><span>Payment</span><span className="text-right">Fee / action</span></div>
        <div className="divide-y divide-[#edf2ee]">{rows.map((item, index) => {
          const cancelled = item.cancelled
          const completed = item.iscompleted
          return <article key={item._id} className="grid gap-4 px-5 py-5 transition hover:bg-[#fbfdfb] md:grid-cols-[minmax(190px,1.2fr)_100px_165px_115px_130px] md:items-center md:gap-4 md:px-6">
            <div className="flex min-w-0 items-center gap-3"><img src={item.userData?.image || '/default_user.png'} alt="" className="h-12 w-12 shrink-0 rounded-2xl bg-[#edf4ef] object-cover" /><div className="min-w-0"><p className="truncate font-bold text-[#28453a]">{item.userData?.name || 'Patient'}</p><p className="mt-1 text-xs text-[#8a9b92]">Patient #{rows.length - index}</p></div></div>
            <div className="flex items-center justify-between text-sm md:block"><span className="text-xs font-semibold text-[#91a098] md:hidden">Age</span><span className="font-semibold text-[#526a5f]">{calculateAge(item.userData?.dob)}</span></div>
            <div className="flex items-center gap-2 text-sm text-[#60766b]"><FiClock className="shrink-0 text-[#78a18b]" /><span>{slotDateFormat(item.slotDate)} <span className="text-[#a0aea7]">·</span> {item.slotTime}</span></div>
            <div className="flex items-center justify-between md:block"><span className="text-xs font-semibold text-[#91a098] md:hidden">Payment</span><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${item.payment ? 'bg-[#eaf5ee] text-[#32815f]' : 'bg-[#fff4e6] text-[#b77b2e]'}`}><FiCreditCard />{item.payment ? 'Paid' : 'Pending'}</span></div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#f0f4f1] pt-3 md:justify-end md:border-0 md:pt-0"><span className="font-bold text-[#264439]">{formatINR(item.amount)}</span>{cancelled ? <span className="rounded-full bg-[#fff0ef] px-2.5 py-1 text-xs font-bold text-[#bd5148]">Cancelled</span> : completed ? <span className="rounded-full bg-[#eaf5ee] px-2.5 py-1 text-xs font-bold text-[#32815f]">Completed</span> : <div className="flex gap-2"><button onClick={() => completeAppointment(item._id)} aria-label={`Complete appointment for ${item.userData?.name || 'patient'}`} className="inline-flex items-center gap-1 rounded-lg bg-[#eaf5ee] px-2.5 py-2 text-xs font-bold text-[#32815f] transition hover:bg-[#d9efdf]"><FiCheck />Complete</button><button onClick={() => cancelAppointment(item._id)} aria-label={`Cancel appointment for ${item.userData?.name || 'patient'}`} className="inline-flex items-center gap-1 rounded-lg bg-[#fff0ef] px-2.5 py-2 text-xs font-bold text-[#b64840] transition hover:bg-[#ffe2df]"><FiX />Cancel</button></div>}</div>
          </article>
        })}</div>
      </> : <div className="px-6 py-16 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf5f0] text-2xl text-[#43876c]"><FiCalendar /></div><h2 className="font-bold text-[#29463b]">No appointments yet</h2><p className="mt-1 text-sm text-[#82948b]">New patient bookings will appear here.</p></div>}
    </div>
  </section>
}

export default DoctorAppointments
