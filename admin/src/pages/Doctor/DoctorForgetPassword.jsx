import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const DoctorForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/forgot-password`, { email });
      if (!data.success) {
        toast.error(data.message || "Could not send reset code");
        return;
      }
      toast.success("OTP sent to email");
      navigate("/doctor-reset-password", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Could not send reset code");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={submitHandler} className="w-80 p-6 shadow">
        <h2 className="mb-4 text-xl">Doctor Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full border p-2"
        />
        <button type="submit" className="w-full bg-emerald-600 p-2 text-white">Send OTP</button>
      </form>
    </div>
  );
};

export default DoctorForgotPassword;
