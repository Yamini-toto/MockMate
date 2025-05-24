"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardStats = () => {
  const { user } = useUser();
  const [answers, setAnswers] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Proficiency by field (jobDesc)
  const fieldStats = {};
  interviews.forEach((interview) => {
    const field = interview.jobDesc;
    if (!fieldStats[field]) fieldStats[field] = { total: 0, sum: 0 };
    const relatedAnswers = answers.filter((a) => a.mockIdRef === interview.mockId);
    relatedAnswers.forEach((a) => {
      const rating = parseInt(a.rating) || 0;
      fieldStats[field].total += 1;
      fieldStats[field].sum += rating;
    });
  });
  const fieldLabels = Object.keys(fieldStats);
  const fieldData = fieldLabels.map((f) =>
    fieldStats[f].total ? Math.round(fieldStats[f].sum / fieldStats[f].total) : 0
  );

  // Only show fields with at least one non-zero rating
  const hasFieldData = fieldLabels.length > 0 && fieldData.some(val => val > 0);

  // Answer quality breakdown
  const good = answers.filter(a => parseInt(a.rating) >= 7).length;
  const average = answers.filter(a => parseInt(a.rating) >= 4 && parseInt(a.rating) < 7).length;
  const poor = answers.filter(a => parseInt(a.rating) < 4).length;

  return (
    <div className="flex flex-col gap-8 my-8 w-full">
      {/* Proficiency Graph */}
      <div className="bg-[#e1fffe] rounded-xl shadow p-6 w-full">
        <h3 className="font-bold text-lg mb-2 text-[#0a3d62]">Proficiency by Role</h3>
        {hasFieldData ? (
          <Bar
            data={{
              labels: fieldLabels,
              datasets: [
                {
                  label: "Avg. Rating",
                  data: fieldData,
                  backgroundColor: "#0a7a77",
                  borderRadius: 8,
                },
              ],
            }}
            options={{
              responsive: true,
              animation: { duration: 1200, easing: "easeOutBounce" },
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
              scales: {
                y: { min: 0, max: 10, ticks: { stepSize: 1 } },
              },
            }}
            height={110}
          />
        ) : (
          <div className="text-center text-gray-400 py-8 text-lg font-semibold">No data to show</div>
        )}
      </div>
      {/* Answer Quality Report */}
      <div className="bg-[#e1fffe] rounded-xl shadow p-6 w-full flex flex-col items-center justify-center">
        <h3 className="font-bold text-lg mb-4 text-[#0a3d62]">Your Interview Report</h3>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#0a7a77]">{interviews.length || 0}</span>
            <span className="text-xs text-gray-500">Total Interviews</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#0a7a77]">{answers.length || 0}</span>
            <span className="text-xs text-gray-500">Questions Answered</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#0a7a77]">{answers.length ? (answers.reduce((acc, a) => acc + (parseInt(a.rating) || 0), 0) / answers.length).toFixed(1) : "-"}</span>
            <span className="text-xs text-gray-500">Avg. Rating</span>
          </div>
        </div>
        <div className="mt-6 w-full text-center">
          {answers.length ? (
            <span className="text-md font-semibold text-[#0a3d62]">
              {(() => {
                const avg = answers.reduce((acc, a) => acc + (parseInt(a.rating) || 0), 0) / answers.length;
                if (avg >= 7) return "Great job! You're well prepared for interviews.";
                if (avg >= 4) return "Keep practicing to improve your answers.";
                return "Focus on your weak areas and review the feedback for better results.";
              })()}
            </span>
          ) : (
            <span className="text-md text-gray-400">No interview data yet. Start a mock interview to see your report!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
