"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const Logo = () => {
    const router=useRouter()
  return (
    <Image onClick={()=>router.push('/')} alt='log' className=' hidden md:block cursor-pointer w-25 h-10'  width={"100"} height={"100"}  src={'/images/logo.png'} />
  )
}

export default Logo