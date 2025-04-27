"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();
  const { isSignedIn } = useUser();

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  return (
    <>
      <div className="bg-[#F8FEFE] pt-2 px-6 md:px-20 shadow-md flex justify-between items-center relative">
        {/* Logo */}
        <Image src={'/assets/FullLogo.png'} className="hidden md:block" width={100} height={40} alt="logo" />
        <Image src={'/assets/FullLogo.png'} className="block md:hidden" width={65} height={30} alt="mobile-logo" />

        {/* Middle Links */}
        <ul className="hidden md:flex gap-6">
          {path === '/' ? (
            <>
              <li className="hover:text-blue-800 hover:font-bold transition-all cursor-pointer">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-blue-800 hover:font-bold transition-all cursor-pointer">
                <Link href="/faq">FAQ</Link>
              </li>
              <li className="hover:text-blue-800 hover:font-bold transition-all cursor-pointer">
                <Link href="/pricing">Pricing</Link>
              </li>
            </>
          ) : (
            <>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-blue-800 font-bold'}`}>
                <Link href="/">Home</Link>
              </li>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-blue-800 font-bold'}`}>
                <Link href="/dashboard/questions">Questions</Link>
              </li>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-blue-800 font-bold'}`}>
                <Link href="/dashboard/upgrade">Upgrade</Link>
              </li>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-blue-800 font-bold'}`}>
                <Link href="/dashboard/how">How It Works?</Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className="hidden md:block hover:text-blue-800 hover:font-bold transition-all cursor-pointer">
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/sign-in">
                <button className="hover:cursor-pointer hover:bg-[#b7c0c0] border border-gray-300 px-4 py-1 rounded-md">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="hover:cursor-pointer hover:bg-[#b7c0c0] border border-gray-300 px-4 py-1 rounded-md">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {/* Hamburger Menu */}
          <div className="md:hidden z-50">
            {menuOpen ? (
              <X className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(false)} />
            ) : (
              <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="absolute top-20 left-0 w-full bg-[#F8FEFE] bg-opacity-90 backdrop-blur-md flex flex-col items-center gap-4 py-4 md:hidden z-40 shadow-lg">
          {path === '/' ? (
            <>
              <li className="hover:text-blue-800 hover:font-bold transition-all cursor-pointer" onClick={() => setMenuOpen(false)}>
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-blue-800 hover:font-bold transition-all cursor-pointer" onClick={() => setMenuOpen(false)}>
                <Link href="/faq">FAQ</Link>
              </li>
              <li className="hover:text-blue-800 hover:font-bold transition-all cursor-pointer" onClick={() => setMenuOpen(false)}>
                <Link href="/pricing">Pricing</Link>
              </li>
            </>
          ) : (
            <>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>
                <Link href="/">Home</Link>
              </li>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>
                <Link href="/dashboard/questions">Questions</Link>
              </li>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>
                <Link href="/dashboard/upgrade">Upgrade</Link>
              </li>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>
                <Link href="/dashboard/how">How It Works?</Link>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default Header;
