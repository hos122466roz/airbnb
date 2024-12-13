"use Client";
import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPause } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    // (result: any) => {
    //   // onChange(result.info.secure_url);

    // },
    () => {},

    [onChange]
  );

  const handle = (value: string) => {
    onChange(value);
  };
  return (
    <div>
      <input
        type="text"
        className="
        peer
          w-full
          p-4
          pt-6
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          mb-8"
          placeholder="image adress"
        onChange={(value) => handle(value.target.value)}
      />
      <div
        // onClick={handle}
        // onClick={() => open?.()}
        className="relative cursor-pointer
             hover:opacity-70 transition 
             border-dashed border-2 p-20
              border-neutral-300 flex
               flex-col justify-center
                items-center gap-4
                 text-neutral-600 overflow-hidden"
      >
        <TbPhotoPause size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
        {value && (
          <div className="absolute inset-0 w-full h-full">
            <img src={value} style={{ objectFit: "cover" }} alt="" />
          </div>
        )}
      </div>
    </div>

    // <CldUploadWidget
    //   onUpload={handleUpload}
    //   uploadPreset="xrabzahs"
    //   options={{ maxFiles: 1 }}
    // >
    //   {({ open }) => {
    //     return (
    //       <div
    //         onClick={() => handleUpload}
    //         // onClick={() => open?.()}
    //         className="relative cursor-pointer
    //          hover:opacity-70 transition
    //          border-dashed border-2 p-20
    //           border-neutral-300 flex
    //            flex-col justify-center
    //             items-center gap-4
    //              text-neutral-600 "
    //       >
    //         <TbPhotoPause size={50} />
    //         <div className="font-semibold text-lg">Click to upload</div>
    //         {value && (
    //           <div className="absolute inset-0 w-full h-full">
    //             <img
    //               src="https://img.freepik.com/free-photo/design-house-modern-villa-with-open-plan-living-private-bedroom-wing-large-terrace-with-privacy_1258-169741.jpg?t=st=1731600240~exp=1731603840~hmac=7917a4987a6122c47603dc58f6d836ac8ee5d1baada0ba768a73dafca31b6f50&w=1060"
    //               style={{ objectFit: "cover" }}
    //               alt=""
    //             />
    //           </div>
    //         )}
    //       </div>
    //     );
    //   }}
    // </CldUploadWidget>
  );
};
export default ImageUpload;
