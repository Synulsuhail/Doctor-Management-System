
import validator from  'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from  'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'



import crypto from "crypto";
import transporter from "../config/nodemailer.js";


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = crypto.randomInt(100000, 1000000).toString();
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your password reset code is ${otp}. It expires in 10 minutes.`
    });

    return res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error("User password reset email failed:", error);
    return res.status(500).json({ success: false, message: "Could not send reset email" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    if (user.resetOtp !== String(otp) || user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("User password reset failed:", error);
    return res.status(500).json({ success: false, message: "Could not reset password" });
  }
};
const registerUser=async (req,res)=>{
    try {
         const {name,email, password}=req.body
         if(!name ||!password||!email){
            return res.json({success:false,message:"Missing Details"})
         }
         if(!validator.isEmail(email)){
              return res.json({success:false,message:"enter  a valid email"})
         }
          
         // validating strong password
         if(password.length<8){
            return res.json({success:false,message:"enter a strong password"})
         }

      //hashing user password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword= await bcrypt.hash(password,salt)

      const userData={
        name,
        email,
        password:hashedPassword,
        
      }
      const newUser =new userModel(userData)
      const user =await newUser.save()
      

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
       res.json ({success:true,token})

    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
       

    }
}

//API for user login
const loginUser =async (req,res)=>{
   try {
      const {email,password}=req.body
      const user=await userModel.findOne({email})

      if(!user){
         return res.json({success:false,message:'User does not exist'})
      }
      const isMatch =await bcrypt.compare(password,user.password)
      if(isMatch){
         const token=jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
         res.json({success:true,token})

      }else{
         res.json({success:false,message:"Invalid credentials"})
      }
      
   } catch (error) {
       console.log(error)
        res.json({success:false,message:error.message})
      
   }
}

//API to get user profile data
const getProfile=async (req,res)=>{
   try {
      
      const userId = req.userId;
      // const{userId}=req.body
      const userData=await userModel.findById(userId).select('-password')
      res.json({success:true,userData})

   } catch (error) {
       console.log(error)
        res.json({success:false,message:error.message})
      
   }
}

// const updateProfile=async (req,res)=>{
//    try {
//       const{userId,name,phone,address,dob,gender} =req.body
//       const imageFile =req.file
//       if(!name||!phone||!dob||!gender||!address){
//          return res.json({success:false,message:"Data Missing"})

//       }

//       await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

//       if(imageFile){

//       //upload image to cloudinary
//       const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
//       const imageURL =imageUpload.secure_url

//       await userModel.findByIdAndUpdate(userId,{image:imageURL})
   
//       }


//       res.json({success:true,message:"Profile Updated"})

      
//    } catch (error) {
//       console.log(error)
//         res.json({success:false,message:error.message})
      
//    }
// }


const updateProfile = async (req, res) => {
  try {

    const { name, phone, address, dob, gender } = req.body;
    const userId = req.userId;   // ✅ FIX
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender || !address) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        { resource_type: "image" }
      );

      await userModel.findByIdAndUpdate(userId, {
        image: imageUpload.secure_url
      });
    }

    res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




const bookAppointment = async (req,res)=>{
   try {

    const userId = req.userId
    const { docId, slotDate, slotTime } = req.body

      if(!userId){
         return res.json({success:false,message:'UserId missing'})
      }

      const docData = await doctorModel
        .findById(docId)
        .select('-password')

      if(!docData){
         return res.json({success:false,message:'Doctor not found'})
      }

      if(!docData.available){
         return res.json({success:false,message:'Doctor not available'})
      }

      let slots_booked = docData.slots_booked || {}

      if(slots_booked[slotDate]){
         if(slots_booked[slotDate].includes(slotTime)){
            return res.json({success:false,message:'Slot not available'})
         }
         slots_booked[slotDate].push(slotTime)
      } else {
         slots_booked[slotDate] = [slotTime]
      }

      const userData = await userModel
        .findById(userId)
        .select('-password')

      if(!userData){
         return res.json({success:false,message:'User not found'})
      }

      const docObject = docData.toObject()
      delete docObject.slots_booked

      const appointmentData = {
         userId,
         docId,
         userData,
         docData: docObject,
         amount: docData.fees,
         slotTime,
         slotDate,
         date: Date.now()
      }

      await new appointmentModel(appointmentData).save()

      await doctorModel.findByIdAndUpdate(docId,{slots_booked})

      res.json({success:true,message:'Appointment Booked'})

   } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
   }
}


const listAppointment = async (req, res) => {
  try {

    const userId = req.userId;   // ✅ get from middleware

    const appointments = await appointmentModel.find({ userId });

    res.json({
      success: true,
      appointments
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};





 

const cancelAppointment = async (req, res) => {
  try {

    // ✅ take userId from token middleware
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData =
      await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    // ✅ ownership check
    if (appointmentData.userId.toString() !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized action",
      });
    }

    // cancel appointment
    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { cancelled: true }
    );

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] =
        slots_booked[slotDate].filter(
          time => time !== slotTime
        );
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
//API to make payment of appointment using razorpay

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment || appointment.cancelled) {
      return res.status(404).json({ success: false, message: "Appointment not found or cancelled" });
    }
    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    if (appointment.payment) {
      return res.status(409).json({ success: false, message: "Appointment is already paid" });
    }

    const order = await razorpayInstance.orders.create({
      amount: Math.round(appointment.amount * 100),
      currency: process.env.CURRENCY,
      receipt: appointment._id.toString(),
    });

    return res.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return res.status(500).json({ success: false, message: "Could not create payment order" });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id: orderId } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: "Payment order is required" });

    const order = await razorpayInstance.orders.fetch(orderId);
    if (order.status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment is not complete" });
    }

    const appointment = await appointmentModel.findById(order.receipt);
    if (!appointment || appointment.cancelled) {
      return res.status(404).json({ success: false, message: "Appointment not found or cancelled" });
    }
    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    if (order.amount !== Math.round(appointment.amount * 100) || order.currency !== process.env.CURRENCY) {
      return res.status(400).json({ success: false, message: "Payment amount does not match appointment" });
    }

    const updated = await appointmentModel.findOneAndUpdate(
      { _id: appointment._id, userId: req.userId, payment: false, cancelled: false },
      { payment: true },
      { new: true }
    );
    if (!updated) {
      return res.status(409).json({ success: false, message: "Appointment payment was already processed" });
    }

    return res.json({ success: true, message: "Payment successful" });
  } catch (error) {
    console.error("Razorpay payment verification failed:", error);
    return res.status(500).json({ success: false, message: "Could not verify payment" });
  }
};
export {registerUser, 
  loginUser,getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,forgotPassword,paymentRazorpay,
  verifyRazorpay,

  resetPassword}