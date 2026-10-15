import React, { useContext, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiArrowLeft, FiShield } from 'react-icons/fi'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(amount) || 0)

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const navigate = useNavigate()
  const docInfo = doctors.find((doctor) => doctor._id === docId)

  const docSlots = useMemo(() => {
    if (!docInfo) return []
    const today = new Date()
    return Array.from({ length: 7 }, (_, offset) => {
      const date = new Date(today)
      date.setDate(today.getDate() + offset)
      const endTime = new Date(date)
      endTime.setHours(21, 0, 0, 0)
      const current = new Date(date)

      if (offset === 0) {
        current.setHours(current.getHours() > 10 ? current.getHours() + 1 : 10)
        current.setMinutes(current.getMinutes() > 30 ? 30 : 0, 0, 0)
      } else {
        current.setHours(10, 0, 0, 0)
      }

      const times = []
      while (current < endTime) {
        const time = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`
        if (!docInfo.slots_booked?.[slotDate]?.includes(time)) {
          times.push({ time, datetime: new Date(current) })
        }
        current.setMinutes(current.getMinutes() + 30)
      }
      return { date, times }
    })
  }, [docInfo])

  const activeDay = docSlots[slotIndex]
  const selectedDate = activeDay?.date
  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Log in to book an appointment')
      return navigate('/login')
    }
    if (!selectedDate || !slotTime) {
      toast.warn('Choose a date and time first')
      return
    }

    const slotDate = `${selectedDate.getDate()}_${selectedDate.getMonth() + 1}_${selectedDate.getFullYear()}`
    setIsBooking(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await getDoctorsData()
        navigate('/myappointment')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsBooking(false)
    }
  }

  if (!docInfo) return <div className="mx-auto my-20 max-w-xl rounded-3xl border border-[#e5eee8] bg-white p-10 text-center"><p className="font-bold text-[#24453a]">Doctor not found</p><button onClick={() => navigate('/doctors')} className="mt-4 text-sm font-bold text-[#267b66]">Browse doctors</button></div>

  return <main className="min-h-[70vh] bg-[#f4f8f5] px-4 py-8 sm:px-6 sm:py-12">
    <div className="mx-auto max-w-6xl">
      <button onClick={() => navigate(-1)} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#6d8278] transition hover:text-[#267b66]"><FiArrowLeft /> Back to doctors</button>

      <section className="overflow-hidden rounded-[28px] border border-[#e3ece6] bg-white shadow-[0_18px_55px_rgba(26,66,49,0.08)]">
        <div className="grid lg:grid-cols-[1fr_310px]">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-9">
            <img src={docInfo.image} alt={docInfo.name} className="h-36 w-36 shrink-0 rounded-3xl bg-[#edf5f0] object-cover object-top shadow-sm sm:h-44 sm:w-44" />
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf5ee] px-3 py-1.5 text-xs font-bold text-[#32815f]"><FiCheckCircle />Verified doctor</span>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#193e34] sm:text-3xl">{docInfo.name}</h1>
              <p className="mt-1 font-semibold text-[#43846a]">{docInfo.speciality}</p>
              <p className="mt-2 text-sm text-[#82948b]">{docInfo.degree} <span className="px-1 text-[#b1c0b8]">·</span> {docInfo.experience}</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#71847a]">{docInfo.about}</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-[#6f8278]"><FiMapPin className="shrink-0 text-[#43846a]" />{docInfo.address?.line1}{docInfo.address?.line2 ? `, ${docInfo.address.line2}` : ''}</p>
            </div>
          </div>
          <aside className="flex flex-row items-center justify-between gap-4 border-t border-[#eaf0ec] bg-gradient-to-br from-[#f2f8f4] to-[#e9f3ec] p-6 lg:flex-col lg:items-start lg:justify-center lg:border-l lg:border-t-0 lg:px-8">
            <div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#789087]">Consultation fee</p><p className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e4a3d]">{formatINR(docInfo.fees)}</p><p className="mt-1 text-xs text-[#82958c]">Pay securely after booking</p></div>
            <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-xs font-semibold text-[#52816a]"><FiShield /> Secure appointment</div>
          </aside>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[26px] border border-[#e3ece6] bg-white p-5 shadow-[0_12px_35px_rgba(26,66,49,0.05)] sm:p-7">
          <div className="mb-6 flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5ee] text-[#398263]"><FiCalendar /></span><div><h2 className="font-extrabold text-[#254439]">Choose a date</h2><p className="mt-1 text-sm text-[#82948b]">Select a day that works for you.</p></div></div>
          <div className="flex gap-2 overflow-x-auto pb-2">{docSlots.map((day, index) => {
            const active = slotIndex === index
            const date = day.date
            return <button type="button" key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`} onClick={() => { setSlotIndex(index); setSlotTime('') }} className={`flex min-w-[70px] flex-col items-center rounded-2xl border px-3 py-3 transition ${active ? 'border-[#267b66] bg-[#267b66] text-white shadow-md shadow-[#267b66]/20' : 'border-[#e6eee9] bg-white text-[#63786e] hover:border-[#9ac5ae] hover:bg-[#f7fbf8]'}`}><span className={`text-[11px] font-bold uppercase ${active ? 'text-[#c1e5d0]' : 'text-[#91a198]'}`}>{DAYS[date.getDay()]}</span><span className="mt-1 text-2xl font-extrabold">{date.getDate()}</span><span className={`mt-0.5 text-[11px] font-medium ${active ? 'text-[#c1e5d0]' : 'text-[#91a198]'}`}>{MONTHS[date.getMonth()]}</span></button>
          })}</div>

          <div className="my-7 border-t border-[#edf2ee]" />
          <div className="mb-5 flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef0fb] text-[#6876b2]"><FiClock /></span><div><h2 className="font-extrabold text-[#254439]">Available times</h2><p className="mt-1 text-sm text-[#82948b]">All times are shown in your local timezone.</p></div></div>
          {activeDay?.times.length ? <div className="flex flex-wrap gap-2">{activeDay.times.map(({ time }) => <button type="button" key={time} onClick={() => setSlotTime(time)} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${slotTime === time ? 'border-[#267b66] bg-[#267b66] text-white shadow-sm' : 'border-[#e2eae5] bg-white text-[#667b70] hover:border-[#83b39a] hover:bg-[#f4faf6]'}`}>{time}</button>)}</div> : <div className="rounded-2xl bg-[#f7faf8] px-4 py-8 text-center"><p className="text-sm font-semibold text-[#60766b]">No times available on this date</p><p className="mt-1 text-xs text-[#8c9d94]">Choose another day to see open slots.</p></div>}
        </div>

        <aside className="h-fit rounded-[26px] border border-[#e3ece6] bg-white p-5 shadow-[0_12px_35px_rgba(26,66,49,0.05)] sm:p-6 lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#789087]">Booking summary</p>
          <div className="mt-4 flex items-center gap-3"><img src={docInfo.image} alt="" className="h-12 w-12 rounded-xl bg-[#edf5f0] object-cover object-top" /><div className="min-w-0"><p className="truncate text-sm font-bold text-[#29463b]">{docInfo.name}</p><p className="truncate text-xs text-[#82948b]">{docInfo.speciality}</p></div></div>
          <div className="my-5 border-t border-dashed border-[#e2eae5]" />
          <div className="space-y-3 text-sm"><div className="flex justify-between gap-3"><span className="text-[#84958d]">Date</span><span className="text-right font-semibold text-[#40594f]">{selectedDate ? `${DAYS[selectedDate.getDay()]}, ${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]}` : 'Select a date'}</span></div><div className="flex justify-between gap-3"><span className="text-[#84958d]">Time</span><span className="font-semibold text-[#40594f]">{slotTime || 'Select a time'}</span></div></div>
          <div className="my-5 border-t border-dashed border-[#e2eae5]" />
          <div className="flex items-center justify-between"><span className="text-sm font-semibold text-[#6f8278]">Total</span><span className="text-xl font-extrabold text-[#1e4a3d]">{formatINR(docInfo.fees)}</span></div>
          <button onClick={bookAppointment} disabled={!slotTime || isBooking} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#267b66] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[#267b66]/15 transition hover:bg-[#1d6856] disabled:cursor-not-allowed disabled:bg-[#dfe8e2] disabled:text-[#98a79f] disabled:shadow-none">{isBooking ? 'Booking…' : <><FiCalendar />Confirm appointment</>}</button>
          <p className="mt-3 text-center text-[11px] leading-5 text-[#91a198]">You can review your booking and complete payment from My appointments.</p>
        </aside>
      </section>

      <div className="mt-12"><RelatedDoctors docId={docId} speciality={docInfo.speciality} /></div>
    </div>
  </main>
}

export default Appointment
