"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const path = usePathname();
  const { isSignedIn } = useUser();
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAtTop(currentScrollY < 10);
      if (currentScrollY < 10) {
        setShowNav(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY > lastScrollY.current) {
        setShowNav(false); // scrolling down
      } else {
        setShowNav(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`${atTop ? '' : 'fixed top-0 left-0 w-full z-50 transition-transform duration-300'} ${!atTop && (showNav ? 'translate-y-0' : '-translate-y-full')}`} style={{willChange: !atTop ? 'transform' : undefined}}>
        <div className="backdrop-blur-md bg-white/70 dark:bg-[#0a7a77]/80 border border-[#e1fffe] dark:border-[#1a2a2a] shadow-lg rounded-2xl mt-3 mx-2 md:mx-8 px-4 md:px-12 py-2 flex justify-between items-center relative transition-colors duration-300">
          {/* Logo */}
          <div className="flex items-center gap-2">
           <Link href={'/'}><Image src={'/assets/FullLogo.png'} className="hidden md:block drop-shadow-md" width={110} height={44} alt="logo" /></Link>
           <Link href={'/'}><Image src={'/assets/FullLogo.png'} className="block md:hidden drop-shadow-md" width={70} height={32} alt="mobile-logo" /></Link>
          </div>

          {/* Middle Links */}
          <ul className="hidden md:flex gap-7 text-lg font-medium">
            {path === '/' ? (
              <>
                <li className="hover:text-[#0a7a77] dark:hover:text-[#C3FF93] hover:scale-105 transition-all cursor-pointer px-2 py-1 rounded-md">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-[#0a7a77] dark:hover:text-[#C3FF93] hover:scale-105 transition-all cursor-pointer px-2 py-1 rounded-md">
                  <a href="#faq">FAQ</a>
                </li>
                <li className="hover:text-[#0a7a77] dark:hover:text-[#C3FF93] hover:scale-105 transition-all cursor-pointer px-2 py-1 rounded-md">
                  <a href="#plans">Pricing</a>
                </li>
              </>
            ) : (
              <>
                <li className={`hover:text-[#0a7a77] dark:hover:text-[#C3FF93] hover:scale-105 transition-all cursor-pointer px-2 py-1 rounded-md ${path == '/dashboard' && 'text-[#0a7a77] dark:text-[#C3FF93] font-bold'}`}> 
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className={`hover:text-[#0a7a77] dark:hover:text-[#C3FF93] hover:scale-105 transition-all cursor-pointer px-2 py-1 rounded-md ${path == '/dashboard/questions' && 'text-[#0a7a77] dark:text-[#C3FF93] font-bold'}`}> 
                  <Link href="/dashboard/questions">Questions</Link>
                </li>
                <li className={`hover:text-[#0a7a77] dark:hover:text-[#C3FF93] hover:scale-105 transition-all cursor-pointer px-2 py-1 rounded-md ${path == '/dashboard/upgrade' && 'text-[#0a7a77] dark:text-[#C3FF93] font-bold'}`}> 
                  <Link href="/dashboard/upgrade">Upgrade</Link>
                </li>
                <li className={`hover:text-[#0a7a77] dark:hover:text-[#C3FF93] hover:scale-105 transition-all cursor-pointer px-2 py-1 rounded-md ${path == '/dashboard/how' && 'text-[#0a7a77] dark:text-[#C3FF93] font-bold'}`}> 
                  <Link href="/dashboard/how-it-works">How It Works?</Link>
                </li>
              </>
            )}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                {/* Show Dashboard link beside user button only on home page */}
                {path === '/' && (
                  <Link href="/dashboard" className="hidden md:block hover:text-blue-800 hover:font-bold transition-all cursor-pointer">
                    Dashboard
                  </Link>
                )}
                {/* Show Home link beside user button only on dashboard pages */}
                {path !== '/' && (
                  <Link href="/" className="hidden md:block hover:text-blue-800 hover:font-bold transition-all cursor-pointer">
                    Home
                  </Link>
                )}
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
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="absolute top-20 left-0 w-full bg-white/90 dark:bg-[#0a7a77]/95 backdrop-blur-md flex flex-col items-center gap-4 py-4 md:hidden z-40 shadow-lg rounded-b-2xl border-x border-b border-[#e1fffe] dark:border-[#1a2a2a]">
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
              {/* Dashboard link beside user button in mobile menu */}
              {isSignedIn && (
                <li className="hover:text-blue-800 hover:font-bold transition-all cursor-pointer" onClick={() => setMenuOpen(false)}>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>
                <Link href="/dashboard/questions">Questions</Link>
              </li>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>
                <Link href="/dashboard/upgrade">Upgrade</Link>
              </li>
              <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-blue-800 font-bold'}`} onClick={() => setMenuOpen(false)}>
                <Link href="/dashboard/how-it-works">How It Works?</Link>
              </li>
              {/* Home link beside user button in mobile menu */}
              {isSignedIn && (
                <li className="hover:text-blue-800 hover:font-bold transition-all cursor-pointer" onClick={() => setMenuOpen(false)}>
                  <Link href="/">Home</Link>
                </li>
              )}
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default Header;
