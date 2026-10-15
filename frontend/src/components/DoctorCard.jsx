import React, { useContext } from "react";
import { AppContext } from '../context/AppContext'
import { useNavigate } from "react-router-dom";

const DoctorCard = () => {
   const {doctors}=useContext(AppContext)
   const navigate=useNavigate()
   
  return (
    <div className="my-16 px-4 md:px-20 text-gray-900 py-10">
  <h1 className="text-4xl font-semibold  text-center">
    Top Doctors to book
  </h1>

  <p className="text-center leading-loose tracking-wide text-gray-700 mt-2 poppins">
    Simply browse through our extensive list of trusted doctors
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
    {doctors.slice(0, 4).map((doctor, index) => (
//       <div onClick={()=>navigate(`/appointment/${item._id}`)}
//         key={index}
//         className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
//       >
//         {/* Doctor Image */}
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-full h-52 object-contain bg-gray-100"
//         />

        
//         <div className="p-4">
          
//           {/* <div className="flex items-center gap-2 mb-2">
//             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//             <p className="text-sm text-green-600 font-medium">Available</p>
//           </div> */}

          
// <div className="flex items-center gap-2 mb-2">

//   <span
//     className={`w-2 h-2 rounded-full ${
//       item.available ? "bg-green-500" : "bg-gray-400"
//     }`}
//   ></span>

//   <p
//     className={`text-sm font-medium ${
//       item.available ? "text-green-600" : "text-gray-500"
//     }`}
//   >
//     {item.available ? "Available" : "Not Available"}
//   </p>

// </div>
          
//           <p className="text-lg font-semibold poppins">{item.name}</p>

          
//           <p className="text-sm text-emerald-600 poppins">{item.speciality}</p>
//         </div>
//       </div>



<div
  onClick={() => navigate(`/appointment/${doctor._id}`)}
  key={index}
  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
>
  {/* Image */}
  <img
    src={doctor.image}
    alt={doctor.name}
   className="w-full h-56 object-cover object-top bg-gray-200"
  />

  {/* Content */}
  <div className="p-5">
    {/* Name */}
    <h2 className="text-lg font-semibold poppins text-gray-800">
      {doctor.name}
    </h2>

    {/* Speciality + Rating */}
    <div className="flex items-center justify-between mt-1">
      <p className="text-sm text-gray-500 poppins">
        {doctor.speciality}
      </p>

      {/* Rating */}
      <div className="flex items-center text-sm text-emerald-700 font-medium">
        â­ 4.9 / 5.0
      </div>
    </div>

    {/* Divider */}
    <hr className="my-3" />

    {/* Social Links */}
    <div className="flex justify-between text-sm text-gray-500">
      <span className="hover:text-emerald-700 cursor-pointer">Facebook</span>
      <span className="hover:text-emerald-700 cursor-pointer">Twitter</span>
      <span className="hover:text-emerald-700 cursor-pointer">Instagram</span>
    </div>
  </div>
</div>


    ))}
  </div>
      
<div className="flex justify-center">
  <button onClick={() => { navigate(`/doctors`); scrollTo(0, 0); }}
    className="bg-emerald-600 text-white px-12 py-3 text-center rounded-full mt-10 poppins" >View All</button>
</div>

</div>



  );
};

export default DoctorCard;

