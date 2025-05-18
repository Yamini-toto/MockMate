'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Link } from 'lucide-react';
const StartInterview = ({ params }) => {

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQstn, setmockInterviewQstn] = useState();
  const [activeQstnIdx, setActiveQstnIdx] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  //getting interview details
  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log("Parsed jsonMockResp:", jsonMockResp);
    setmockInterviewQstn(jsonMockResp.interviewQuestions);
    setInterviewData(result[0]);
  }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* question */}
        <QuestionSection mockInterviewQstn={mockInterviewQstn} activeQstnIdx={activeQstnIdx} setActiveQstnIdx={setActiveQstnIdx} />

        {/* video / Audio recording */}
        <RecordAnswerSection
          mockInterviewQstn={mockInterviewQstn} activeQstnIdx={activeQstnIdx} interviewData={interviewData}
        />
      </div>
      <div className='flex justify-end gap-6'>
        {activeQstnIdx > 0 &&
          <Button onClick={() => setActiveQstnIdx(activeQstnIdx - 1)}>Previous Question</Button>
        }
        {activeQstnIdx != mockInterviewQstn?.length - 1 &&
          <Button onClick={() => setActiveQstnIdx(activeQstnIdx + 1)}>Next Question</Button>
        }
        {activeQstnIdx == mockInterviewQstn?.length - 1 &&
          <Link href={'/dashboard/interview'+interviewData?.mockId+"/feedback"}>
            <Button>End Interview</Button>
          </Link>
        }
      </div>
    </div>
  )
}

export default StartInterview