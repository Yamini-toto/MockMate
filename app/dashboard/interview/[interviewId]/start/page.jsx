'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import {eq} from 'drizzle-orm';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
const StartInterview = ({params}) => {

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQstn, setmockInterviewQstn] = useState();
  const [activeQstnIdx, setActiveQstnIdx] = useState(0);

  useEffect(()=>{
    GetInterviewDetails();
  },[]);

  //getting interview details
    const GetInterviewDetails = async () => {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setmockInterviewQstn(jsonMockResp[0]);
      setInterviewData(result[0]);
    }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      {/* question */}
      <QuestionSection mockInterviewQstn={mockInterviewQstn} activeQstnIdx={activeQstnIdx}/>

      {/* video / Audio recording */}
      <RecordAnswerSection />
      </div>
    </div>
  )
}

export default StartInterview