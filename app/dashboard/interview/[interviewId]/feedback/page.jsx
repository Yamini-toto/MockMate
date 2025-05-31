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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Dummy data for preview
  // const dummyFeedback = [
  //   {
  //     question: "What is React?",
  //     userAns: "A JavaScript library for building UIs.",
  //     correctAns: "A JavaScript library for building user interfaces, maintained by Facebook.",
  //     feedback: "Good answer! You could mention it's maintained by Facebook for extra detail.",
  //     rating: 8
  //   },
  //   {
  //     question: "Explain SQL Joins.",
  //     userAns: "They combine rows from two or more tables.",
  //     correctAns: "SQL joins are used to combine rows from two or more tables, based on a related column.",
  //     feedback: "Nice! Try to mention the types of joins (INNER, LEFT, RIGHT, FULL) for a complete answer.",
  //     rating: 7
  //   },
  //   {
  //     question: "What is useState in React?",
  //     userAns: "A hook to manage state in a function component.",
  //     correctAns: "A React hook that lets you add state to function components.",
  //     feedback: "Correct! You can also mention that it returns a stateful value and a function to update it.",
  //     rating: 9
  //   }
  // ];

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a7a77] flex items-center justify-center">
        <div className="text-2xl text-[#e1fffe] font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a7a77] p-4 md:p-8 lg:p-10 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-[#e1fffe] rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        {feedbackList && feedbackList.length > 0 ? (
          <>
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
              {feedbackList.map((item, index) => (
                <div key={index} className="rounded-xl border border-[#0a7a77] bg-white shadow p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[#0a3d62]">Q{index + 1}: {item.question}</span>
                      <span className="text-xs bg-[#C3FF93] text-[#0a3d62] px-2 py-1 rounded font-bold">Rating: {item.rating}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-[#e1fffe] rounded p-2 text-sm text-[#0a3d62] border max-h-32 overflow-y-auto custom-scrollbar">
                        <strong>Your Answer:</strong> {item.userAns}
                      </div>
                      <div className="bg-[#C3FF93] rounded p-2 text-sm text-[#0a3d62] border max-h-32 overflow-y-auto custom-scrollbar">
                        <strong>Correct Answer:</strong> {item.correctAns}
                      </div>
                    </div>
                    <div className="bg-[#0a7a77] rounded p-2 text-sm text-[#e1fffe] border mt-2">
                      <strong>Feedback:</strong> {item.feedback}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="text-center text-lg text-[#0a3d62] font-semibold py-10">No feedback for this interview.</div>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <Button onClick={() => router.replace('/dashboard')} className="bg-[#0a7a77] text-[#e1fffe] hover:bg-[#0a3d62] px-6 py-2 rounded-full font-semibold shadow">
            Go Home
          </Button>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #e1fffe;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0a7a77;
          border-radius: 8px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #0a7a77 #e1fffe;
        }
      `}</style>
    </div>
  );
}

export default Feedback;
