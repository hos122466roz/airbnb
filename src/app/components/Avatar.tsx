"use client";
interface AvatarProps {
  src: string |null|undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <img
      className="rounded-full"
      src={src || "/images/placeholder.jpg"}
      height="30"
      width="30"
      alt="Avatar"
    />
  );
};
export default Avatar;
