"use client"
import React from 'react'
import Container from '../Container'
import {TbBeach,TbMountain,TbPool}from 'react-icons/tb'
import {IoDiamond}from 'react-icons/io5'
import {BsSnow}from 'react-icons/bs'
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill}from 'react-icons/gi'
import {MdOutlineVilla}from 'react-icons/md'
import {FaSkiing}from 'react-icons/fa'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
export const categories=[
    {
        label:'Beach',
        icon:TbBeach,
        description:'This property is close to the beach'
    },
    {
        label:'Windmills',
        icon:GiWindmill,
        description:'This property has windmills!'
    },
    {
        label:'Modern',
        icon:MdOutlineVilla,
        description:'This property has modern!'
    },
    {
        label:'Countryside',
        icon:TbMountain,
        description:'This property has countryside!'
    },
    {
        label:'Pools',
        icon:TbPool,
        description:'This property has pools!'
    },
    {
        label:'Islands',
        icon:GiIsland,
        description:'This property has island!'
    },
    {
        label:'Lake',
        icon:GiBoatFishing,
        description:'This property has lake!'
    },
    {
        label:'Siking',
        icon:FaSkiing,
        description:'This property has siking!'
    },
    {
        label:'Castles',
        icon:GiCastle,
        description:'This property has castle!'
    },
    {
        label:'Camping',
        icon:GiForestCamp,
        description:'This property has activities!'
    },
    {
        label:'Arctic',
        icon:BsSnow,
        description:'This property has activities!'
    },
    {
        label:'Cave',
        icon:GiCaveEntrance,
        description:'This property is in cave!'
    },
    {
        label:'Desert',
        icon:GiCactus,
        description:'This property is in desert!'
    },
    {
        label:'Barns',
        icon:GiBarn,
        description:'This property is in barn!'
    },
    {
        label:'Lux',
        icon:IoDiamond,
        description:'This property is Luzurious!'
    },
]
const Categories = () => {
    const params=useSearchParams()
    const category=params?.get('category')

const pathName=usePathname()

const isMainPage=pathName==='/';
if(!isMainPage){
    return null
}

    return (
    <Container>
<div className=' flex flex-row pt-4 items-center justify-between overflow-x-scroll '>
{categories.map((item,index)=>{
    return <CategoryBox key={index} label={item.label} select={category ===item.label} icon={item.icon}/>
})}
</div>

    </Container>
  )
}

export default Categories
