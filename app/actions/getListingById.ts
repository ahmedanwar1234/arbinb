import prisma from "../libs/prismadb";




export default async function getListingById({listingId}:any){

try {
    const listing=await prisma.listing.findUnique({
        where:{
            id:listingId
        },
        include:{
            user:true
        }
    })
    if(!listing){
        return null
    }
    return listing
} catch (error:any) {
    throw new Error(error)
}
}