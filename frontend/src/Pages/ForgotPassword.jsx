import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const ForgotPassword = () => {

  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate(); 

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:4000/api/user/forgot-password",
        { email }
      );

      if (data.success) {
        toast.success("OTP sent to email");
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-[60vh] justify-center items-center px-4 py-10">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md space-y-4 rounded-3xl border border-[#e5eee8] bg-white p-8 shadow-xl shadow-[#254838]/10"
      >
        <h2 className="text-xl font-semibold mb-4">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        />

        <button className="bg-emerald-700 text-white w-full p-2 rounded">
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

