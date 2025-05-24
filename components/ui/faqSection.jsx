"use client"; 

import { useState } from "react";
import { ChevronDown } from "lucide-react"; 
import faqData from "@/utils/faqData";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className= " py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#e1fffe]">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-xl overflow-hidden bg-[#e1fffe] shadow-md">
            <button
              onClick={() => toggleQuestion(index)}
              className="flex items-center justify-between w-full p-6 text-left"
            >
              <span className="text-lg font-semibold">{item.question}</span>
              <ChevronDown
                className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-700">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
