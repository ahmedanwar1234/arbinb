
import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";

import getFavoriteListings from "@/app/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";
import getCurrentUser from "../actions/getCurrentUser";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </>
    );
  }

  return (
    <>
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
      />
    </>
  );
}
 
export default ListingPage;