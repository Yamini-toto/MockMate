"use client";
import { Button } from "@/components/ui/button";
import FaqSection from "@/components/ui/faqSection";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Header from "./dashboard/_components/Header";
import dynamic from 'next/dynamic';

const Plans = dynamic(() => import('./dashboard/_components/plans'), { ssr: false });

export default function Home() {
  const user = useUser();
  const userId = user.user?.id;

  return (
    <>
    <div>
      <div className="text-center py-2 bg-[#C3FF93]">
        <h1 className="font-bold">Start your AI interview practice now</h1>
      </div>

      <Header />
        {/* first section */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 max-w-[85%] mx-auto w-full px-4 min-h-[520px] animate-fade-in">
        {/* Left: Heading and Button */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 gap-6 animate-slide-in-left">
          <h1 className="max-w-full text-3xl md:text-4xl lg:text-5xl text-center md:text-left font-bold mt-0 text-[#06514e] animate-fade-in leading-tight break-words lg:max-w-[90%]" style={{wordBreak: 'break-word'}}>
            Improve Your Interview Skills<br />with AI Guidance<br />for Real Success
          </h1>
          <p className="text-base md:text-lg text-gray-700 text-center md:text-left max-w-[90%] lg:max-w-[80%] animate-fade-in delay-100">
            Unlock your full potential with personalized, AI-driven mock interviews. Practice in a realistic environment, receive actionable feedback, and build the confidence you need to ace your next interview.
          </p>
          <Button
            variant={'primary'}
            className={
              'shiny-btn bg-[#0a7a77] text-white text-md my-5 font-medium px-10 py-4 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a7a77] focus:ring-offset-2 text-lg animate-pop-in'
            }
            onClick={() => {
              if (user.user) {
                window.location.href = '/dashboard';
              } else {
                window.location.href = '/sign-in';
              }
            }}
          >
            Begin now
          </Button>
        </div>
        {/* Right: Image */}
        <div className="flex justify-center w-full md:w-1/2 animate-slide-in-right">
          <Image alt="icon" src={'/assets/mockHero.png'} width={600} height={600} className="w-full max-w-[500px] h-auto max-h-[520px] object-contain lg:max-w-[600px] lg:max-h-[600px] transition-transform duration-500 hover:scale-105" />
        </div>
      </div>
        {/* second section */}
      <div className="mt-9">
        <div className=' max-w-[85%] mx-auto flex justify-between items-center py-8 flex-row gap-3'>

      <div className='flex flex-col lg:flex-row gap-3 items-center animate-slide-up delay-100 min-h-[140px] w-full'>
        <div style={{ position: 'relative', width: 55, height: 55 }}>
          <div style={{ position: 'absolute', inset: 0, background: '#0a7a77', borderRadius: '50%' }} />
          <Image src={'/assets/smily.png'} alt='smily' width={40} height={40} style={{ position: 'absolute', inset: 0, margin: 'auto' }} />
        </div>
        <div className='w-full lg:max-w-[65%] flex flex-col items-center lg:items-start'>
          <h2 className='font-bold text-md text-[#0a7a77] md:text-lg text-center lg:text-start'>Confidence Booster</h2>
          <p className='text-[#0a7a77] font-semibold text-sm md:text-md text-center lg:text-start'>Ace your mock interviews and boost your confidence for real ones.</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-3 items-center animate-slide-up delay-200 min-h-[140px] w-full'>
        <div style={{ position: 'relative', width: 55, height: 55 }}>
          <div style={{ position: 'absolute', inset: 0, background: '#0a7a77', borderRadius: '50%' }} />
          <Image src={'/assets/feedback.png'} alt='feedback' width={40} height={40} style={{ position: 'absolute', inset: 0, margin: 'auto' }} />
        </div>
        <div className='w-full lg:max-w-[65%] flex flex-col items-center lg:items-start'>
          <h2 className='font-bold text-md md:text-lg text-[#0a7a77] text-center lg:text-start'>Quality Feedback</h2>
          <p className='text-center lg:text-start font-semibold text-sm md:text-md text-[#0a7a77]'>Receive detailed feedback to improve your interview performance.</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-3 items-center animate-slide-up delay-300 min-h-[140px] w-full'>
        <div style={{ position: 'relative', width: 55, height: 55 }}>
          <div style={{ position: 'absolute', inset: 0, background: '#0a7a77', borderRadius: '50%' }} />
          <Image src={'/assets/fireflame.png'} alt='fire' width={40} height={40} style={{ position: 'absolute', inset: 0, margin: 'auto' }} />
        </div>
        <div className='w-full lg:max-w-[65%] flex flex-col items-center lg:items-start'>
          <h2 className='font-bold text-md text-[#0a7a77] md:text-lg text-center lg:text-start'>Less Pressure</h2>
          <p className='text-center lg:text-start font-semibold text-[#0a7a77] text-sm md:text-md'>Practice without pressure and enhance your interview skills.</p>
        </div>
      </div>

    </div>
    <hr className='border-[#e1fffe]'/>

    <div id="faq" className='bg-[#0a7a77]'>
        <FaqSection />
    </div>
    <Plans />

      </div>

      {/* thired section pricing*/}


    </div>
    {/* footer section */}
    <footer className="bg-[#0a7a77] text-[#e1fffe] py-6">
      <div className="max-w-[85%] mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Image src={'/assets/mockFooter.png'} alt="Full Logo" width={150} height={150} />
        </div>

        {/* Links Section */}
        <div className="flex flex-col lg:flex-row gap-4 text-center lg:text-left">
          <Link href={'/about'} className="hover:underline">About Us</Link>
          <Link href={'/features'} className="hover:underline">Features</Link>
          <Link href={'/pricing'} className="hover:underline">Pricing</Link>
          <Link href={'/contact'} className="hover:underline">Contact</Link>
          <Link href={'/faq'} className="hover:underline">FAQ</Link>
        </div>

        {/* App Download Section */}
        <div className="flex flex-col items-center lg:items-end gap-3 ">
          <a href="https://play.google.com/store" className="rounded-md overflow-hidden" target="_blank" rel="noopener noreferrer">
            <Image src={'/assets/google.png'} alt="Download on Play Store" width={150} height={50} />
          </a>
          <a href="https://www.apple.com/app-store/" className="rounded-md overflow-hidden" target="_blank" rel="noopener noreferrer">
            <Image src={'/assets/apple.png'} alt="Download on Apple Store" width={150} height={50} />
          </a>
        </div>
      </div>
      <hr className="border-[#e1fffe] my-4" />
      <div className="text-center text-sm">
        © {new Date().getFullYear()} MockMate. All rights reserved.
      </div>
    </footer>
    {/* Add shiny button animation */}
<style jsx global>{`
  .shiny-btn {
    position: relative;
    overflow: hidden;
  }
  .shiny-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 100%);
    transform: skewX(-20deg);
    animation: shine 2s infinite;
    pointer-events: none;
  }
  @keyframes shine {
    0% { left: -75%; }
    100% { left: 125%; }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 1s ease-in;
  }
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-slide-in-left {
    animation: slide-in-left 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-slide-in-right {
    animation: slide-in-right 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slide-up 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  @keyframes pop-in {
    0% { transform: scale(0.8); opacity: 0; }
    80% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
  }
  .animate-pop-in {
    animation: pop-in 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  @media (max-width: 1024px) {
    .lg\\:max-w-[600px] { max-width: 90vw !important; }
    .lg\\:max-h-[600px] { max-height: 60vw !important; }
  }
  @media (max-width: 768px) {
    .max-w-[1400px] { max-width: 100% !important; }
    .md\\:flex-row { flex-direction: column !important; }
    .md\\:items-start { align-items: center !important; }
    .md\\:w-1\/2 { width: 100% !important; }
    .max-w-[500px] { max-width: 90vw !important; }
    .max-h-[520px] { max-height: 60vw !important; }
  }
`}</style>
    </>
  )
}
