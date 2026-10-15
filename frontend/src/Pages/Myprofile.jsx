import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileField = ({ label, children }) => (
  <div className="min-w-0 rounded-2xl border border-[#e9efeb] bg-[#fbfdfc] p-4 sm:p-5">
    <p className="mb-2 text-xs font-bold uppercase tracking-[.12em] text-[#8a9c94]">{label}</p>
    {children}
  </div>
);

const formatDateForInput = (value) => {
  if (!value || value === "Not selected") return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const Myprofile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateField = (field, value) => setUserData((prev) => ({ ...prev, [field]: value }));
  const updateAddress = (field, value) => setUserData((prev) => ({
    ...prev,
    address: { ...(prev.address || {}), [field]: value },
  }));

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name || "");
      formData.append("phone", userData.phone || "");
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");
      if (image) formData.append("image", image);

      const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelEdit = async () => {
    await loadUserProfileData();
    setImage(false);
    setIsEdit(false);
  };

  const inputClass = "w-full border bg-white px-3.5 py-3 text-sm text-[#243f35] placeholder:text-[#a0afa8]";
  const valueClass = "min-h-5 break-words text-sm font-semibold text-[#29483d]";
  const hasGender = userData?.gender && userData.gender !== "Not selected";
  const birthDate = formatDateForInput(userData?.dob);

  return userData && (
    <main className="min-h-[70vh] bg-[#f5f8f6] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#38866d]">Your account</p>
            <h1 className="mt-2 text-3xl font-extrabold text-[#173d35] sm:text-4xl">My profile</h1>
            <p className="mt-2 text-sm text-[#71847e]">Keep your details current for a smoother care experience.</p>
          </div>
          {!isEdit && <button type="button" onClick={() => setIsEdit(true)} className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#267b66] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#267b66]/15 transition hover:-translate-y-0.5 hover:bg-[#1e6c59] sm:self-auto"><span aria-hidden="true">✎</span> Edit profile</button>}
        </div>

        <section className="overflow-hidden rounded-[1.75rem] border border-[#e5eee8] bg-white shadow-[0_16px_50px_rgba(31,77,57,0.07)]">
          <div className="relative h-28 overflow-hidden bg-[#e9f5ef] sm:h-36"><div className="absolute -right-12 -top-32 h-72 w-72 rounded-full bg-[#d8eee2]"/><div className="absolute right-1/3 top-14 h-24 w-24 rounded-full bg-white/35"/></div>
          <div className="px-5 pb-7 sm:px-9 sm:pb-9">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4 sm:gap-5">
                <div className="relative shrink-0">
                  <img src={image ? URL.createObjectURL(image) : userData.image} alt={`${userData.name || "User"} profile`} className="h-24 w-24 rounded-3xl border-4 border-white bg-[#eaf4ef] object-cover shadow-md sm:h-28 sm:w-28"/>
                  {isEdit && <label htmlFor="profile-image" className="absolute -bottom-1 -right-1 grid h-9 w-9 cursor-pointer place-items-center rounded-full border-2 border-white bg-[#267b66] text-lg text-white shadow-md" title="Change profile photo"><span aria-hidden="true">＋</span><input id="profile-image" type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || false)}/></label>}
                </div>
                <div className="min-w-0 pb-1">
                  {isEdit ? <input aria-label="Full name" value={userData.name || ""} onChange={(e) => updateField("name", e.target.value)} className={`${inputClass} max-w-sm text-lg font-bold`} placeholder="Your full name"/> : <h2 className="truncate text-xl font-extrabold text-[#173d35] sm:text-2xl">{userData.name}</h2>}
                  <p className="mt-1 truncate text-sm text-[#71847e]">{userData.email}</p>
                </div>
              </div>
              {isEdit && <div className="flex gap-2 sm:pb-1"><button type="button" onClick={cancelEdit} className="rounded-full border border-[#dce8e1] px-4 py-2.5 text-sm font-semibold text-[#587067] transition hover:bg-[#f5f8f6]">Cancel</button><button type="button" onClick={updateUserProfileData} className="rounded-full bg-[#267b66] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1e6c59]">Save changes</button></div>}
            </div>

            <div className="mt-8 border-t border-[#edf2ee] pt-7">
              <div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold text-[#24483b]">Contact information</h3><p className="mt-1 text-xs text-[#8a9c94]">Details used to keep in touch about your visits.</p></div><span className="rounded-full bg-[#edf6f1] px-3 py-1.5 text-xs font-semibold text-[#48836c]">Personal details</span></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <ProfileField label="Email address"><p className={valueClass}>{userData.email || "Not added"}</p><p className="mt-1 text-xs text-[#95a49e]">Email address can’t be changed here.</p></ProfileField>
                <ProfileField label="Phone number">{isEdit ? <input aria-label="Phone number" value={userData.phone || ""} onChange={(e) => updateField("phone", e.target.value)} className={inputClass} placeholder="Add your phone number"/> : <p className={valueClass}>{userData.phone || "Not added"}</p>}</ProfileField>
                <ProfileField label="Address"><div className="space-y-2">{isEdit ? <><input aria-label="Address line 1" value={userData.address?.line1 || ""} onChange={(e) => updateAddress("line1", e.target.value)} className={inputClass} placeholder="Address line 1"/><input aria-label="Address line 2" value={userData.address?.line2 || ""} onChange={(e) => updateAddress("line2", e.target.value)} className={inputClass} placeholder="Address line 2 (optional)"/></> : <p className={`${valueClass} leading-6`}>{userData.address?.line1 || "Not added"}{userData.address?.line2 && <><br/>{userData.address.line2}</>}</p>}</div></ProfileField>
                <ProfileField label="Gender">{isEdit ? <select aria-label="Gender" value={hasGender ? userData.gender : ""} onChange={(e) => updateField("gender", e.target.value)} className={inputClass}><option value="">Select gender</option><option value="male">Male</option><option value="female">Female</option></select> : <p className={`${valueClass} capitalize`}>{hasGender ? userData.gender : "Not added"}</p>}</ProfileField>
                <ProfileField label="Date of birth">{isEdit ? <input aria-label="Date of birth" type="date" value={birthDate} onChange={(e) => updateField("dob", e.target.value)} className={inputClass}/> : <p className={valueClass}>{birthDate ? new Date(userData.dob).toLocaleDateString() : "Not added"}</p>}</ProfileField>
              </div>
            </div>
          </div>
        </section>
        <p className="mt-4 text-center text-xs text-[#91a098]">Your profile details are handled securely.</p>
      </div>
    </main>
  );
};

export default Myprofile;