"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setMenuOpen(false); 
  }, [path]);

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <>
      <div className='flex p-2 items-center justify-between bg-secondary shadow-sm relative'>
        <Image src={'/assets/MockMate.png'} className='hidden md:block' width={100} height={40} alt='logo' />
        <Image src={'/assets/FullLogo.png'} className='block md:hidden' width={80} height={30} alt='mobile-logo' />
        <ul className='hidden md:flex gap-6'>
          <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-blue-800 font-bold'}`}>Dashboard</li>
          <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-blue-800 font-bold'}`}>Questions</li>
          <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-blue-800 font-bold'}`}>Upgrade</li>
          <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-blue-800 font-bold'}`}>How it Works?</li>
        </ul>
        <div className='flex items-center gap-4'>
          <div className='hidden md:block'>
            <UserButton />
          </div>
          <div className="md:hidden z-50">
            {menuOpen ? (
              <X className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(false)} />
            ) : (
              <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <ul className="absolute top-20 left-0 w-full bg-secondary flex flex-col items-center gap-4 py-4 md:hidden z-40 shadow-lg">
          <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>Dashboard</li>
          <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>Questions</li>
          <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>Upgrade</li>
          <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>How it Works?</li>
        </ul>
      )}
    </>
  )
}

export default Header
