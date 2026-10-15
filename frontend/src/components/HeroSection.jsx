import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            More than a clinic,
            <br />
            it's a caring place
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Easily find and book appointments with top doctors near you.
            Your path to better health begins with a simple click.
          </p>

          <ul className="mt-6 space-y-2 text-gray-700">
            <li>â€¢ Find doctors and book appointments easily</li>
            <li>â€¢ See top-rated doctors near you</li>
            <li>â€¢ Book appointments instantly</li>
          </ul>

          <button className="mt-8 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full shadow-md transition">
            See How We Care
          </button>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative w-full md:w-[500px] h-[350px]">
          
          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309"
            alt="doctor"
            className="w-[320px] h-[220px] object-cover rounded-xl shadow-lg absolute top-0 left-0 z-20"
          />

          {/* Second Image (Overlapping) */}
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118"
            alt="doctor2"
            className="w-[280px] h-[200px] object-cover rounded-xl shadow-lg absolute bottom-0 right-0 z-10"
          />

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
