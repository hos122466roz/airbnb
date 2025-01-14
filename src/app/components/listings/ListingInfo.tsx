"use client";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import useCountries from "@/app/hooks/useCountry";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  category: {
    icon: IconType;
    label: string;
    description: string;
  }|undefined
  locationValue: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  category,
  locationValue,
}) => {
 const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  const Map=dynamic(()=>import('../Map'),{
    ssr:false
  })
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className=" 
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2"
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} gueste</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathroom</div>
        </div>
      </div>
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-neutral-500 text-lg font-light">
        {description}
      </div>
      <hr /> 
      {/* <Map center={coordinates}/> */}
    </div>
  );
};
export default ListingInfo;
