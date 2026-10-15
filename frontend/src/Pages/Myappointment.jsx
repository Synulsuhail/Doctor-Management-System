import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { doctors } from '../assets/assets'
import axios from 'axios'
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const Myappointment = () => {


 const{backendUrl,token,getDoctorsData}=useContext(AppContext)
 const [appointments,setAppointments]=useState([])
 const navigate =useNavigate()

 const months=[ "","Jan","Feb","Mar","Apr","May","Jun","jul","Jul","Aug","Sep","Oct","Nov","Dec"]
 const slotDateFormat=(slotDate)=>{
  const dateArray=slotDate.split('_')
  return dateArray[0]+""+months[Number(dateArray[1])]+""+dateArray[2]
 }

 const getUserAppointments=async ()=>{
  try {
    const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
    if(data.success){
      setAppointments(data.appointments.reverse())
      console.log(data.appointments);
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
    
  }
 }

 const cancelAppointment=async(appointmentId)=>{
  try {
   const {data}= await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
    
   if(data.success){
    toast.success(data.message)
    getUserAppointments()
    getDoctorsData()

   }else{
    toast.error(data.message)
   }


  } catch (error) {
     console.log(error)
    toast.error(error.message)
  }
 }

  const initpay =(order)=>{
    const options ={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response)

        try {
          const {data}=await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
            
          if(data.success){
            getUserAppointments()
            navigate('/my-appointments')
          }


        } catch (error) {
          console.log(error)
          toast.error(error.message)
          
        }
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()

  }
  const appointmentRazorpay =async (appointmentId) => {
    try {
      
      const {data}= await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
      if(data.success){
       initpay(data.order)

      }

    } catch (error) {
      
    }

    
  }


 useEffect(()=>{
  if(token){
    getUserAppointments()

  }
 },[token])
  return (
   

  
<div className="w-full bg-gray-100 py-6">

  {/* CENTER CONTENT */}
  <div className="max-w-5xl mx-auto px-4 md:px-2">

    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      My appointments
    </h2>

    <div className="space-y-5">
      {appointments.map((item) => (

        <div
          key={item._id}
          className="w-full border border-gray-200 rounded-md p-4 flex flex-col md:flex-row gap-6 bg-white"
        >

          {/* Image */}
          <div className="w-full md:w-40 flex justify-center items-center">
            <img
              src={item.docData?.image}
              alt={item.docData?.name}
              className="w-32 h-32 md:w-36 md:h-40 object-cover rounded-md bg-emerald-100"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800">
              {item.docData?.name}
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              {item.docData?.speciality}
            </p>

            <p className="text-sm font-semibold text-gray-700">
              Address:
            </p>

            <p className="text-sm text-gray-500">
              {item.docData?.address.line1},{" "}
              {item.docData?.address.line2}
            </p>

            <p className="text-sm text-gray-700 mt-2">
              <span className="font-semibold">Date & Time:</span>{" "}
              <span className="text-gray-500">
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </span>
            </p>
          </div>

          {/* Buttons */}
          <div className="w-full md:w-48 flex md:flex-col gap-3 justify-center">
            {!item.cancelled && item.payment && !item.iscompleted && <button className="w-full border border-gray-300 py-2 rounded-md hover:text-white bg-gray-200 ">paid</button>}
            {!item.cancelled && !item.payment && !item.iscompleted &&  (
              <button onClick={()=> appointmentRazorpay(item._id)} className="w-full border border-gray-300 py-2 rounded-md hover:text-white hover:bg-emerald-700 transition">
                Pay Online
              </button>
            )}

            {!item.cancelled && !item.iscompleted &&  (
              <button
                onClick={() => cancelAppointment(item._id)}
                className="w-full border border-gray-300 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
              >
                Cancel appointment
              </button>
            )}

            {item.cancelled && !item.iscompleted &&  (
              <button className="w-full border border-gray-300 text-red-500 py-2 rounded-md">
                Appointment Cancelled
              </button>
            )}

            
              { item.iscompleted &&  (
              <button className="w-full border border-green-300 text-green-500 py-2 rounded-md">
                Completed
              </button>
            )}

          </div>

        </div>
      ))}
    </div>

  </div>
</div>
   


  )
}

export default Myappointment
