import { Listing, Reservation, User } from "@prisma/client";

export type SafeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafReservations = Omit<
  Reservation,
  "createAt" | "startDate" | "listing"
> & {
  createAt: string;
  startDate: string;
  ondDate: string;
  listing: SafeListings;
};
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
