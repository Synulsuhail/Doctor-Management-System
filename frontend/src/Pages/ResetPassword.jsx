
import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  // âœ… show / hide password state
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/reset-password",
        form
      );

      alert(data.message);

      if (data.success) {
        window.location.href = "/login";
      }

    } catch (error) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="flex min-h-[60vh] justify-center items-center px-4 py-10">

      <form
        autoComplete="off"
        onSubmit={submitHandler}
        className="w-full max-w-md space-y-4 rounded-3xl border border-[#e5eee8] bg-white p-8 shadow-xl shadow-[#254838]/10"
      >
        <h2 className="text-xl font-semibold mb-4">
          Reset Password
        </h2>

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          onChange={changeHandler}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        {/* OTP */}
        <input
          name="otp"
          placeholder="OTP"
          onChange={changeHandler}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        {/* NEW PASSWORD */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            autoComplete="new-password"
            onChange={changeHandler}
            className="border w-full p-2 rounded pr-16"
            required
          />

          {/* SHOW / HIDE BUTTON */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-emerald-700 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button className="bg-emerald-700 text-white w-full p-2 rounded">
          Reset Password
        </button>

      </form>

    </div>
  );
};

export default ResetPassword;

