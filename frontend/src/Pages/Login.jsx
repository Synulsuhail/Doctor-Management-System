import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
 import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { backendUrl,token, setToken } = useContext(AppContext)
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      // âœ… SIGN UP
      if (state === 'Sign Up') {

        const { data } = await axios.post(
          backendUrl + '/api/user/register',
          { name, email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("Account created successfully")
        } else {
          toast.error(data.message)
        }

      }

      // âœ… LOGIN
      else {

        const { data } = await axios.post(
          backendUrl + '/api/user/login',
          { email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("Login successful")
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect (()=>{
    if (token) {
       navigate('/')

    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[65vh] flex items-center bg-[#f5f8f6] px-4 py-10 out">

      <div className='flex flex-col gap-3  m-auto items-start p-8 w-full max-w-md border border-[#e5eee8] rounded-3xl text-zinc-600 text-sm shadow-xl shadow-[#254838]/10 bg-white'>
<div className="w-full text-center">
        <p className="text-2xl font-semibold ">
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </p>

        <p>
          please {state === 'Sign Up' ? "sign up" : "login"} to book appointment
        </p>
</div>
       
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full name</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
        )}

        {/* EMAIL */}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="w-full">
  <p>Password</p>

  <div className="relative">
    <input
      className="border border-zinc-300 rounded w-full p-2 mt-1 pr-12"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    {/* Show / Hide button */}
    <span
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-emerald-700"
    >
      {showPassword ? "Hide" : "Show"}
    </span>
  </div>
</div>

        {/* BUTTON */}
        <button type='submit'className="bg-emerald-700 text-white w-full py-2 rounded-md text-base">
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        {/* SWITCH LOGIN / SIGNUP */}
        {
          state === "Sign Up" ? (
            <p> Already have an account?
              <span onClick={() => setState('Login')} className='text-emerald-700 underline cursor-pointer ml-1' >
                login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?
              <span
                onClick={() => setState('Sign Up')}
                className='text-emerald-700 underline cursor-pointer ml-1'
              >
                click here
              </span>
            </p>
          )
        }

    {state === "Login" && (
  <div className="w-full text-center">
    <span
      onClick={() => navigate('/forgot-password')}
      className="text-emerald-700 text-sm cursor-pointer hover:underline"
    >
      Forgot Password?
    </span>
  </div>
)}

      </div>
    </form>
  )
}

export default Login


