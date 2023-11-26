"use client"
import { useCallback, useState } from 'react'
import axios from 'axios'
import {AiFillGithub}from 'react-icons/ai'
import {FcGoogle}from 'react-icons/fc'
import {FieldValues,SubmitHandler,useForm}from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterLogin'

import Modal from './Model'
import Heading from '../Heading'
import Input from '../inputs/Input'

import { useToast } from "@/components/ui/use-toast"
import Button from '../Button'
import { signIn } from 'next-auth/react'
import userLoginModal from '@/app/hooks/useLogin'

const RegisterModal = () => {
    const { toast } = useToast()

    const loginModall=userLoginModal()
    const registerModal=useRegisterModal()
    const [isLoading, setisLoading] = useState(false)

    const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
        defaultValues:{
             name:'',
        email:'',
        password:''
        }
       
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setisLoading(true)

        axios.post('/api/register',data).then(()=>{
            toast({
                title:'Success'
            })
            loginModall.onClose()
            registerModal.onClose();
            loginModall.onOpen()
        }).catch((error)=>{
         
            toast({
                variant:"destructive",
                title:'error ',
                description:"Somthing went wrong"
            })


        }).finally(()=>{
            setisLoading(false)
        })
    }


const bodyContent=(
    <div className=' flex flex-col gap-4'>

<Heading title='Welcome in Anwar' subtitle='Create an account!'/>
<Input 
 id='email'
 label='Email'
 disabled={isLoading}
 register={register}
 errors={errors}
 required
/>
<Input 
 id='name'
 label='Name'
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
const toggle=useCallback(()=>{
    registerModal.onClose()
   loginModall.onOpen()
},[registerModal,loginModall])


const footerContent=(
    <div className=' flex flex-col gap-4 mt-3'>
        <hr />
        <Button onClick={()=>{signIn('google')}} outline label=' Continue with Google' Icon={FcGoogle}/>
        <Button onClick={()=>{signIn('github')}} outline label=' Continue with Github' Icon={AiFillGithub}/>
    <div className=' text-neutral-500 text-center mt-4 font-light'>
<div className={` flex justify-center flex-row items-center gap-2`}>
  <div className={``}>
  Already have an account
  </div>
<div onClick={toggle} className=' text-neutral-800 cursor-pointer hover:underline'>
    Login
</div>
</div>
    </div>
    </div>
)
  return (
    <Modal footer={footerContent} body={bodyContent} disabled={isLoading} isOpen={registerModal.isOpen} title='Register' actionLabel='Continue' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)}>

    </Modal>
  )
}

export default RegisterModal