"use client";
import useCountries from "@/app/hooks/useCountry";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationVaue");
  const startDate = params?.get("startDate");
  const ondDate = params?.get("ondDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [getByValue, locationValue]);

  const durartionLabel = useMemo(() => {
    if (startDate && ondDate) {
      const start = new Date(startDate as string);
      const end = new Date(ondDate as string);
      let diff = differenceInDays(end, start);
      if (diff === 0) {
        diff = 1;
      }
      return `${diff} Days`;
    }
    return "Any Week";
  }, [startDate, ondDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);
  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px]
    w-full
    md:w-auto
    py-2
    rounded-full
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm fonst-semibold px-6">{locationLabel}</div>
        <div className=" hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durartionLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-red-500 rounded-full text-white">
            {" "}
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
