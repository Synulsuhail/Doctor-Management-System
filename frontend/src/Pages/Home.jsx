import React from 'react'
import Header from '../components/Header'
import Specialist from '../components/Specialist'
import DoctorCard from '../components/DoctorCard'
import Services from '../components/Services'

import Medical from '../components/Medical'
import HeroSection from '../components/HeroSection'

import ServiceSection from '../components/ServiceSection'

const Home = () => {
  return (
    
    <div>
       <Header/>
       <HeroSection/>
       <Specialist/>
      <DoctorCard/>
      <Services/>
      
      <ServiceSection/>
      <Medical/>
    </div>
  )
}

export default Home
