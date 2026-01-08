import { useEffect, useState } from "react";
import PhotoCrop from "../../PhotoCrop";
import { FormData } from "../schema";
import Image from "next/image";





export default function StepThree({ 
  data,
  errors,
  onChange,
 }: { 
  data: FormData 
  errors: Record<string, string>;
  onChange: (data: Partial<FormData>) => void;
}) {

  const [photosts, PhotoStatus] = useState(false)
  const [imgUrl, SetImgUrl] = useState("");

  useEffect(() => { 
      SetImgUrl(data.photo);
      PhotoStatus(false);
  }, [data.photo])

 useEffect(() => {
    SetImgUrl(data.photo);
    console.log(`photo url Change ${data.photo}`)
 }, [photosts])

  return (
    <div className="space-y-4">
       <label  className="block mb-2.5 text-sm font-medium text-heading text-black">Photo: &nbsp;<span className=" font-thin text-sm"> Note* Patron’s attire should match their most recent ID photo on a white background.  </span></label>
            <div className="grid justify-items-center ">                            
              
              {photosts ?
                <Image width={250} height={50} key={imgUrl}  src={imgUrl} unoptimized alt={"user"} className=" border-2 border-gray-800 m-3 rounded"  />
                :
                <Image width={250} height={50} key={data.photo}  src={data.photo} unoptimized alt={"user"} className=" border-2 border-gray-800 m-3 rounded"  />
              }
             
            </div>

            <input 
                value={data.photo || ""}                
                type="hidden"                 
                placeholder="Name" />

             <PhotoCrop uploadPath="/api/upload/user" filenameLabel="ID Photo" fileName={data.IDnum}  setFileName={(photo) => {
               
               PhotoStatus(true);
               onChange({photo});
               
              }}  />

        {errors.photo && (
            <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
        )}
    </div>


  );
}
