'use client'
import useCountries from '@/app/hooks/useCounters';
import { SafeUser } from '@/app/types'
import React from 'react'
import { IconType } from 'react-icons';
import Avatar from '../navbar/Avatar';
import CategoryView from '../CategoryView';
import dynamic from 'next/dynamic';

const Map=dynamic(()=>import('../Map')
,{ssr:false})
interface LisginInfoProps{
user:SafeUser;
description:string
guestCount:number;
roomCount:number;
bathroomCount:number;
category:{
    icon:IconType;
    label:string;
    description:string

}|undefined
locationValue:string
}
const ListingInfo = ({user,description,guestCount,roomCount,bathroomCount,category,locationValue}:LisginInfoProps) => {
    const {getByValue}=useCountries()


const cordinates=getByValue(locationValue)?.latlng


  return (
    <div
    className=' col-span-4 flex flex-col gap-8'
    >

<div className=' flex flex-col gap-2'>
<div className=' text-xl font-semibold flex flex-row items-center gap-2'>
<div>
    Hosted by {user?.name}</div>
    <Avatar src={user?.image} />
</div>

<div className=' flex flex-row items-center gap-4 font-light text-neutral-500'>
<div>
    {guestCount} guests
</div>
<div>
    {roomCount} rooms
</div>
<div>
    {bathroomCount} bathrooms
</div>
</div>

</div>
{category && (
        <CategoryView
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}

      <hr />
      <div className=' text-lg font-light text-neutral-500'>
{description}
      </div>
      <hr />
      <Map center={cordinates}/>


    

    </div>
  )
}

export default ListingInfo