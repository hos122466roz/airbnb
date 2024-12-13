import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IPrams {
  listingId?: string;
}

export async function POST(requset: Request, props: { params: Promise<IPrams> }) {
  const params = await props.params;
  const currnetUser = await getCurrentUser();
  if (!currnetUser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }
  let favoriteIds = [...(currnetUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currnetUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(request: Request, props: { params: Promise<IPrams> }) {
  const params = await props.params;
  const currnetUser = await getCurrentUser();
  if (!currnetUser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }
  let favoriteIds = [...(currnetUser.favoriteIds || [])];
  favoriteIds=favoriteIds.filter(id=>id!==listingId)
  const user=await prisma.user.update({
    where:{
        id:currnetUser.id
    },data:{
        favoriteIds
    }
  })
  return NextResponse.json(user)
}
