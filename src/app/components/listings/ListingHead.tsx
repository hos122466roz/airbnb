"use client";

import useCountries from "@/app/hooks/useCountry";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HearButton from "../HearButton";

interface ListingClientPorps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingClientPorps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location=getByValue(locationValue)

  return <>
  
  <Heading title={title} subtitle={`${location?.region},${location?.label}`}/>
  <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
    <img src={imageSrc} className="object-cover w-full"/>
    <div className="absolute top-5 right-5">
        <HearButton listingId={id} currentUser={currentUser}/>
   
    </div>
  </div>
  </> 
};
export default ListingHead;