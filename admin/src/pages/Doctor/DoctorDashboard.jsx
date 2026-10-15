import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { FiCalendar, FiUsers, FiClock, FiCheck, FiX, FiDollarSign, FiArrowUpRight } from 'react-icons/fi'

const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(amount) || 0)

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getDashData()
  }, [dToken])

  if (!dashData) return <div className="py-20 text-center text-sm font-medium text-[#82958c]">Loading your dashboard…</div>

  const stats = [
    { label: 'Earnings', value: formatINR(dashData.earnings), icon: FiDollarSign, tone: 'bg-[#e9f5ee] text-[#32815f]' },
    { label: 'Appointments', value: dashData.appointments || 0, icon: FiCalendar, tone: 'bg-[#edf0fb] text-[#6976b2]' },
    { label: 'Patients', value: dashData.patients || 0, icon: FiUsers, tone: 'bg-[#fff3e6] text-[#bd853e]' },
  ]

  return <section className="mx-auto max-w-7xl pb-10">
    <header className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-[#42896e]">Your practice</p><h1 className="text-3xl font-extrabold text-[#173d35]">Doctor dashboard</h1><p className="mt-2 text-sm text-[#758980]">A quick look at your appointments and practice activity.</p></div><span className="inline-flex items-center gap-2 rounded-xl border border-[#e4ede7] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#60766b]"><FiClock className="text-[#42896e]" />Today</span></header>

    <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{stats.map(({ label, value, icon: Icon, tone }) => <article key={label} className="flex items-center gap-4 rounded-2xl border border-[#e4ede7] bg-white p-5 shadow-[0_8px_24px_rgba(32,70,52,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(32,70,52,0.08)]"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${tone}`}><Icon /></div><div><p className="text-sm font-semibold text-[#7b8d84]">{label}</p><p className="mt-1 text-2xl font-extrabold tracking-tight text-[#1e4035]">{value}</p></div><FiArrowUpRight className="ml-auto self-start text-lg text-[#a5b6ad]" /></article>)}</div>

    <section className="overflow-hidden rounded-3xl border border-[#e4ede7] bg-white shadow-[0_14px_44px_rgba(32,70,52,0.06)]"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf2ee] px-5 py-5 sm:px-6"><div><h2 className="font-bold text-[#254439]">Recent appointments</h2><p className="mt-1 text-xs text-[#87988f]">Your latest patient bookings</p></div><span className="rounded-full bg-[#edf6f1] px-3 py-1.5 text-xs font-bold text-[#347a62]">{dashData.latestAppointments?.length || 0} recent</span></div>
      {dashData.latestAppointments?.length ? <div className="divide-y divide-[#edf2ee]">{dashData.latestAppointments.map((item) => <article key={item._id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 transition hover:bg-[#fbfdfb] sm:px-6"><div className="flex min-w-0 items-center gap-3"><img src={item.userData?.image || '/default_user.png'} alt="" className="h-11 w-11 shrink-0 rounded-2xl bg-[#edf4ef] object-cover" /><div className="min-w-0"><p className="truncate text-sm font-bold text-[#28453a]">{item.userData?.name || 'Patient'}</p><p className="mt-1 truncate text-xs text-[#87988f]">{slotDateFormat(item.slotDate)} <span className="px-1">·</span> {item.slotTime}</p></div></div><div className="flex items-center gap-2">{item.cancelled ? <span className="rounded-full bg-[#fff0ef] px-3 py-1.5 text-xs font-bold text-[#bd5148]">Cancelled</span> : item.iscompleted ? <span className="rounded-full bg-[#eaf5ee] px-3 py-1.5 text-xs font-bold text-[#32815f]">Completed</span> : <><button onClick={() => completeAppointment(item._id)} className="inline-flex items-center gap-1 rounded-lg bg-[#eaf5ee] px-2.5 py-2 text-xs font-bold text-[#32815f] hover:bg-[#d9efdf]"><FiCheck />Complete</button><button onClick={() => cancelAppointment(item._id)} className="inline-flex items-center gap-1 rounded-lg bg-[#fff0ef] px-2.5 py-2 text-xs font-bold text-[#b64840] hover:bg-[#ffe2df]"><FiX />Cancel</button></>}</div></article>)}</div> : <div className="px-6 py-16 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf5f0] text-2xl text-[#43876c]"><FiCalendar /></div><h3 className="font-bold text-[#29463b]">You’re all caught up</h3><p className="mt-1 text-sm text-[#82948b]">Upcoming bookings will appear here.</p></div>}
    </section>
  </section>
}

export default DoctorDashboard
