import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const Doctorslist = () => {
  const {doctors,aToken,getAllDoctors,changeAvailability}=useContext(AdminContext)

  useEffect(()=>{
    if(aToken){
      getAllDoctors()

    }

  },[aToken])
  return (
  
<div className="flex-1 p-8 bg-gray-50 min-h-screen">

  {/* Page Title */}
  <h1 className="text-2xl font-semibold text-gray-800 mb-8">
    All Doctors
  </h1>

  {/* Doctors Grid */}
  <div className="grid gap-6 
                  grid-cols-1 
                  sm:grid-cols-2 
                  lg:grid-cols-3 
                  xl:grid-cols-4">

    {doctors.map((item, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 border border-gray-100"
      >
        {/* Image */}
        <div className="w-full h-52 overflow-hidden rounded-t-xl bg-gray-100">
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-4">
          <p className="text-lg font-semibold text-gray-800">
            {item.name}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            {item.speciality}
          </p>

          {/* Availability */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={item.available}
              onChange={() => changeAvailability(item._id)}
              className="w-5 h-5 accent-emerald-700"
            />
            <span className="text-sm font-medium text-gray-700">
              Available
            </span>
          </label>
        </div>
      </div>
    ))}
  </div>
</div>


  )
}

export default Doctorslist
