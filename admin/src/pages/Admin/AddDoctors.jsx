import React, { useContext, useState } from 'react'

import { assets } from '../../assets/assets'
import  {AdminContext} from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'


const AddDoctors = () => {

  const [docImg,setDocImg]=useState(false)
  const [name,setName]=useState('')
   const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
     const [experience,setExperience]=useState('1 year')
      const [fees,setFees]=useState('')
       const [about,setAbout]=useState('')
       const [speciality,setSpeciality]=useState('General Doctor')
       const [degree,setDegree]=useState('')
       const [address1,setAddress1]=useState('')
       const [address2,setAddress2]=useState('')

       const {backendUrl, aToken}=useContext(AdminContext)



       const onSubmitHandler= async (event) => {
        event.preventDefault()
      
        try{
          if (!docImg){
            return toast.error('Image Not selected')
 }

 const formData= new FormData()
  
  formData.append('image',docImg)
  formData.append('name',name)
  formData.append('email',email)
  formData.append('password',password)
  formData.append('experience',experience)
  formData.append('fees',Number(fees))
  formData.append('about',about)
  formData.append('speciality',speciality)
  formData.append('degree',degree) 
  formData.append('address',JSON.stringify({line1:address1,line2:address2}))

 formData.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
    const {data}=await axios.post(backendUrl +'/api/admin/add-doctor',formData,{headers:{aToken}})

    if(data.success){
      toast.success(data.message)
      setDocImg(false)
      setName('')
      setPassword('')
      setAddress1('')
      setAddress2('')
     setAbout('')
     setEmail('')
     setDegree('')
     setFees('')
    }else{
      toast.error(data.message)
    }


        }catch (error){
          toast.error(error.message)
          console.log(error)

        }



       }
       
  return (
   <form onSubmit={onSubmitHandler} className='m-5 w-full'>
   
    <p className=' text-xl font-semibold mb-4'>Add Doctor</p>
    <div className='bg-white px-8 py-8 border rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
      
      <div className='flex items-center gap-4 mb-8 text-gray-500'>
        <label htmlFor="doc-img">
          <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}  />

        </label>
        <input onChange={(e)=>setDocImg(e.target.files[0])}   type='file' id="doc-img" hidden/>
        <p>Upload doctor <br/>picture</p>
      </div>
      <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
        <div className='w-full lg:flex-1 flex flex-col gap-4'>
          <div className='flex-1 flex flex-col gap-1'>
          <p className="text-sm font-medium">Doctor name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required/>
          </div>

           <div className='flex-1 flex flex-col gap-1'>
          <p className="text-sm font-medium">Doctor Email</p>
          <input  onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="text" placeholder='Name' required/>
          </div>

               <div className='flex-1 flex flex-col gap-1'>
          <p className="text-sm font-medium">Doctor Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="text" placeholder='Name' required/>
          </div>

           <div className='flex-1 flex flex-col gap-1'>
          <p className="text-sm font-medium">Experience</p>
         <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
          <option value="1 year">1 year </option>
          <option value="2 year">2 year </option>
          <option value="3 year">3 year </option>
          <option value="4 year">4 year </option>
          <option value="5 year">5 year </option>
          <option value="6 year">6 year </option>
          <option value="7 year">7 year </option>
         </select>
          </div>

           <div className='flex-1 flex flex-col gap-1'>
          <p className="text-sm font-medium">Fees</p>
          <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='fees' required/>
          </div>
        </div>

      <div className='w-full lg:flex-1 flex flex-col gap-4'>
        <div className='flex-1 flex flex-col gap-1'>
          <p className="text-sm font-medium">Speciality</p>
          <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
            <option value=" General Doctor"> General Doctor</option>
            <option value=" Gynecologist"> Gynecologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Neurologist">Neurologist</option>
          </select>
        </div>

         <div className='flex-1 flex flex-col gap-1'>
          <p className="text-sm font-medium">Education</p>
          <input onChange={(e)=>setDegree(e.target.value)}value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required/>
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p className="text-sm font-medium">Address</p>
            <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='address 1' required/>
             <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='address 2' required/>
          </div>

      </div>

      </div>
    
     <div>
          <p className='mt-4 mb-2 text-sm font-medium text-gray-600'>About Doctor</p>
          <textarea  onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' type="text" placeholder='write about doctor' rows={5} required/>
          </div>
      <button className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add doctor</button>
    </div>
   </form>

   
//   <form onSubmit={onSubmitHandler} className="m-5 w-full flex justify-center">

//   <div className="bg-white px-8 py-8 border rounded-xl shadow-sm w-full max-w-4xl max-h-[80vh] overflow-y-auto">

//     <p className="mb-6 text-xl font-semibold text-gray-700">
//       Add Doctor
//     </p>

//     {/* Upload Image */}
//     <div className="flex items-center gap-4 mb-8 text-gray-500">
//       <label htmlFor="doc-img">
//         <img
//           className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
//           src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
//           alt="upload"
//         />
//       </label>

//       <input
//         onChange={(e) => setDocImg(e.target.files[0])}
//         type="file"
//         id="doc-img"
//         hidden
//       />

//       <p className="text-sm">
//         Upload doctor <br /> picture
//       </p>
//     </div>

//     {/* Form Fields */}
//     <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">

//       {/* LEFT SIDE */}
//       <div className="w-full lg:flex-1 flex flex-col gap-4">

//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">Doctor Name</label>
//           <input
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//             type="text"
//             placeholder="Name"
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">Doctor Email</label>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//             type="email"
//             placeholder="Email"
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">Doctor Password</label>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//             type="password"
//             placeholder="Password"
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">Experience</label>
//           <select
//             onChange={(e) => setExperience(e.target.value)}
//             value={experience}
//             className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//           >
//             <option value="1 year">1 year</option>
//             <option value="2 year">2 year</option>
//             <option value="3 year">3 year</option>
//             <option value="4 year">4 year</option>
//             <option value="5 year">5 year</option>
//             <option value="6 year">6 year</option>
//             <option value="7 year">7 year</option>
//           </select>
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">Fees</label>
//           <input
//             onChange={(e) => setFees(e.target.value)}
//             value={fees}
//             className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//             type="number"
//             placeholder="Fees"
//             required
//           />
//         </div>

//       </div>

//       {/* RIGHT SIDE */}
//       <div className="w-full lg:flex-1 flex flex-col gap-4">

//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">Speciality</label>
//           <select
//             onChange={(e) => setSpeciality(e.target.value)}
//             value={speciality}
//             className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//           >
//             <option value="GeneralDoctor">General Doctor</option>
//             <option value="Gynecologist">Gynecologist</option>
//             <option value="Dentist">Dentist</option>
//             <option value="Cardiologist">Cardiologist</option>
//             <option value="Neurologist">Neurologist</option>
//           </select>
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">Education</label>
//           <input
//             onChange={(e) => setDegree(e.target.value)}
//             value={degree}
//             className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//             type="text"
//             placeholder="Education"
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">Address</label>
//           <input
//             onChange={(e) => setAddress1(e.target.value)}
//             value={address1}
//             className="border rounded px-3 py-2 mb-2 outline-none focus:ring-2 focus:ring-primary"
//             type="text"
//             placeholder="Address line 1"
//             required
//           />
//           <input
//             onChange={(e) => setAddress2(e.target.value)}
//             value={address2}
//             className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//             type="text"
//             placeholder="Address line 2"
//             required
//           />
//         </div>

//       </div>
//     </div>

//     {/* About */}
//     <div>
//       <label className="block mt-6 mb-2 text-sm font-medium text-gray-700">
//         About Doctor
//       </label>
//       <textarea
//         onChange={(e) => setAbout(e.target.value)}
//         value={about}
//         className="w-full px-4 pt-2 border rounded outline-none focus:ring-2 focus:ring-primary"
//         placeholder="Write about doctor"
//         rows={5}
//         required
//       />
//     </div>

//     {/* Button */}
//     <button className="bg-primary hover:bg-primary/90 transition-all px-10 py-3 mt-6 text-white rounded-full font-medium">
//       Add Doctor
//     </button>

//   </div>
// </form>



  )
}

export default AddDoctors
