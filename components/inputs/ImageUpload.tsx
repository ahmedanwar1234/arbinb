'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const widgetRef = useRef<any>(null)
  const [isReady, setIsReady] = useState(false)

  const handleUpload = useCallback(
    (error: any, result: any) => {
      if (!error && result.event === 'success') {
        onChange(result.info.secure_url)
      }
    },
    [onChange]
  )

  useEffect(() => {
    // Load widget script manually
    const script = document.createElement('script')
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js'
    script.async = true
    script.onload = () => {
      widgetRef.current = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: 'dmxgwelnn',
          uploadPreset: 's7sadorw',
          multiple: false,
        },
        handleUpload
      )
      setIsReady(true)
    }

    document.body.appendChild(script)
  }, [handleUpload])

  return (
    <div
      className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'
      onClick={() => {
        if (isReady && widgetRef.current) {
          widgetRef.current.open()
        } else {
          console.warn('Cloudinary widget not ready yet')
        }
      }}
    >
      <TbPhotoPlus size={50} />
      <div className='font-semibold text-lg'>Click to upload</div>
      {value && (
        <div className='absolute inset-0 w-full h-full'>
          <Image src={value} alt='upload' fill style={{ objectFit: 'cover' }} />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
