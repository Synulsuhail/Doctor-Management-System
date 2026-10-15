


import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const USER_TYPES = {
  ADMIN: "Admin",
  DOCTOR: "Doctor",
};

const Login = () => {
  const [userType, setUserType] = useState(USER_TYPES.ADMIN);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const url =
        userType === USER_TYPES.ADMIN
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`;

      const { data } = await axios.post(url, { email, password });

      if (!data.success) {
        return toast.error(data.message);
      }

      // Store token based on role
      if (userType === USER_TYPES.ADMIN) {
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
        navigate("/admin-dashboard");
      } else {
        localStorage.setItem("dToken", data.token);
        setDToken(data.token);
        navigate("/doctor-dashboard");
      }

      toast.success("Login successful");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[80vh] flex items-center out "
    >
      <div className="flex flex-col gap-4 m-auto p-8 min-w-[340px] border rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-center">
          <span className="text-primary">{userType}</span> Login
        </h2>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="border w-full p-2 mt-1"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="border w-full p-2 mt-1"
            required
          />
        </div>

        {/* Submit */}
        <button className="bg-emerald-600 text-white py-2 rounded">
          Login
        </button>

        {/* Switch Role */}
        {userType === USER_TYPES.ADMIN ? (
          <p>
            Doctor Login?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => setUserType(USER_TYPES.DOCTOR)}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => setUserType(USER_TYPES.ADMIN)}
            >
              Click here
            </span>
          </p>
        )}

        {/* Forgot Password */}
        {userType === USER_TYPES.DOCTOR && (
          <p
            className="text-emerald-600 cursor-pointer text-sm"
            onClick={() => navigate("/doctor-forgot-password")}
          >
            Forgot Password?
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
