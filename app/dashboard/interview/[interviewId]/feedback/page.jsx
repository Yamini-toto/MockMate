'use client'
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);

    if (result.length > 0) {
      const total = result.reduce((sum, item) => {
        const rating = Math.min(Number(item.rating) || 0, 10); // ensure rating is max 10
        return sum + rating;
      }, 0);

      let average = (total / result.length);
      average = average > 10 ? 10 : average; // cap final average at 10

      setAverageRating(average.toFixed(1));
    } else {
      setAverageRating('0.0');
    }
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-blue-800 text-lg my-3'>
        Your overall interview rating: <strong>{averageRating}/10</strong>
      </h2>

      <h2 className='text-sm text-gray-500 mb-6'>
        Below are the interview questions with your answer, the correct answer, and feedback for improvement:
      </h2>

      {feedbackList && feedbackList.map((item, index) => (
        <Collapsible key={index} className='mt-7'>
          <CollapsibleTrigger className='p-2 bg-gray-200 rounded-lg flex justify-between items-center text-left w-full'>
            <span>{item.question}</span>
            <ChevronsUpDown className='h-5 w-5' />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-2 mt-2'>
              <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong> {item.rating}</h2>
              <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong> {item.userAns}</h2>
              <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:</strong> {item.correctAns}</h2>
              <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-800'><strong>Feedback:</strong> {item.feedback}</h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      <div className='mt-8'>
        <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
      </div>
    </div>
  );
}

export default Feedback;
