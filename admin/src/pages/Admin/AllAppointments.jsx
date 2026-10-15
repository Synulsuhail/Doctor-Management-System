import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const {aToken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext)
   const {calculateAge,slotDateFormat}=useContext(AppContext)


 


  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }
  },[aToken])
  return (
      <div className="w-full p-6 bg-gray-100">

      <h2 className="text-xl font-semibold mb-4">
        All Appointments
      </h2>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full text-sm text-left">
          <thead className=" text-gray-600">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Age</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length > 0 ? (
              appointments.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">

                  {/* Index */}
                  <td className="p-3 font-medium">
                    {index + 1}
                  </td>

                  {/* Patient (Image + Name) */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">

                      <img
                        src={item.userData?.image || "/default_user.png"}
                        alt="patient"
                        className="w-10 h-10 rounded-full object-cover border"
                      />

                      <p className="font-medium">
                        {item.userData?.name}
                      </p>

                    </div>
                  </td>

                  {/* Age */}
                 <td className="p-3">
  {calculateAge(item.userData?.dob)}
</td>

                  {/* Date & Time */}
                  <td className="p-3">
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </td>

                  {/* Doctor */}
                  <td className="p-3">
                   
                   <div className="flex items-center gap-3">

                      <img
                        src={item.docData?.image || "/default_user.png"}
                        alt="patient"
                        className="w-10 h-10 rounded-full object-cover border"
                      />

                      <p className="font-medium">
                        {item.docData?.name}
                      </p>

                    </div>

                  </td>

                  {/* Fees */}
                  <td className="p-3">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.amount)}
                  </td>

                  {/* Actions */}
                

<td className="p-3">
  {item.cancelled ? (
    <p className="text-red-500 font-semibold">Cancelled</p>
  ) : item.iscompleted ? (
    <p className="text-emerald-600 font-semibold">Completed</p>
  ) : (
    <p
      onClick={() => cancelAppointment(item._id)}
      className="text-green-600 font-medium cursor-pointer"
    >
      Cancel
    </p>
  )}
</td>


                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-400">
                  No Appointments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>

  )
}

export default AllAppointments
