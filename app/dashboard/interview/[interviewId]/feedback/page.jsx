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
    <div className="min-h-screen bg-[#0a7a77] p-4 md:p-8 lg:p-10 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-[#e1fffe] rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <img src="/assets/feedback.png" alt="Feedback" className="w-20 h-20 mb-2" />
          <h2 className="text-3xl font-bold text-[#0a7a77]">Congratulations!</h2>
          <h2 className="font-bold text-xl text-[#0a3d62]">Here is your interview feedback</h2>
          <h2 className="text-lg text-[#0a7a77] my-2">
            Your overall interview rating: <strong>{averageRating}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500 mb-2 text-center">
            Below are the interview questions with your answer, the correct answer, and feedback for improvement:
          </h2>
        </div>
        <div className="grid gap-6">
          {feedbackList && feedbackList.length > 0 ? (
            feedbackList.map((item, index) => (
              <div key={index} className="rounded-xl border border-[#0a7a77] bg-white shadow p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#0a3d62]">Q{index + 1}: {item.question}</span>
                    <span className="text-xs bg-[#C3FF93] text-[#0a3d62] px-2 py-1 rounded font-bold">Rating: {item.rating}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-[#e1fffe] rounded p-2 text-sm text-[#0a3d62] border">
                      <strong>Your Answer:</strong> {item.userAns}
                    </div>
                    <div className="bg-[#C3FF93] rounded p-2 text-sm text-[#0a3d62] border">
                      <strong>Correct Answer:</strong> {item.correctAns}
                    </div>
                  </div>
                  <div className="bg-[#0a7a77] rounded p-2 text-sm text-[#e1fffe] border mt-2">
                    <strong>Feedback:</strong> {item.feedback}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-[#0a3d62] font-semibold py-10">No feedback for this interview.</div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={() => router.replace('/dashboard')} className="bg-[#0a7a77] text-[#e1fffe] hover:bg-[#0a3d62] px-6 py-2 rounded-full font-semibold shadow">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
