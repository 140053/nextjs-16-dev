import { useState } from "react";
import RemoveBgWithCrop from "../../RemoveBg";
import { FormData } from "../schema";
import Image from "next/image";

export default function StepFour({
  data,
  errors,
  onChange,
  removebgAPI,
}: {
  data: FormData;
  errors: Record<string, string>;
  onChange: (data: Partial<FormData>) => void;
  removebgAPI: string;
}) {
  const [esig, setEsigSTS] = useState<boolean>(false);

  return (
    <div className="space-y-2 text-sm">
      <label className="block mb-2.5 text-sm font-medium text-heading text-black">
        Photo: &nbsp;
        <span className=" font-thin text-sm">          
          Note* Sign a Signature in a white paper using a large stroke of pen or marker.
        </span>
      </label>
      <div className="grid justify-items-center ">
        {data.esig && (
          <div className="flex justify-center border mt-2">
            <Image
              key={data.esig}
              src={"/upload/esig/" + data.IDnum + ".png"}
              unoptimized
              width={150}
              height={150}
              className="bg-white w-auto h-auto border-2 border-gray-500 p-5 rounded-lg shadow-md shadow-gray-600 mb-2"
              alt="esignature"
            />
          </div>
        )}
      </div>

      <input type="hidden" 
        value={esig ? "/upload/esig/" + data.IDnum + ".png" : "" }
      />

      <RemoveBgWithCrop
        uploadPath={"/api/upload/esig"}
        fileName={data.IDnum}
        removebgAPI={removebgAPI}
        onValidate={(sts) => {
          setEsigSTS(sts);
          onChange({esig: "/upload/esig/" + data.IDnum + ".png" })
        }}
      />

      {errors.esig && (
        <p className="text-red-500 text-sm mt-1">{errors.esig}</p>
      )}
    </div>
  );
}
