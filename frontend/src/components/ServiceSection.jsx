import React, { useState } from "react";
import { assets } from "../assets/assets";

const services = [
  {
    title: "Neurosurgery",
    content:
      "MRI of the spine is a modern highly informative diagnostic examination that allows to assess the condition of a significant number of structures.",
  },
  {
    title: "Cardiologist",
    content: "Heart-related diagnosis and treatment by expert cardiologists.",
  },
  {
    title: "Radiology",
    content: "Advanced imaging services including X-ray, CT scan, and MRI.",
  },
  {
    title: "Therapy",
    content: "Personalized therapy sessions for physical and mental recovery.",
  },
];

export default function ServiceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center gap-12">
        
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.doc29}
            alt="medical"
            className="w-full h-[350px] object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-gray-800">
            Our best service for your health
          </h2>

          <div className="mt-8 space-y-4">
            {services.map((item, index) => (
              <div
                key={index}
                className="border-b pb-4 cursor-pointer"
                onClick={() => toggle(index)}
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.title}
                  </h3>

                  <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full border ${
                      activeIndex === index
                        ? "bg-emerald-700 text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {activeIndex === index ? "Ã—" : "+"}
                  </div>
                </div>

                {/* Content */}
                {activeIndex === index && (
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
