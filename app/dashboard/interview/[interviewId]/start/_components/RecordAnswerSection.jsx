"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { MicIcon, StopCircle, WebcamIcon } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import moment from 'moment/moment'

const RecordAnswerSection = ({ mockInterviewQstn, activeQstnIdx, interviewData,setActiveQstnIdx,handleEndInterview }) => {

  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results?.map((result) => {
      setUserAnswer((prev) => prev + result?.transcript);
    })
  }, [results])

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer()
    }
    {/*if (userAnswer?.length < 10) {
      setLoading(false)
        toast('Error while saving answer, please record again',)
        return;
      } */}
  }, [userAnswer])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Failed to access media devices:', error);
      alert("Please give permission to access camera and microphone.");
    }
  };

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    }
    else {
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async () => {
    console.log(userAnswer)
    setLoading(true)
    const feedbackPrompt = "Question:" + mockInterviewQstn[activeQstnIdx]?.question + ", User Answer:" + userAnswer + ",Depends on question and user answer for give interview question" +
      "please give us rating for answer and feedback as a area of improvement if any" +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feeback field"

    const result = await chatSession.sendMessage(feedbackPrompt)
    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
    console.log(mockJsonResp)
    const JsonFeedbackResp = JSON.parse(mockJsonResp)

    const resp = await db.insert(UserAnswer) 
      .values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQstn[activeQstnIdx]?.question,
        correctAns: mockInterviewQstn[activeQstnIdx]?.answer,
        userAns:userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy")
      })

    if (resp) {
      toast('User Answer recorded successfully')
      setUserAnswer('')
      setResults([])
    }
    setResults([])
    setLoading(false)

  }

  return (
    <div className='flex justify-arround mt-8 flex-col items-center'>
      <div className='flex flex-col mt-1 justify-center bg-black items-center rounded-lg p-5'>
        <WebcamIcon width={200} height={200} className='absolute  bg-black text-[#0a7a77] shadow' />
        <Webcam style={{ height: 300, width: '100%', zIndex: 10 }} mirrored={true} />
      </div>
      <Button disabled={loading} className='my-10' variant='outline' onClick={StartStopRecording}>
        {isRecording ?
          <h2 className=' animate-pulse text-red-600 flex items-center'><StopCircle />Stop Recording</h2>
          :
          <h2 className=' animate-pulse text-primary flex items-center'><MicIcon />Record Answer</h2>
        }
      </Button>
      {/* <Button onClick={() => console.log(userAnswer)}>Show User answer</Button> */}
       {/* Navigation Buttons */}
      <div className='flex justify-center w-full gap-5' style={{marginTop: '-1rem'}}>
        {activeQstnIdx > 0 &&
          <Button onClick={() => setActiveQstnIdx(activeQstnIdx - 1)}>Previous Question</Button>
        }

        {activeQstnIdx !== mockInterviewQstn?.length - 1 &&
          <Button className='bg-[#0a7a77] cursor-pointer hover:bg-[#0a5a55]' onClick={() => setActiveQstnIdx(activeQstnIdx + 1)}>Next Question</Button>
        }

        {activeQstnIdx === mockInterviewQstn?.length - 1 &&
          <Button onClick={handleEndInterview} className='bg-[#0a7a77] cursor-pointer hover:bg-[#0a5a55]'>End Interview</Button>
        }
      </div>
      
    </div>
  )
}

export default RecordAnswerSection