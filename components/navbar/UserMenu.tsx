"use client"
import React, { useCallback, useState } from 'react'
import {AiOutlineMenu}from 'react-icons/ai'
import Avatar from './Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterLogin'
import useLoginModal from '@/app/hooks/useLogin'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import useRentModal from '@/app/hooks/userRentModal'
import { useRouter } from 'next/navigation'

interface UserMenyProps{
    currentUser?:User|null
}
const UserMenu = ({currentUser}:UserMenyProps) => {
    const router=useRouter()
    const registerModal=useRegisterModal()
    const useLogin=useLoginModal()
    const rentModal=useRentModal()
    const [isOpen, setisOpen] = useState(false)
    const toggleOpen=()=>{
        setisOpen(!isOpen)
    }
    const onRent=useCallback(()=>{
        if(!currentUser){
            return  useLogin.onOpen();
        }
        rentModal.onOpen()

    },[currentUser,useLogin,rentModal])
  return (
    <div className=' relative'>
        <div className=' flex flex-row items-center gap-3'>
<div onClick={
    onRent

} className='  hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
Airbnb your home
</div>
<div onClick={
    toggleOpen

} className=' p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
<AiOutlineMenu/>
<div className='hidden  md:block'>
    <Avatar src={currentUser?.image }/>
</div>
</div>
        </div>
        {isOpen &&(
            <div className=' absolute rounded-xl shadow-md w-[40vw] bg-white z-50 md:w-3/4 right-0 top-12 text-sm'>
<div className='  z-50 flex flex-col cursor-pointer'>
{currentUser? (
<>
    <MenuItem onClick={()=>{router.push('/trips')}} label="My trips" />
    <MenuItem onClick={()=>{router.push('/favorites')}} label="My favorites" />
    <MenuItem onClick={()=>{router.push('/reservations')}} label="My reservations" />
    <MenuItem onClick={()=>{router.push('/properties')}} label="My properties" />
    <MenuItem onClick={()=>rentModal.onOpen()} label="Arinnb my home" />
    <MenuItem onClick={()=>{signOut()}} label="Logout" />
    </>):(


<>
    <MenuItem onClick={useLogin.onOpen} label="Login" />
    <MenuItem onClick={registerModal.onOpen} label="Sign up" />
    </>
)}

</div>
            </div>
        )}

    </div>
  )
}

export default UserMenu