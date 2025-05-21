"use client";
import { Button } from "@/components/ui/button";
import FaqSection from "@/components/ui/faqSection";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Home() {
  const user = useUser();
  const userId = user.user?.id;

  return (
    <>
    <div>
      <div className="text-center py-2 bg-[#C3FF93]">
        <h1 className="font-bold">Start your AI interview practice now</h1>
      </div>
      {/* <navbar>
      <div className="bg-[#F8FEFE] pt-2 px-20 shadow-md flex justify-between items-center">
        <Image src={'/assets/FullLogo.png'} width={65} height={65} alt="logo"/>
        {userId ? <UserButton />:
        <div className="flex gap-2">
          <Link href={'/sign-in'}><Button variant={'outline'} className={'hover:cursor-pointer hover:bg-[#b7c0c0]'}>Sign in</Button></Link>
          <Link href={'/sign-up'}><Button variant={'outline'} className={'hover:cursor-pointer hover:bg-[#b7c0c0]'}>Sign up</Button></Link>
        </div>
        }
      </div>
      </navbar> */}
      <Header />
        {/* first section */}
      <div className=" mt-3 flex flex-col items-center justify-center gap-2">
        <Image alt="icon" src={'/assets/welcomeImg.png'} width={400} height={400}/>
        <h1 className="max-w-[70%] text-3xl md:text-4xl lg:text-5xl text-center font-bold mt-[-19px] ">Improve Your Interview Skills width AI Guidance</h1>
        <Button variant={'primary'} className={'bg-[#C3F8FF] text-md my-5 font-medium'} >Begin now</Button>
      </div>
        {/* second section */}
      <div className="bg-[#0a7a77] mt-9">
        <div className=' max-w-[85%] mx-auto flex justify-between items-center py-8 flex-row gap-3'>

      <div className='flex flex-col lg:flex-row gap-3 items-center'>
        <Image src={'/assets/smily.png'} alt='smily' width={55} height={55}/>
        <div className='w-full lg:max-w-[65%] flex flex-col items-center lg:items-start'>
          <h2 className='font-bold text-md text-[#e1fffe] md:text-lg'>Confidence Booster</h2>
          <p className='font-light text-[#e1fffe] text-sm md:text-md text-center lg:text-start'>Ace your mock interviews and boost your confidence for real ones.</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-3 items-center'>
        <Image src={'/assets/feedback.png'} alt='feedback' width={55} height={55}/>
        <div className='w-full lg:max-w-[65%] flex flex-col items-center lg:items-start'>
          <h2 className='font-bold text-md md:text-lg text-[#e1fffe]'>Quality Feedback</h2>
          <p className='text-center lg:text-start font-light text-sm md:text-md text-[#e1fffe]'>Receive detailed feedback to improve your interview performance.</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-3 items-center'>
        <Image src={'/assets/fireflame.png'} alt='fire' width={55} height={55}/>
        <div className='w-full lg:max-w-[65%] flex flex-col items-center lg:items-start'>
          <h2 className='font-bold text-md text-[#e1fffe] md:text-lg'>Less Pressure</h2>
          <p className='text-center lg:text-start font-light text-[#e1fffe] text-sm md:text-md'>Practice without pressure and enhance your interview skills.</p>
        </div>
      </div>

    </div>
    <hr className='border-[#e1fffe]'/>

    <div id="faq">
        <FaqSection />
    </div>

      </div>

      {/* thired section pricing*/}


    </div>
    {/* footer section */}
    <footer className="bg-[#0a7a77] text-[#e1fffe] py-6">
      <div className="max-w-[85%] mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Image src={'/assets/FullLogo.png'} alt="Full Logo" width={150} height={150} />
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
        <div className="flex flex-col items-center lg:items-end gap-3">
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <Image src={'/assets/apple-store.png'} alt="Download on Apple Store" width={120} height={40} />
          </a>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <Image src={'/assets/play-store.png'} alt="Download on Play Store" width={120} height={40} />
          </a>
        </div>
      </div>
      <hr className="border-[#e1fffe] my-4" />
      <div className="text-center text-sm">
        © {new Date().getFullYear()} MockMate. All rights reserved.
      </div>
    </footer>
    </>
  )
}
