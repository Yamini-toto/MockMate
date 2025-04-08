import { SignUp } from '@clerk/nextjs'
import Image from 'next/image';
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="flex max-w-5xl w-full bg-[#1E1E2F] rounded-3xl shadow-lg overflow-hidden my-auto">
        {/* Left side - Image and text */}
        <div className="hidden md:flex flex-col justify-between items-center bg-[#27293D] p-10 w-1/2 relative">
            <div className='h-full rounded-xl flex overflow-hidden'>
            <Image
              src="/assets/AIMock.jpg" // Replace with your actual image
              alt="Login illustration"
              width={600}
              height={600}
              className="rounded-xl"
            />
            </div>
          </div>

        {/* Right side - Clerk Sign In */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-[#1E1E2F] p-10">
         <SignUp />
        </div>
      </div>
    </div>
  );
}