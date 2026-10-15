



import { assets } from "../assets/assets";
import { useRef, useState } from "react";

export default function Medical() {
  const data = [
    {
      img: assets.Hos1,
      title: "Online Monitoring",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    },
    {
      img: assets.Hos2,
      title: "Holter Heart Surgery",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    },
    {
      img: assets.Hos3,
      title: "Diagnose & Research",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    },
    {
      img: assets.Doc9,
      title: "X-Ray Imaging",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    },
    {
      img: assets.hos25,
      title: "Medical Treatment",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    },
  ];

  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (index) => {
    const slider = sliderRef.current;
    const cardWidth = slider.children[0].offsetWidth + 24;

    slider.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });

    setActive(index);
  };

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="min-w-[350px] md:min-w-[400px] bg-white  shadow-lg hover:shadow-2xl transition duration-300 flex-shrink-0 cursor-pointer"
              onClick={() => scrollToIndex(index)}
            >
              {/* Image */}
              <img
                src={item.img}
                alt="medical"
                className="w-full h-48 object-cover "
              />

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>

                <button className="bg-emerald-700 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-800 transition">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-3">
          {data.map((_, index) => (
            <div
              key={index}
              onClick={() => scrollToIndex(index)}
  className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
        active === index
          ? "w-8 bg-emerald-700"
          : "w-2 bg-gray-300"
      }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}




// import { assets } from "../assets/assets";
// import { useRef, useState } from "react";

// export default function Medical() {
//   const images = [
//     assets.Hos1,
//     assets.Hos2,
//     assets.Hos3,
//     assets.Doc9,
//     assets.Hos1
//   ];

//   const sliderRef = useRef(null);
//   const [active, setActive] = useState(0);

//   const scrollToIndex = (index) => {
//     const slider = sliderRef.current;
//     const cardWidth = slider.children[0].offsetWidth + 24; // 24 = gap-6
//     slider.scrollTo({
//       left: cardWidth * index,
//       behavior: "smooth",
//     });
//     setActive(index);
//   };

//   return (
//     <div className="w-full bg-white py-16">
//       <div className="max-w-6xl mx-auto px-6">

//         {/* Slider */}
//         <div
//           ref={sliderRef}
//           className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
//         >
//           {images.map((img, index) => (
//             <div
//               key={index}
//               className="min-w-[350px] md:min-w-[400px] h-80 rounded-3xl overflow-hidden shadow-md flex-shrink-0 cursor-pointer"
//               onClick={() => scrollToIndex(index)}
//             >
//               <img
//                 src={img}
//                 alt="medical"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center mt-6 gap-3">
//           {images.map((_, index) => (
//             <div
//               key={index}
//               onClick={() => scrollToIndex(index)}
//               className={`h-3 w-3 rounded-full cursor-pointer transition ${
//                 active === index ? "bg-black" : "bg-gray-400"
//               }`}
//             />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }
