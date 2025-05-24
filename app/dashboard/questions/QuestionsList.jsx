"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ChevronDown } from "lucide-react";
import moment from "moment";

const QuestionsList = () => {
  const { user } = useUser();
  const [interviews, setInterviews] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState({}); // {interviewId: idx}
  const [search, setSearch] = useState("");
  const [recentOnly, setRecentOnly] = useState(false);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    const interviewList = await db.select().from(MockInterview).where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress));
    setInterviews(interviewList);
    const answerList = await db.select().from(UserAnswer).where(eq(UserAnswer.userEmail, user.primaryEmailAddress.emailAddress));
    setAnswers(answerList);
    setLoading(false);
  };

  // Filtering logic
  let filteredInterviews = interviews;
  if (search) {
    filteredInterviews = filteredInterviews.filter((interview) =>
      interview.jobPosition?.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (recentOnly) {
    filteredInterviews = [...filteredInterviews].sort((a, b) => {
      const dateA = moment(a.createdAt, ["DD-MM-YYYY", "DD-MM-YY", moment.ISO_8601], true);
      const dateB = moment(b.createdAt, ["DD-MM-YYYY", "DD-MM-YY", moment.ISO_8601], true);
      if (!dateA.isValid() && !dateB.isValid()) return 0;
      if (!dateA.isValid()) return 1;
      if (!dateB.isValid()) return -1;
      return dateB.valueOf() - dateA.valueOf();
    });
  }

  if (loading) return <div className="text-center py-10 text-[#e1fffe]">Loading...</div>;
  if (!interviews.length) return <div className="text-center py-10 text-[#e1fffe]">No interviews found.</div>;

  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#e1fffe] tracking-widest">YOUR INTERVIEW QUESTIONS</h2>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="flex gap-2 items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Role/Title..."
            className="rounded-full px-4 py-2 bg-[#e1fffe] text-[#0a3d62] placeholder:text-[#0a3d62] border-none focus:ring-2 focus:ring-[#0a3d62] w-full md:w-64 shadow"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <input
            id="recentOnly"
            type="checkbox"
            checked={recentOnly}
            onChange={e => setRecentOnly(e.target.checked)}
            className="accent-[#0a7a77] w-5 h-5 rounded-full border-2 border-[#0a3d62]"
          />
          <label htmlFor="recentOnly" className="text-[#e1fffe] font-semibold select-none cursor-pointer">Show Most Recent First</label>
        </div>
      </div>
      <div className="space-y-10">
        {filteredInterviews.map((interview, i) => {
          const thisInterviewAnswers = answers.filter(ans => ans.mockIdRef === interview.mockId);
          let questions = [];
          try {
            questions = JSON.parse(interview.jsonMockResp)?.interviewQuestions || [];
          } catch {}
          return (
            <div key={interview.mockId}>
              <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-2xl text-[#e1fffe] tracking-wider">{interview.jobPosition?.toUpperCase()}</span>
                  {interview.yearsOfExperience && (
                    <span className="ml-2 text-sm text-[#C3FF93] font-semibold">{interview.yearsOfExperience} yrs exp</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="ml-2 text-xs text-gray-300">({interview.createdAt})</span>
                  <a
                    href={`/dashboard/interview/${interview.mockId}/feedback`}
                    className="ml-4 px-3 py-1 rounded bg-[#0a3d62] text-[#e1fffe] font-semibold text-xs hover:bg-[#0a7a77] transition-colors shadow"
                  >
                    Feedback
                  </a>
                </div>
              </div>
              <hr className="border-t-2 border-[#e1fffe] mb-6" />
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const answerObj = thisInterviewAnswers.find(a => a.question === q.question);
                  const isOpen = open[`${interview.mockId}-${idx}`];
                  return (
                    <div key={interview.mockId + idx} className="border rounded-xl overflow-hidden bg-[#e1fffe] shadow-md">
                      <button
                        onClick={() => setOpen((prev) => ({ ...prev, [`${interview.mockId}-${idx}`]: !isOpen }))}
                        className="flex items-center justify-between w-full p-6 text-left"
                      >
                        <span className="text-lg font-semibold text-[#0a3d62]">Q{idx + 1}: {q.question}</span>
                        <ChevronDown
                          className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-gray-700 space-y-2">
                          <div><span className="font-semibold">Gemini's Answer:</span> {q.answer ? q.answer : <span className="italic text-gray-400">No answer available</span>}</div>
                          {answerObj && (
                            <div><span className="font-semibold">Your Answer:</span> {answerObj.userAns}</div>
                          )}
                          {answerObj && answerObj.feedback && (
                            <div className="text-xs text-yellow-700"><span className="font-semibold">Feedback:</span> {answerObj.feedback}</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuestionsList;
