



import { FaUserMd, FaCalendarCheck, FaHeadset, FaShieldAlt } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserMd size={30} />,
      title: "Experienced Doctors",
      description:
        "Our verified specialists provide trusted and professional healthcare services."
    },
    {
      icon: <FaCalendarCheck size={30} />,
      title: "Easy Appointment Booking",
      description:
        "Book your appointment online in less than 60 seconds with instant confirmation."
    },
    {
      icon: <FaHeadset size={30} />,
      title: "24/7 Support",
      description:
        "Our support team is always available to assist you with your medical needs."
    },
    {
      icon: <FaShieldAlt size={30} />,
      title: "Secure & Private",
      description:
        "Your medical information is encrypted and securely stored for complete privacy."
    }
  ];

  return (
    <section className="bg-emerald-50 py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">
          Why Choose Us
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-loose tracking-wide poppins">
          We combine trusted medical expertise with modern technology to give you the best healthcare experience.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition duration-300"
          >
            <div className="text-emerald-700 mb-4 flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm poppins">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

