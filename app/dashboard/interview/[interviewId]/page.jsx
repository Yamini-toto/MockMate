"use client"

import { Button } from "@/components/ui/button"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { Lightbulb } from "lucide-react"
import Link from "next/link"
import { useEffect,useState } from "react"
import Webcam from "react-webcam"
import {eq} from "drizzle-orm"
import { WebcamIcon } from "lucide-react"
const Interview = ({params}) => {
  const [interviewData, setInterviewData] = useState({});
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  useEffect(()=>{
    GetInterviewDetails();
  },[])
//getting interview details
  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
    setInterviewData(result[0]);
  }
  return (
    <div className="mt-10 mb-15 pb-10 px-2 md:px-8">
      <h2 className="font-bold text-3xl text-[#0a7a77] mb-6 text-center md:text-left">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Interview Info & Tips */}
        <div className="flex flex-col my-5 gap-6">
          <div className="flex flex-col p-6 rounded-2xl border-2 border-[#0a7a77] bg-[#0a7a77] shadow-md gap-4">
            <h2 className="text-lg text-[#e1fffe]"><strong>Job Role / Job Position :</strong> {interviewData.jobPosition}</h2>
            <h2 className="text-lg text-[#e1fffe]"><strong>Job Description / Tech Stack :</strong> {interviewData.jobDesc}</h2>
            <h2 className="text-lg text-[#e1fffe]"><strong>Years Of Experience : </strong>{interviewData.jobExperience}</h2>
          </div>
          <div className="p-6 border-2 border-[#fbbf24] rounded-2xl bg-yellow-50 shadow flex flex-col gap-2">
            <h2 className="flex gap-2 items-center text-yellow-600 font-semibold text-lg"><Lightbulb/><span>Information</span></h2>
            <h2 className="mt-2 text-yellow-700 text-base">{process.env.NEXT_PUBLIC_STARTMOCK_INFORMATION}</h2>
          </div>
        </div>
        {/* Right: Webcam Section */}
        <div className="flex flex-col items-center justify-center mt-[-6px] gap-6">
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              style={{ height: 300, width: 550, borderRadius: '1rem', background: '#e1fffe', boxShadow: '0 4px 24px 0 #0a7a7715' }}
              mirrored={true}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <WebcamIcon className='h-72 my-7 w-full p-16  rounded-2xl border-2 border-[#0a7a77] bg-black text-[#0a7a77] shadow' />
              <Button variant='ghost' className="mt-2 rounded-full px-6 py-2 border-2 border-[#0a7a77] text-[#0a7a77] hover:bg-[#C3FF93]/40 focus:ring-2 focus:ring-[#0a7a77] focus:outline-[#0a7a77] font-semibold w-full max-w-xs" onClick={()=>setWebcamEnabled(true)}>
                Enable Webcam and Microphone
              </Button>
            </div>
          )}
          <Link href={`/dashboard/interview/${params.interviewId}/start`} className="w-full flex justify-center">
            <Button className="mt-4 rounded-full px-8 py-3 bg-[#0a7a77] text-[#e1fffe] hover:bg-[#06514e] font-semibold shadow-md focus:ring-2 focus:ring-[#0a7a77] focus:outline-[#0a7a77] text-lg w-full max-w-xs">
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Interview