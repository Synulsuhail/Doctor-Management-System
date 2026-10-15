import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js";



import transporter from "../config/nodemailer.js";

const doctorForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.json({ success: false, message: "Email is required" });

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) return res.json({ success: false, message: "Doctor not found" });

    const otp = crypto.randomInt(100000, 1000000).toString();
    doctor.otp = otp;
    doctor.otpExpireAt = Date.now() + 10 * 60 * 1000;
    await doctor.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Doctor Password Reset",
      html: `<h2>Your OTP: ${otp}</h2><p>This code expires in 10 minutes.</p>`
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("Doctor password reset email failed:", error);
    res.status(500).json({ success: false, message: "Could not send reset email" });
  }
};

const doctorResetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    const doctor = await doctorModel.findOne({ email });
    if (!doctor || !doctor.otp || doctor.otp !== String(otp) || doctor.otpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    doctor.password = await bcrypt.hash(password, 10);
    doctor.otp = "";
    doctor.otpExpireAt = 0;
    await doctor.save();

    res.json({ success: true, message: "Password updated" });
  } catch (error) {
    console.error("Doctor password reset failed:", error);
    res.status(500).json({ success: false, message: "Could not reset password" });
  }
};
const changeAvailability=async (req,res)=>{
    try {
      
        const {docId}=req.body
        const docdata=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docdata.available} )
            res.json({success:true,message:'Availablity changed'})
       

    }catch (error){
         console.log(error)
        res.json({success:false,message:error.message})

    }
}
const doctorList=async (req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}
//API for doctor login
const loginDoctor=async(req,res)=>{
    try {
        const {email,password}=req.body
        const doctor= await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:'Invalid credentials'})
        }
        const isMatch= await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token=jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
            res.json({success:true,token})
        }else{
            res.json({success:false,message:'Invalid credentials'})
        }
        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

//API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {

    const docId = req.docId;   // ⭐ get from middleware

    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




const appointmentComplete = async (req, res) => {
  try {

    const doctorId = req.docId;   // ✅ from token
    const { appointmentId } = req.body;

    const appointmentData =
      await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success:false, message:"Not found" });
    }

    // verify owner
    if (appointmentData.docId.toString() !== doctorId) {
      return res.json({ success:false, message:"Unauthorized" });
    }

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { iscompleted:true }
    );

    return res.json({
      success:true,
      message:"Appointment Completed"
    });

  } catch (error) {
    console.log(error);
    res.json({ success:false, message:error.message });
  }
};



// const appointmentCancel = async (req, res) => {
//   try {

//     const doctorId = req.docId;   // ✅ from authDoctor middleware
//     const { appointmentId } = req.body;

//     // find appointment
//     const appointmentData =
//       await appointmentModel.findById(appointmentId);

//     if (!appointmentData) {
//       return res.json({
//         success: false,
//         message: "Not found"
//       });
//     }

//     // verify doctor owns appointment
//     if (appointmentData.docId.toString() !== doctorId) {
//       return res.json({
//         success: false,
//         message: "Unauthorized"
//       });
//     }

//     // update cancel status
//     await appointmentModel.findByIdAndUpdate(
//       appointmentId,
//       { cancelled: true }
//     );

//     return res.json({
//       success: true,
//       message: "Appointment Cancelled"
//     });

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };



const appointmentCancel = async (req, res) => {
  try {
    const doctorId = req.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Not found" });
    }

    // Prevent double cancel
    if (appointmentData.cancelled) {
      return res.json({ success: false, message: "Already cancelled" });
    }

    // Verify doctor
    if (appointmentData.docId.toString() !== doctorId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Cancel appointment
    appointmentData.cancelled = true;
    await appointmentData.save();

    // 👉 Get user email
    let userEmail = appointmentData.userEmail;

    // If you store only userId
    if (!userEmail) {
      const user = await userModel.findById(appointmentData.userId);
      userEmail = user?.email;
    }

    // 👉 Send email (don't block main response)
    if (userEmail) {
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Appointment Cancelled",
        html: `
          <h3>Your appointment has been cancelled</h3>
          <p>Doctor has cancelled your appointment.</p>
          <p>Appointment ID: ${appointmentId}</p>
        `,
      }).catch(err => console.log("Mail error:", err));
    }

    return res.json({
      success: true,
      message: "Appointment Cancelled",
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};








// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {

    // doctor id from auth middleware
    const docId = req.docId;

    // get all appointments of this doctor
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    const patientSet = new Set();

    // calculate earnings + unique patients
    appointments.forEach((item) => {

      // ✅ earnings only when payment done AND consultation completed
      if (item.payment || item.iscompleted) {
        earnings += item.amount;
      }

      // ✅ store unique patients
      patientSet.add(item.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patientSet.size,
      latestAppointments: [...appointments]
        .reverse()
        .slice(0, 5),
    };

    res.json({
      success: true,
      dashData,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default doctorDashboard;





const doctorProfile = async (req, res) => {
  try {

    //  get doctor id from token middleware
    const docId = req.docId;

    const profileData = await doctorModel
      .findById(docId)
      .select("-password");

    res.json({
      success: true,
      profileData
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};





const updateDoctorProfile = async (req, res) => {
  try {

    const docId = req.docId;
    const { address, fees, available } = req.body;

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      { address, fees, available },
      { new: true } // ⭐ returns updated data
    ).select("-password");

    res.json({
      success: true,
      message: "Profile Updated",
      profile: updatedDoctor   // ⭐ THIS is what frontend needs
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


export {
  changeAvailability,
  doctorList,loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  updateDoctorProfile,
  doctorProfile,
  doctorForgotPassword,
  doctorResetPassword

}