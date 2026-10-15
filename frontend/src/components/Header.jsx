import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Header = () => (
  <section className="relative isolate overflow-hidden bg-[#e9f5ef]">
    <div className="absolute -right-24 -top-28 h-[34rem] w-[34rem] rounded-full bg-[#d5ebe0]" />
    <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 pb-14 pt-12 sm:px-10 lg:min-h-[590px] lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:pb-16 lg:pt-10">
      <div className="z-10 max-w-2xl py-5 text-center lg:text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#c8dfd4] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#367d66]"><span className="h-2 w-2 rounded-full bg-[#50a981]" /> Care that puts you first</span>
        <h1 className="mt-7 text-4xl font-extrabold leading-[1.12] text-[#173b35] sm:text-5xl lg:text-[3.75rem]">Your health deserves <span className="text-[#389478]">a better</span> kind of care.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#617872] sm:text-lg lg:mx-0">Find trusted doctors, book a time that works for you, and feel supported at every step.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <Link to="/doctors" className="rounded-full bg-[#267b66] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#267b66]/20 transition hover:-translate-y-0.5 hover:bg-[#1d6756]">Find a doctor <span aria-hidden="true">→</span></Link>
          <Link to="/about" className="rounded-full border border-[#c8dcd3] bg-white/70 px-7 py-3.5 text-sm font-bold text-[#31564b] transition hover:bg-white">How it works</Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-medium text-[#537068] lg:justify-start"><span>✓ Verified specialists</span><span>✓ Easy online booking</span><span>✓ Care you can trust</span></div>
      </div>
      <div className="relative mx-auto flex w-full max-w-[510px] items-end justify-center lg:h-[510px]">
        <div className="absolute bottom-1 h-[82%] w-[82%] rounded-t-[48%] rounded-b-[42%] bg-[#d1e8dc]" />
        <img src={assets.doc27} alt="Doctor ready to help you" className="relative z-10 max-h-[430px] w-full object-contain object-bottom drop-shadow-[0_20px_25px_rgba(37,80,63,0.14)] sm:max-h-[490px]" />
        <div className="absolute bottom-7 left-0 z-20 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl shadow-[#254838]/10 backdrop-blur sm:-left-3"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e4f3ec] text-xl">✚</span><span><strong className="block text-sm text-[#173b35]">Here for your health</strong><small className="text-[#71847e]">Care starts with a conversation</small></span></div></div>
      </div>
    </div>
  </section>
)

export default Header

