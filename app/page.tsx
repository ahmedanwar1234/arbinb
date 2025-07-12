
import Container from "@/components/Container"
import EmptyState from "@/components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListing";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import { Listing } from "@prisma/client";
import { SafeUser } from "./types";

interface HomeProps{
  searchParams:IListingsParams
}


const Home=async({searchParams}:HomeProps)=>{
const  currentUser=await getCurrentUser()

const listings=await getListings(searchParams)

const isEmpty=true;

if(listings.length===0){
  return <EmptyState showReset/>

}

  return (
    <div className="  ">
<Container>
  <div className=" pt-24 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">

{listings.map((listing:any)=>{
  return (
<ListingCard 
  key={listing.id}
  data={listing as unknown as Listing}
  currentUser={currentUser as SafeUser}
/>
   )
})}


  </div>
</Container>
      </div>
  )
}

export default Home