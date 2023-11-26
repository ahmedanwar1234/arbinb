import EmptyState from "@/components/EmptyState"
import ClientOnly from "@/components/ClientOnly"
import RservationClient from "@/app/reservations/ReservationClient"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"

const ReservationsRange = async() => {
    const currentUser=await getCurrentUser()
    if(!currentUser){
          return (
    <>
<EmptyState title="Unauthorized" subtitle="Please login"/>

    </>
  )
    }

    const reservations=await getReservations({
        authorId:currentUser.id
    })
if(reservations.length===0){
    return (
        <>
    <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your porogress"/>
    
        </>
      )
}


return(
    <>
    <RservationClient reservations={reservations} currentUser={currentUser}/>
    </>
)
}

export default ReservationsRange