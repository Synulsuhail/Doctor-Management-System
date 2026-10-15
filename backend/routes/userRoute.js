import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment,listAppointment,cancelAppointment, forgotPassword,paymentRazorpay,verifyRazorpay, 
  resetPassword } from '../controller/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter =express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/forgot-password',forgotPassword)
userRouter.post("/reset-password", resetPassword);
userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default userRouter