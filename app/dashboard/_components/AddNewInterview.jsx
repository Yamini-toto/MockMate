"use client"

import { useState } from 'react'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LoaderCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { chatSession } from '@/utils/GeminiAIModel'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'


const AddNewInterview = () => {
  const [OpenDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState()
  const [jobDesc, setJobDesc] = useState()
  const [jobExperience, setJobExperience] = useState()
  const [loading, setLoading] = useState(false)
  const [jsonResponse, setJsonResponse] = useState([])
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(jobPosition, jobDesc, jobExperience)

    const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience + ", Depends on Job Position, Job Description & Years of Experience give us " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " interview questions along with their answers in JSON format "

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdAt: moment().format('DD-MM-yyyy'),
        createdBy: user?.primaryEmailAddress?.emailAddress
      }).returning({ mockId: MockInterview.mockId })

      console.log("Inserted ID:", resp);
      if(resp){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId);
      }
    } else {
      console.log("error")
    } 
     setLoading(false)
  }

  return (
    <div>
      <div
        className='p-10 border-2 border-[#0a7a77] rounded-2xl bg-white hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[120px] max-w-xs mx-auto shadow-md'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='font-bold text-2xl text-[#0a7a77] mb-1'>+ Add New</h2>
      </div>
      <Dialog open={OpenDialog}>
        <DialogContent className='max-w-2xl rounded-2xl border-2 border-[#0a7a77] bg-white shadow-2xl'>
          <DialogHeader>
            <DialogTitle className="font-bold text-3xl text-[#0a7a77] mb-2">Tell us more about your job interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
                <div>
                  <h2 className="text-[#0a3d62] font-semibold mb-2">Add details about your job position/role, job description, and years of experience</h2>
                  <div className='mt-7 my-3'>
                    <label className="block text-[#0a7a77] font-medium mb-1">Job Role/Job Position</label>
                    <Input placeholder="Ex. Full Stack Developer" required
                      className="rounded-lg bg-white border-[#0a7a77] focus:border-[#0a7a77] focus:ring-2 focus:ring-[#0a7a77] focus:outline-[#0a7a77]"
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className='my-3'>
                    <label className="block text-[#0a7a77] font-medium mb-1">Job Description/Tech Stack (In Short)</label>
                    <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc" required
                      className="rounded-lg bg-white border-[#0a7a77] focus:border-[#0a7a77] focus:ring-2 focus:ring-[#0a7a77] focus:outline-[#0a7a77]"
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className='my-3'>
                    <label className="block text-[#0a7a77] font-medium mb-1">Years of Experience</label>
                    <Input placeholder="Ex. 5" type='number' max="50" required
                      className="rounded-lg bg-white border-[#0a7a77] focus:border-[#0a7a77] focus:ring-2 focus:ring-[#0a7a77] focus:outline-[#0a7a77]"
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex gap-5 justify-end mt-4'>
                  <Button type="button" variant="ghost" className="rounded-full px-6 py-2 text-[#0a7a77] border border-[#0a7a77] hover:bg-[#C3FF93]/40 focus:ring-2 focus:ring-[#0a7a77] focus:outline-[#0a7a77]" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading} className="rounded-full px-6 py-2 bg-[#0a7a77] text-[#e1fffe] hover:bg-[#06514e] font-semibold shadow-md focus:ring-2 focus:ring-[#0a7a77] focus:outline-[#0a7a77]">
                    {loading ?
                      <>
                        <LoaderCircle className='animate-spin mr-2' />Generating from AI
                      </> :
                      'Start Interview'
                    }
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
