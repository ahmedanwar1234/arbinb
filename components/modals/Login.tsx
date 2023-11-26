"use client"
import { useCallback, useState } from 'react'
import axios from 'axios'
import {AiFillGithub}from 'react-icons/ai'
import {FcGoogle}from 'react-icons/fc'
import {FieldValues,SubmitHandler,useForm}from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterLogin'
import userLoginModal from '@/app/hooks/useLogin'

import Modal from './Model'
import Heading from '../Heading'
import Input from '../inputs/Input'

import { useToast } from "@/components/ui/use-toast"
import Button from '../Button'

import {signIn}from 'next-auth/react' 
import { useRouter } from 'next/navigation'
const LoginModal = () => {
    const { toast } = useToast()
const router=useRouter()
    const registerModal=useRegisterModal();
    const loginModal=userLoginModal()
    const [isLoading, setisLoading] = useState(false)

    const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
        defaultValues:{
        email:'',
        password:''
        }
       
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setisLoading(true)

    signIn('credentials',{...data,redirect:false}).then((callback)=>{
        setisLoading(false);

        // if(callback?.ok){
            toast({
                title:'Success Login'
            })
        router.refresh()
        loginModal.onClose()
        


        // if(callback?.error){
        //     toast({
        //         variant:'destructive',
        //         title:'fuck error',
        //         description:callback.error
        //     })
        // }
    })

    }
    
const toggle=useCallback(()=>{
    loginModal.onClose()
    registerModal.onOpen()
},[loginModal,registerModal])


    
const bodyContent=(
    <div className=' flex flex-col gap-4'>

<Heading title='Welcome back' subtitle='Login to your accounr'/>
<Input 
 id='email'
 label='Email'
 disabled={isLoading}
 register={register}
 errors={errors}
 required
/>

<Input 
 id='password'
 type='password'
 label='Password'
 disabled={isLoading}
 register={register}
 errors={errors}
 required
/>
    </div>
)

const footerContent=(
    <div className=' flex flex-col gap-4 mt-3'>
        <hr />
        <Button onClick={()=>{signIn('google')}} outline label=' Continue with Google' Icon={FcGoogle}/>
        <Button onClick={()=>{signIn('github')}} outline label=' Continue with Github' Icon={AiFillGithub}/>
    <div className=' text-neutral-500 text-center mt-4 font-light'>
<div className={` flex justify-center flex-row items-center gap-2`}>
  <div className={``}>
First time useing Airbnb
  </div>
<div onClick={toggle} className=' text-neutral-800 cursor-pointer hover:underline'>
    Create an account
</div>
</div>
    </div>
    </div>
)
  return (
    <Modal footer={footerContent} body={bodyContent} disabled={isLoading} isOpen={loginModal.isOpen} title='Login' actionLabel='Continue' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)}>

    </Modal>
  )
}

export default LoginModal