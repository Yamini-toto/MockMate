"use client"
import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'


const QuestionSection = ({mockInterviewQstn, activeQstnIdx}) => {
var window = globalThis || {};
  const textToSpeak = (text) => {
    if('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      window.speechSynthesis.speak(msg);
    }else{
      alert('Sorry, your browser does not support text to speech!')
    }
  }

  return (
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {mockInterviewQstn && mockInterviewQstn.map((question, index) => {
            return <h2 className={`${activeQstnIdx==index && 'bg-primary text-white'} p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer`}>Question #{index+1}</h2>
          })}
          <h2 className='my-5 text-md md:text-lg'>{mockInterviewQstn[activeQstnIdx]?.question}</h2>

          <Volume2  className='cursor-pointer' onClick={()=>textToSpeak(mockInterviewQstn[activeQstnIdx]?.question)}/>

          <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-primary'>
              <Lightbulb />
              <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
          </div>
        </div>
    </div>
  )
}

export default QuestionSection