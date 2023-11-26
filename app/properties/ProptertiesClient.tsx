'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";
import { useToast } from "@/components/ui/use-toast";

interface PropertiesClient {
  listings: any,
  currentUser?: SafeUser | null,
}

const TripsClient: React.FC<PropertiesClient> = ({
  listings,
  currentUser
}) => {
  const {toast} =useToast()
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
    toast({title:"success Listing deleting"})
      router.refresh();
    })
    .catch((error) => {
      toast({title:"error",variant:'destructive'})    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router,toast]);

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your peorpeties"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
      
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Propetie"
            currentUser={currentUser}
          />
        ))}
    
      </div>
    </Container>
   );
}
 
export default TripsClient;