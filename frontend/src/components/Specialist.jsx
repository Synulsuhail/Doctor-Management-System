import React from 'react'
import { assets, specialities } from '../assets/assets'
import  {Link} from 'react-router-dom'

const Specialist = () => {
  return (



    

<div >




 <div className="w-full bg-emerald-50 pt-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Image */}
   <div className="h-[550px]">
  <img
    src={assets.doctor22}
    alt="Medical Surgery"
    className="w-full h-full object-cover rounded-xl block"
  />
</div>

        {/* Right Content */}
        <div>
   <h3 className="text-emerald-700 text-5xl font-semibold">
  Advanced Medical Care
</h3>

<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">
  Reducing Symptoms <br /> Improving Lives.
</h2>

          <p className="text-gray/80 text-lg leading-relaxed max-w-xl mt-6 ">
            Experienced specialists with proven success rates. 
           Continuous follow-up and patient support. 
            Safe and effective therapy procedures.
          </p>

          {/* Testimonial Card */}
        
        </div>

      </div>
    </div>


  <div className="text-center pt-20 mb-10">

  <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
    Our Medical
    <span className="text-emerald-700"> Specialities</span>
  </h2>

 

 
<p className="mt-4 max-w-xl mx-auto text-base text-gray-700 poppins leading-loose tracking-wide">
  Find experienced specialists and book appointments easily with verified doctors near you.
</p>

</div>

  {/* CENTERED GRID */}
<div className="flex flex-wrap justify-center gap-6 mt-6 max-w-4xl mx-auto">
  {specialities.map((item, index) => (
    <Link
      to={`/doctors/${item.name}`}
      key={index}
      className="w-40 h-40 bg-emerald-50 rounded-xl
                 flex flex-col items-center justify-center gap-3
                 shadow-md hover:shadow-xl
                 hover:-translate-y-2 transition duration-300"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 object-contain"
      />
      <p className="font-medium text-gray-700 text-center">
        {item.name}
      </p>
    </Link>
  ))}
</div>

</div>



  )
}

export default Specialist



