"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { MicIcon } from 'lucide-react'
import { toast } from 'sonner'
const RecordAnswerSection = () => {

  const [userAnswer, setUserAnswer] = useState('');

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((result)=>{
      setUserAnswer((prev)=>prev + result?.transcript);
    })
  },[results])

  const SaveUserAnswer = () => {
    if(isRecording){
      stopSpeechToText();
      if(userAnswer.length < 10){
        toast('Error while saving answer, please try again', )
        return;
      }

      const feedbackPrompt = "Question:"
    }else{
      startSpeechToText();
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
    <div className='flex flex-col mt-20 justify-center bg-black items-center rounded-lg p-5'>
      <Image src={'/assets/Webcam.png'} width={200} height={200} className='absolute'/>
      <Webcam style={{height:300, width:'100%', zIndex:10}} mirrored={true}/>
    </div>
      <Button className={'my-10'} variant={'outline'} onClick={SaveUserAnswer}>

      {isRecording ? 
      <h2 className='text-red-600 flex gap-2'>
        <MicIcon />Stop Recording
      </h2> 
      : 
      'Start Recording'}
      </Button>

    </div>
  )
}

export default RecordAnswerSection