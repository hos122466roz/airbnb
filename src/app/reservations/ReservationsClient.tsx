"use client";
import { useRouter } from "next/navigation";
import Container from "../components/container";
import Heading from "../components/Heading";
import { SafeUser, SafReservations } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafReservations;
  currentUser?: SafeUser;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeleteingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeleteingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancaelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went cancelled");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your propertis" />

      <div
        className="
      mt-10 grid grid-cols-1
       sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5
         2xl:grid-cols-5 
         gap-8"
      >
        {reservations.map((reservation: any) => {
          console.log(reservation);
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};
export default ReservationsClient;
