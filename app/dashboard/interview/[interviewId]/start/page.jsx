'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import QuestionSection from './_components/QuestionSection';
import dynamic from 'next/dynamic'; // for dynamic import
import { useRouter } from 'next/navigation'; // programmatic routing

// Dynamically import component to avoid navigator error
const RecordAnswerSection = dynamic(() => import('./_components/RecordAnswerSection'), {
  ssr: false,
});

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQstn, setmockInterviewQstn] = useState();
  const [activeQstnIdx, setActiveQstnIdx] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setmockInterviewQstn(jsonMockResp.interviewQuestions);
    setInterviewData(result[0]);
  }

  const handleEndInterview = () => {
    if (interviewData?.mockId) {
      router.push(`/dashboard/interview/${interviewData.mockId}/feedback`);
    }
  };

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Question Section */}
        <QuestionSection
          mockInterviewQstn={mockInterviewQstn}
          activeQstnIdx={activeQstnIdx}
          setActiveQstnIdx={setActiveQstnIdx}
        />

        {/* Video/Audio Recording Section */}
        <RecordAnswerSection
          mockInterviewQstn={mockInterviewQstn}
          activeQstnIdx={activeQstnIdx}
          interviewData={interviewData}
        />
      </div>

      {/* Navigation Buttons */}
      <div className='flex justify-end gap-6 mt-6'>
        {activeQstnIdx > 0 &&
          <Button onClick={() => setActiveQstnIdx(activeQstnIdx - 1)}>Previous Question</Button>
        }

        {activeQstnIdx !== mockInterviewQstn?.length - 1 &&
          <Button onClick={() => setActiveQstnIdx(activeQstnIdx + 1)}>Next Question</Button>
        }

        {activeQstnIdx === mockInterviewQstn?.length - 1 &&
          <Button onClick={handleEndInterview}>End Interview</Button>
        }
      </div>
    </div>
  )
}

export default StartInterview;
