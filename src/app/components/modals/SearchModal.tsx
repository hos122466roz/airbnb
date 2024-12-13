"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modals";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useCallback, useMemo, useState } from "react";
import {  Range } from "react-date-range";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, SetRoomCount] = useState(1);
  const [bathroomClount, setBathroomCount] = useState(1);
  const [dateRange, setDateRenge] = useState<Range>({
    startDate: new Date(),
    ondDate: new Date(),
    key: "selection",
  });

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQurey: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomClount,
    };
    if (dateRange.startDate) {
      updatedQurey.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.startDate) {
      updatedQurey.ondDate = formatISO(dateRange.ondDate);
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQurey,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomClount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);
  const secndaryActionLael = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, []);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go? "
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr/>
      {/* <Map center={location?.latlng}/> */}
    </div>
  );
  if(step===STEPS.DATE){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calender value={dateRange} onChang={value=>setDateRenge(value.selection)}/>
      </div>
    );
  }
  if(step===STEPS.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="Find your perfect are coming?"
        />
        <Counter
          title="Guests"
          subtitle="  guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many guests are coming?"
          value={roomCount}
          onChange={(value) => SetRoomCount(value)}
        />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={bathroomClount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }
  return (
    <Modal
      title="Filters"
      actionLabel={actionLabel}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}secondaryActionLabel={secndaryActionLael}
      secondaryAction={step===STEPS.LOCATION? undefined:onBack}
    />
  );
};
export default SearchModal;
