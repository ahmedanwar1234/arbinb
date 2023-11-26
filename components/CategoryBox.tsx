"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'
interface CategorBoxProps{
    icon:IconType;
    label:string;
    select?:boolean
}

const CategoryBox = ({icon:Icon,label,select}:CategorBoxProps) => {
    const router=useRouter()
const params=useSearchParams()


const handleClick=useCallback(()=>{
let currentQuery={};
if(params){
    currentQuery=qs.parse(params.toString())
}

const updatedQuery:any={
    ...currentQuery,
    category:label
}

if(params?.get('category')===label){
    delete updatedQuery.category
}

const url=qs.stringifyUrl({
    url:'/',
    query:updatedQuery
},{skipNull:true})

router.push(url)
},[label,params,router])
  return (
    <div 
    onClick={handleClick}
    className={`
     ${select ?"text-neutral-800 ":" text-neutral-500"}
 relative  overflow-hidden
     flex flex-col items-center justify-center gap-2 p-3 px-10 hover:text-neutral-800 transition cursor-pointer`}>

<Icon size={26}/>
<div className=' font-medium text-sm'>
{label}
</div>
<div className={`  ${select?" left-0 bottom-0 transition-all  duration-75 ":"  bottom-0 -left-[100%] "}   absolute w-full  h-[2px] bg-neutral-600`}></div>
    </div>
  )
}

export default CategoryBox