import React from 'react'
import Header from './_components/Header';

function DashboardLayout({children}) {
  return (
    <div>
        <Header/>
        <div className='mx-5 md:mx-20 lg:mx-36'>
        {children}
        </div>
       			<footer className="w-full py-4 text-center text-gray-400 text-xs border-t bg-white/80 mt-auto">
				&copy; {new Date().getFullYear()} MockMate. All rights reserved.
			</footer>
    </div>
  )
}

export default DashboardLayout;
