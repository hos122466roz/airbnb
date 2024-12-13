import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
export async function POST(request: Request) {
  const currenUser = await getCurrentUser();
  if (!currenUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { listingId, startDate, ondDate, totalPrice } = body;
  if (!listingId || !startDate || !ondDate || !totalPrice) {
    return NextResponse.error();
  }
  const listingAndResevration = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currenUser.id,
          startDate,
          ondDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndResevration);
}
