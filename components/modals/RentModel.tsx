'use client'
import React, { ReactElement, useMemo, useState } from 'react'
import Modal from './Model'
import useRentModal from '@/app/hooks/userRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CounrtySelect from '../inputs/CounrtySelect'
import Map from '../Map'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'



enum STEPS{
    CATEGORY=0,
    LOCATION=1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE=5
}

const RentModal = () => {
    const rentModal=useRentModal()
    const [step, setstep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)
    const {toast}=useToast()
    const router=useRouter()
    console.log(step)
const {register,handleSubmit,setValue,watch,formState:{errors},reset}=useForm<FieldValues>({
    defaultValues:{
        category:'',
        location:null,
        guestCount:1,
        roomCount:1,
        bathroomCount:1,
        price:1,
        title:'',
        description:''
    }
})



const category=watch('category')
const location=watch('location')
const guestCount=watch('guestCount')
const roomCount=watch('roomCount')
const bathroomCount=watch('bathroomCount')
const imageSrc=watch('imageSrc')

const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [])

const setCustomValue=(id:string,value:any)=>{
    setValue(id,value,{shouldDirty:true,shouldTouch:true,shouldValidate:true})
}
    const onBack=()=>{
        setstep(value=>value -1)
    }
    const onNext=()=>{
        setstep(value=>value+1)
    }
    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
if(step !== STEPS.PRICE ){
    return onNext()
}
console.log(data)
setIsLoading(true);
axios.post('/api/listings',data).
then(()=>{
    toast({
        title:'Success Create'
    })
    router.refresh()
    reset();
    setstep(STEPS.CATEGORY)
    rentModal.onClose()
}).catch(()=>{
    toast({
        variant:'destructive',
        title:'Somthing went wrong',
        
    })
}).finally(()=>{
    setIsLoading(false)
})
    }
    const actionLabel=useMemo(()=>{
        if(step===STEPS.PRICE){
            
return 'Create'
        }

        return 'Next';
    },[step])

    const secodaryActionLabel=useMemo(()=>{
if(step===STEPS.CATEGORY){
    return undefined
}

return 'Back'
    },[step])


    let bodyContent=(
        <div  className=' flex flex-col gap-8'>
<Heading title='Wich of these best descibes your place?' subtitle='Pick a category'/>
<div className=' grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
    {categories.map((item)=>{
        return <div key={item.label} className=' cursor-pointer col-span-1'>
            
<CategoryInput onClick={(category)=>{setCustomValue('category',category)}} selected={category===item.label} label={item.label} icon={item.icon}/>            </div>
    })}

</div>
        </div>
    )

    
    
    if(step===STEPS.LOCATION){
        bodyContent=(
            <div className=' flex flex-col gap-8'>

<Heading title='Where is your place located?' subtitle='Help guests find you!' />  

<CounrtySelect  value={location} onChange={(value)=>setCustomValue('location',value)} />
<Map center={location?.latlng}  />
         </div>
        )
        
    }


    if(step===STEPS.INFO){
        bodyContent=(
            <div className=' flex flex-col gap-8'>
                <Heading title='Share some basics about your place' subtitle='What amenities do you have?'/>
                <Counter title='Guests' subtitle='How many guest' value={guestCount} onChange={(value)=>setCustomValue('guestCount',value)}/>
                <Counter title='Rooms' subtitle='How many rooms do you have?' value={roomCount} onChange={(value)=>setCustomValue('roomCount',value)}/>
                <Counter title='Bathrooms' subtitle='How many bathrooms do you have?' value={bathroomCount} onChange={(value)=>setCustomValue('bathroomCount',value)}/>
    
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Add a photo of your place"
              subtitle="Show guests what your place looks like!"
            />
            <ImageUpload value={imageSrc} onChange={(value)=>setCustomValue('imageSrc',value)}
          
            />
            <div>
                test
            </div>
          </div>
        )
      }
    


if(step===STEPS.DESCRIPTION){
    bodyContent=(
        <div  className=' flex flex-col gap-8'>
            <Heading title='How would you describe you place?' subtitle='Short and sweet works best! '/>
            <Input id='title' label='Title' register={register}  disabled={isLoading} errors={errors} required/>
            <hr />
            <Input id='description' label='Description' register={register} disabled={isLoading} errors={errors} required/>

        </div>
    )
}
if(step===STEPS.PRICE){
    bodyContent=(
        <div  className=' flex flex-col gap-8'>
            <Heading title='Now, set your price' subtitle='How much do you charge per night?'/>
         <Input id='price' label='Price' formatPrice type="number" disabled={isLoading} errors={errors} register={register} required/>

        </div>
    )
}


      return (
          <Modal body={bodyContent} secondaryAction={step===STEPS.CATEGORY?undefined:onBack} secondaryActionLabel={secodaryActionLabel} onClose={rentModal.onClose} onSubmit={handleSubmit(onSubmit)} actionLabel={actionLabel} isOpen={rentModal.isOpen} title='Aribnb your home!'></Modal>
          )
        }

        export default RentModal












        // use callback cashing the function
        // use memo cashing the return value in the function