'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HearButtonProps{
    listingId:string;
    currentUser?:SafeUser|null
}


const HearButton:React.FC<HearButtonProps> = ({
    listingId,
    currentUser
}) => {
      const {hasFavorited,toggleFavorite}=useFavorite({
        listingId,currentUser
      })
    
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacitu-8- transition cursorpointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};
export default HearButton;
