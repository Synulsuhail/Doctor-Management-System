 
 import React from 'react'
 
 import medical from './medical.jpg'
import Doc1 from './Doc1.png'
import Doc2 from './Doc2.png'
import Doc3 from './Doc3.png'
import Doc4 from './Doc4.png'
import Doc5 from './Doc5.png'
import Hos1 from './Hos1.jpg'
import Hos2 from './Hos2.png'
import Hos3 from './Hos3.jpg'
import Doc7 from './Doc7.png'
import Doc8 from './Doc8.png'
import Doc9 from './Doc9.jpg'
import Doc10 from './Doc10.png'
import doc11 from './doc11.png'
import doc13 from './doc13.png'
import doctor21 from './doctor21.png'
import doctor22 from './doctor22.png'
import Docbooking from './DocBookingLogo.svg'
import Doc12 from './Doc12.png'
import Doc14 from './Doc14.png'
import brain from './brain.png'
import dental from './dental.png'
import doc26 from './doc26.png'
import doc27 from './doc27.png'
import doc28 from './doc28.png'
import doc29 from './doc29.jpg'
import doc30 from './doc30.png'
import doc32 from './doc32.jpg'
import appointment from './appointment online.png'
import patient from './patient&doctor.png'
import hos25 from './hos-25.jpg'
import general from './general.png'
import heart from './heart.png'
import gynecologist from './gynecologist.png'
import upload_area from './upload_area.svg'
import user from './user.png'
import logout from './logout.png'
import rescheduling from './rescheduling.png'

import doctorappointment from './doctor-appointment.png'
 export const assets =  {
  doc32,
  patient,
  appointment,
  doc30,
  doc29,
  doc28,
  doc27,
  doc26,
  hos25,
  rescheduling,
  doctorappointment,
  logout,
  user,
  upload_area,
   doctor22,
  doctor21,
  gynecologist,
  heart,
  general,
  dental,
   brain,
   medical,
   Docbooking,
   Doc1,
   Doc2,
   Doc3,
   Doc4,
   Doc5,
   Doc9,
   Doc10,
   Doc14,
   Doc12,
   doc11,
   doc13,
   Hos1,
  Hos2,
  Hos3,
   Doc7,
   Doc8,
  
  
 }
 
 export const specialities=[
  {
    name:"General Doctor",
     image:general
  },
   {
    name:"Neurologist",
     image:brain
  },
 {
    name:"Cardiologist",
     image:heart
  },
   {
    name:"Dentist",
     image:dental
  },
  {
    name:"Gynecologist",
     image:gynecologist
  },

 ];

 export const doctors = [
  {
    _id:"Doc1",
    name: "Dr. Jane Cooper",
    speciality: "Dentist",
    degree: "BDS, MDS",
    experience: 12,
    address: "547 Corrington Trace Drive, Cornelius",
    image: Doc1,
  },
  {
    _id:"Doc2",
    name: "Dr. Tom Cook",
    speciality: "Neurologist",
    degree: "MBBS, MD (Neurology)",
    experience: 20,
    address: "547 Corrington Trace Drive, Cornelius",
    image: Doc2,
  },
  {
    _id:"Doc3",
    name: "Dr. Monica",
    speciality: "Cardiologist",
    degree: "MBBS, MD (Cardiology)",
    experience: 20,
    address: "547 Corrington Trace Drive, Cornelius",
    image: Doc5,
  },
  {
    _id:"Doc4",
    name: "Dr. Swadhin Dholine",
    speciality: "General Doctor",
    degree: "MBBS",
    experience: 16,
    address: "Near Govt Office, Tolgaon Pune, India",
    image: Doc4,
  },
  {
    _id:"Doc7",
    name: "Dr. Rose Mary",
    speciality: "General Doctor",
    degree: "MBBS",
    experience: 16,
    address: "Near Govt Office, Tolgaon Pune, India",
    image: Doc7,
  },
  {
    _id:"Doc8",
    name: "Dr. Ronaldo",
    speciality: "General Doctor",
    degree: "MBBS",
    experience: 16,
    address: "Near Govt Office, Tolgaon Pune, India",
    image: Doc8,
  },

  {
    _id:"Doc10",
    name: "Dr.Syndney",
    speciality: "Cardiologist",
    degree: "MBBS, MD (Cardiology)",
    experience: 10,
    address: "Near Govt Office, Tolgaon Pune, India",
    image: Doc10,
  },

   {
    _id:"Doc12",
    name: "Dr. Allu Arjun",
    speciality: "Neurologist",
    degree: "MBBS, MD (Neurology)",
    experience: 20,
    address: "547 Corrington Trace Drive, Cornelius",
    image: Doc12,
  },
  
   {
    _id:"Doc14",
    name: "Dr. Tom Hardy",
    speciality: "Dentist",
    degree: "BDS, MDS",
    experience: 20,
    address: "547 Corrington Trace Drive, Cornelius",
    image: Doc14,
  },

  {
    _id:"Doc11",
  name: "Dr. Ananya Sharma",
  speciality: "Gynecologist",
  degree: "MBBS, MS (OBG)",
  experience: 10,
  address: "547 Corrington Trace Drive, Cornelius",
  image: doc11,
},

{
  _id:"Doc13",
  name: "Dr. Priya Menon",
  speciality: "Gynecologist",
  degree: "MBBS, MS (OBG)",
  experience: 10,
  address: "547 Corrington Trace Drive, Cornelius",
  image: doc13,
}


];


  export const services = [
    {
      image:Doc3,
    },
  {
    id: 1,
    title: "Special Nurses & Doctors",
    desc: "A vast variety of well educated Nurses and Doctors with Good Behaviour and Discipline.",
  },
  {
    id: 2,
    title: "24/7 Service",
    desc: "We offers 24/7 service, Emergency and other related facilities are available within Hospital Premises.",
  },
  {
    id: 3,
    title: "Online Consultation",
    desc: "We are offering Online (Video, Audio) call Consultation. there is no need now to visit hospital",
  },
  {
    id: 4,
    title: "Multi Specialists",
    desc: "We provide multiple specialist doctors for different departments and treatments.",
  },
];

