import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/components/EmptyState';
import ListingClient from './ListingClient';
import React from 'react'
import getReservations from '@/app/actions/getReservations';

const ListingPage = async({params}:any) => {
   
    const listing=await getListingById(params);
    const reservations=await getReservations(params)
    console.log(listing)
    const currentUser=await getCurrentUser()
    if(!listing){
        return <EmptyState/>
    }
  return (
    <div className=' '>
        <ListingClient reservations={reservations} listing={listing} currentUser={currentUser}/>
sdsdvsd

    </div>
  )
}

export default ListingPage