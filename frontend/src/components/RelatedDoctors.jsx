import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {
  
    const{doctors}=useContext(AppContext)
    const[reldoc,setRelDoc]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        if(doctors.length >0 && speciality){
            const doctorsData=doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId)
           setRelDoc(doctorsData)
        }

    },[doctors,speciality,docId]   )
   
  return (

<div className="my-16 px-4 md:px-20 text-gray-900">
  <h1 className="text-3xl font-semibold text-center">
     Related Doctors
  </h1>

  

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
    {reldoc.slice(0, 4).map((item, index) => (
      <div onClick={()=> {navigate(`/appointment/${item._id}` ); scrollTo(0,0)}}
        key={index}
        className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
      >
        {/* Doctor Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-52 object-contain bg-gray-100"
        />

        
        <div className="p-4">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <p className="text-sm text-green-600 font-medium">Available</p>
          </div>

          
          <p className="text-lg font-semibold">{item.name}</p>

          
          <p className="text-sm text-gray-500">{item.speciality}</p>
        </div>
      </div>
    ))}
  </div>
      
{/* <div className="flex justify-center">
  <button onClick={() => { navigate(`/doctors`); scrollTo(0, 0); }}
    className="bg-emerald-50 text-gray-600 px-12 py-3 text-center rounded-full mt-10" > more </button>
</div> */}

</div>


  )
}

export default RelatedDoctors
