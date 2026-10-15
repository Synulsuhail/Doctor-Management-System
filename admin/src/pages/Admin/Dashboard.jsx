import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { FaUserMd, FaCalendarCheck, FaUserInjured } from 'react-icons/fa'
import { FiArrowUpRight, FiCalendar } from 'react-icons/fi'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => { if (aToken) getDashData() }, [aToken])

  const stats = [
    { label: 'Total doctors', value: dashData?.doctors || 0, icon: <FaUserMd />, tone: 'bg-[#e9f5ee] text-[#32815f]' },
    { label: 'Appointments', value: dashData?.appointments || 0, icon: <FaCalendarCheck />, tone: 'bg-[#eef1fb] text-[#6873b4]' },
    { label: 'Registered patients', value: dashData?.users || 0, icon: <FaUserInjured />, tone: 'bg-[#fff4e6] text-[#c78a37]' },
  ]

  if (!dashData) return <div className="py-20 text-center text-sm font-medium text-[#82958c]">Loading your dashboard…</div>

  return <section>
    <div className="admin-page-heading">
      <div><div className="mb-2 text-xs font-bold uppercase tracking-[.15em] text-[#529277]">Overview</div><h1>Good to see you, Admin</h1><p>Here’s what’s happening across your practice today.</p></div>
      <div className="flex items-center gap-2 rounded-xl border border-[#e5eee8] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#637a70]"><FiCalendar className="text-[#529277]" /> Admin dashboard</div>
    </div>

    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => <article key={item.label} className="admin-stat-card flex items-center gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[23px] ${item.tone}`}>{item.icon}</div>
        <div><p className="admin-stat-label">{item.label}</p><p className="admin-stat-value">{item.value}</p></div>
        <FiArrowUpRight className="ml-auto self-start text-lg text-[#a5b6ad]" />
      </article>)}
    </div>

    <section className="admin-panel">
      <div className="admin-panel-header"><div><h2>Latest appointments</h2><p className="mt-1 text-xs text-[#8a9b93]">Recent bookings across your clinic</p></div><span className="rounded-full bg-[#edf6f1] px-3 py-1.5 text-xs font-bold text-[#347a62]">{dashData?.latestAppointments?.length || 0} recent</span></div>
      <div>
        {dashData?.latestAppointments?.length ? dashData.latestAppointments.map((item, index) => {
          const status = item.cancelled ? 'cancelled' : item.iscompleted ? 'completed' : 'upcoming'
          return <div key={item._id || index} className="admin-appointment-row">
            <div className="flex min-w-0 items-center gap-3.5">
              <img src={item.userData?.image} alt="" className="h-11 w-11 shrink-0 rounded-full bg-[#edf3ef] object-cover" />
              <div className="min-w-0"><p className="truncate text-sm font-bold text-[#264238]">{item.userData?.name || 'Patient'}</p><p className="mt-1 truncate text-xs text-[#84978e]">with {item.doctorData?.name || 'Doctor'} <span className="px-1">·</span> {slotDateFormat(item.slotDate)}</p></div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className={`admin-status admin-status-${status}`}>{status[0].toUpperCase() + status.slice(1)}</span>
              {!item.cancelled && !item.iscompleted && <button onClick={() => cancelAppointment(item._id)} className="admin-action">Cancel</button>}
            </div>
          </div>
        }) : <div className="px-6 py-14 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f6f3] text-xl text-[#6e9a83]"><FiCalendar /></div><p className="text-sm font-bold text-[#40594f]">No appointments yet</p><p className="mt-1 text-xs text-[#8a9b93]">New bookings will appear here.</p></div>}
      </div>
    </section>
  </section>
}
export default Dashboard
