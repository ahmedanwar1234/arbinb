'use client'

import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

import Container from "@/components/Container"
import ListingCard from "@/components/listings/ListingCard"
import Heading from "@/components/Heading"
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react"
import axios from "axios"
interface RservationsProps{
    reservations:any
    currentUser?:SafeUser|null
}
const ResevationClient = ({reservations,currentUser}:RservationsProps) => {
    const {toast}=useToast()
    const router=useRouter()
    const [deletingId,setDeletingId]=useState('')
    const onCancel=useCallback((id:string)=>{
setDeletingId(id);
axios.delete('/api/reservations/'+id).then(()=>{
    toast({
        title:"Reservation cancelled"
    })
    router.refresh()
}).catch(()=>{
    toast({
        title:"Sothing went wrond.",variant:'destructive'
    })
}).finally(()=>setDeletingId('')
)
    },[router,toast])
  return (
    <Container>
        <Heading title="Resrvations" subtitle="Bookings on your proprites"/>
        <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6  gap-8">
{reservations.map((reservation:any)=>{
    return <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id}  onAction={onCancel} disabled={deletingId ===reservation.id} actionLabel="Canclel guest reservation" currentUser={currentUser}/>
})}
        </div>
    </Container>
  )
}

export default ResevationClient