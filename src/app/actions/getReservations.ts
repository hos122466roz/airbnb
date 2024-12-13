import prisma from "@/app/libs/prismadb";
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
    try{
const { listingId, userId, authorId } = params;
  const query: any = {};
  if (listingId) {
    query.listingId = listingId;
  }
  if (userId) {
    query.userId = userId;
  }
  if (authorId) {
    query.listing = { userId: authorId };
  }
  const reservations = await prisma.reservation.findMany({
    where: query,
    include: { listing: true },
    orderBy: { createAt: "desc" },
  });

  const safReservations = reservations.map((reservation) => ({
    ...reservation,
    createAt: reservation.createAt.toISOString(),
    startDate: reservation.startDate.toISOString(),
    ondDate: reservation.ondDate.toISOString(),
    listing: {
        ...reservation,
    createAt:reservation.listing.createAt.toISOString(),
    },
  }));
  return safReservations;
    }catch(error:any){
        throw new Error(error)
    }
  
}
