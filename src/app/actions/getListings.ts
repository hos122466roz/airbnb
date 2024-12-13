import prisma from "@/app/libs/prismadb";

export interface ilistingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  ondDate?: string;
  locationVaue?: string;
  category?: string;
}
export default async function getListing(params: ilistingParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationVaue,
      startDate,
      ondDate,
      category,
    } = params;
    let query: any = {};
    if(userId){
      query.userId=userId
    }
    if(category){
      query.category=category
    }
    if(roomCount){
      query.roomCount={
        gte:+roomCount
      }
    }
      if (guestCount) {
        query.guestCount = {
          gte: +guestCount,
        };
      }
      if(bathroomCount){
      query.bathroomCount={
        gte:+bathroomCount
      }
    }
if (locationVaue) {
  query.locationVaue = locationVaue;
}
if (startDate && ondDate) {
  query.NOT = {
    reservations: {
      some: {
        OR: [
          {
            ondDate: { gte: startDate },
            startDate: { lte: startDate },
          },
          {
            startDate: { lte: ondDate },
            ondDate: { gte: ondDate },
          },
        ],
      },
    },
  };
}

   
    const listings = await prisma.listing.findMany({
      where:query,
      orderBy: {
        createAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createAt: listing.createAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
