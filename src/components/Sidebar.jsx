'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { BsTwitterX } from "react-icons/bs";
import { HiHome, HiDotsHorizontal } from "react-icons/hi";

export default function Sidebar() {
  const {data:session} = useSession();
  // console.log(session)
  return (
    <div className='flex flex-col p-3 justify-between h-screen'>
      <div className='flex flex-col gap-3 p-3 '>
      <Link href='/'>
      <BsTwitterX className='w-16 h-16 cursor-pointer p-3 hover:bg-green-200 rounded-full transition-all duration-200'/>
      </Link>

      <Link href='/' className='flex items-center gap-2 cursor-pointer p-2 hover:bg-green-200 rounded-full transition-all duration-200 w-fit'>
      <HiHome className='w-9 h-9 '/>
      <span className='font-bold hidden xl:inline'>Home</span>
      </Link>
       {session?(<button  className='bg-blue-400 text-white rounded-full  hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline' onClick={()=> signOut()}>Sign Out</button>):( <button  className='bg-blue-400 text-white rounded-full  hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline' onClick={()=> signIn()}>Sign In</button>)}
     
       </div>
       {session && (
  <div className='text-gray-600 text-sm flex items-center cursor-pointer p-3 hover:bg-gray-300 rounded-full transition-all duration-200'>
    <img src={session.user?.image} className='h-10 w-10 rounded-full xl:mr-2' alt="user-image" />
    <div className='hidden xl:inline'>
      <h4 className='font-bold'>{session.user?.name}</h4>
      <p className='text-gray-400'>@{session.user?.username}</p>
    </div>
    <HiDotsHorizontal className='h-5 xl:ml-8 hidden xl:inline'/>
  </div>
)}

    </div>
  )
}
