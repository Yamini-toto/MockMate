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
      <Button className={'my-10'} variant={'outline'}>Record Answer</Button>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  )
}

export default RecordAnswerSection