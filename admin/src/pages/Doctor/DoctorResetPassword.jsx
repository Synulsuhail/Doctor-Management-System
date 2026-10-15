import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const DoctorResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email;
  const { backendUrl } = useContext(AdminContext);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/reset-password`, { email, otp, password });
      if (data.success) {
        toast.success("Password updated");
      } else {
        toast.error(data.message || "Could not reset password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Could not reset password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={submitHandler} className="w-80 p-6 shadow">
        <h2 className="mb-4 text-xl">Reset Password</h2>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mb-3 w-full border p-2"
          required
        />
        <input
          type="password"
          autoComplete="new-password"
          placeholder="New Password (8+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full border p-2"
          minLength={8}
          required
        />
        <button type="submit" className="w-full bg-emerald-600 p-2 text-white">Reset Password</button>
      </form>
    </div>
  );
};

export default DoctorResetPassword;
