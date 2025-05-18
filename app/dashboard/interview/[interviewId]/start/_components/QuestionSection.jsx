"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQstn, activeQstnIdx, setActiveQstnIdx}) => {
  const textToSpeak = (text) => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = "en-US";
      window.speechSynthesis.speak(msg);
    } else {
      alert("Sorry, your browser does not support text to speech!");
    }
  };

  // Handle loading or invalid data
  if (!Array.isArray(mockInterviewQstn) || mockInterviewQstn.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = mockInterviewQstn[activeQstnIdx];

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {mockInterviewQstn.map((question, index) => (
      <h2
        key={index}
        className={`${
          activeQstnIdx === index ? "bg-white text-black" : ""
        } p-2 bg-blue-500 rounded-full text-xs md:text-sm text-center cursor-pointer`}
        onClick={() => setActiveQstnIdx(index)} 
      >
        Question #{index + 1}
      </h2>
        ))}
      </div>

      {/* Current Question */}
      <div className="mt-5">
        <h2 className="text-md md:text-lg">{currentQuestion?.question}</h2>
        <Volume2 size={25}
          className="cursor-pointer mt-4"
          onClick={() => textToSpeak(currentQuestion?.question)}
        />
      </div>

      {/* Note Section */}
      <div className="border rounded-lg p-5 bg-blue-100 mt-10">
        <h2 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || "Answer confidently and be concise."}
        </h2>
      </div>
    </div>
  );
};

export default QuestionSection;
