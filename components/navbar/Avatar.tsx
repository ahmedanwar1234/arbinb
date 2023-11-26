import Image from 'next/image'
import React from 'react'

const Avatar = ({src}:{src?:string|null|undefined}) => {
  return (
    <Image alt='' className=' rounded-full ' height={30} width={30} src={src||'/images/placeholder.jpg'} />

  
  )
}

export default Avatar