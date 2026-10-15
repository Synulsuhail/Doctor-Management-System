import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiMapPin, FiEdit2, FiSave, FiX, FiBriefcase, FiDollarSign, FiCheckCircle } from 'react-icons/fi'
import { DoctorContext } from '../../context/DoctorContext'

const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(amount) || 0)

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const [isEdit, setIsEdit] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (dToken) getProfileData()
  }, [dToken])

  const updateProfile = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    try {
      const updateData = {
        address: profileData.address,
        fees: Number(profileData.fees),
        available: profileData.available,
      }
      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const updateAddress = (field, value) => setProfileData((current) => ({
    ...current,
    address: { ...current.address, [field]: value },
  }))

  if (!profileData) return <div className="rounded-3xl border border-[#e5eee8] bg-white p-10 text-center text-sm text-[#73877d]">Loading your profile…</div>

  return <section className="mx-auto max-w-5xl pb-10">
    <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div><p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-[#42896e]">Account</p><h1 className="text-3xl font-extrabold text-[#173d35]">My profile</h1><p className="mt-2 text-sm text-[#758980]">Manage your professional details and appointment settings.</p></div>
      {!isEdit && <button onClick={() => setIsEdit(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#267b66] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1d6856]"><FiEdit2 /> Edit profile</button>}
    </header>

    <div className="overflow-hidden rounded-3xl border border-[#e4ede7] bg-white shadow-[0_14px_44px_rgba(32,70,52,0.07)]">
      <div className="h-32 bg-gradient-to-r from-[#17483d] via-[#267b66] to-[#70ad8c]" />
      <div className="px-5 pb-7 sm:px-8">
        <div className="-mt-14 mb-6 flex flex-wrap items-end gap-5">
          <img src={profileData.image} alt={profileData.name || 'Doctor'} className="h-28 w-28 rounded-3xl border-4 border-white bg-[#edf5f0] object-cover shadow-md" />
          <div className="min-w-0 flex-1 pb-1"><h2 className="truncate text-2xl font-extrabold text-[#1c4036]">{profileData.name}</h2><p className="mt-1 text-sm text-[#73877d]">{profileData.degree} <span className="px-1 text-[#adc0b5]">·</span> {profileData.speciality}</p></div>
          <span className={`mb-1 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${profileData.available ? 'bg-[#eaf5ee] text-[#32815f]' : 'bg-[#f1f3f2] text-[#76877f]'}`}><span className={`h-2 w-2 rounded-full ${profileData.available ? 'bg-[#42a875]' : 'bg-[#97a39d]'}`} />{profileData.available ? 'Available for appointments' : 'Currently unavailable'}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#edf2ee] bg-[#fbfdfb] p-4"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9f4ee] text-[#398263]"><FiBriefcase /></div><p className="text-xs font-semibold text-[#81938a]">Experience</p><p className="mt-1 font-bold text-[#27443a]">{profileData.experience}</p></div>
          <div className="rounded-2xl border border-[#edf2ee] bg-[#fbfdfb] p-4"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf0fb] text-[#6675b2]"><FiDollarSign /></div><p className="text-xs font-semibold text-[#81938a]">Appointment fee</p>{isEdit ? <input type="number" min="0" value={profileData.fees ?? ''} onChange={(e) => setProfileData((current) => ({ ...current, fees: e.target.value }))} className="mt-1 w-full rounded-lg border border-[#dce8df] px-3 py-2 font-bold text-[#27443a]" /> : <p className="mt-1 font-bold text-[#27443a]">{formatINR(profileData.fees)} <span className="text-xs font-medium text-[#899a91]">/ visit</span></p>}</div>
          <div className="rounded-2xl border border-[#edf2ee] bg-[#fbfdfb] p-4"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff3e6] text-[#c58d45]"><FiMapPin /></div><p className="text-xs font-semibold text-[#81938a]">Clinic address</p>{isEdit ? <div className="mt-1 space-y-2"><input aria-label="Address line 1" value={profileData.address?.line1 || ''} onChange={(e) => updateAddress('line1', e.target.value)} className="w-full rounded-lg border border-[#dce8df] px-3 py-2 text-sm" placeholder="Address line 1" /><input aria-label="Address line 2" value={profileData.address?.line2 || ''} onChange={(e) => updateAddress('line2', e.target.value)} className="w-full rounded-lg border border-[#dce8df] px-3 py-2 text-sm" placeholder="Address line 2" /></div> : <p className="mt-1 text-sm font-bold leading-5 text-[#27443a]">{profileData.address?.line1}<br />{profileData.address?.line2}</p>}</div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#edf2ee] p-5"><h3 className="font-bold text-[#254439]">About</h3><p className="mt-2 text-sm leading-6 text-[#71847a]">{profileData.about || 'Add a short introduction about your practice.'}</p></div>

        {isEdit && <form onSubmit={updateProfile} className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#f7faf8] p-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#476258]"><input type="checkbox" checked={Boolean(profileData.available)} onChange={() => setProfileData((current) => ({ ...current, available: !current.available }))} className="h-4 w-4 accent-[#267b66]" /><FiCheckCircle className="text-[#398263]" />Accept new appointments</label>
          <div className="flex gap-2"><button type="button" onClick={() => { setIsEdit(false); getProfileData() }} className="inline-flex items-center gap-2 rounded-xl border border-[#dce8df] bg-white px-4 py-2.5 text-sm font-bold text-[#62786d]"><FiX /> Cancel</button><button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 rounded-xl bg-[#267b66] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1d6856] disabled:cursor-wait disabled:opacity-60"><FiSave />{isSaving ? 'Saving…' : 'Save changes'}</button></div>
        </form>}
      </div>
    </div>
  </section>
}

export default DoctorProfile
