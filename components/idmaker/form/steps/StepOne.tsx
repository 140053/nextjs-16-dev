import { FormData } from "../schema";

export default function StepOne({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: Record<string, string>;
  onChange: (data: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-4 border-t-2 border-green-600 p-3">
        <input type="hidden" value={data.id} />
       

        <div>
            <label  className="block mb-2.5 text-sm font-medium text-heading text-black">Name: &nbsp;<span className=" font-thin text-sm"> Note* Name Should be Firstname Middle Initial. And Lastname. e.g Juan B. Reyes  </span></label>
            <div className="flex shadow-md rounded-md text-black border-black shadow-gray-600 ">
                <span className="inline-flex items-center px-3 text-sm text-body bg-neutral-tertiary border rounded-e-0 border-default-medium border-e-0 rounded-s-base">
                    <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                </span>
                <input 
                value={data.name}
                onChange={(e) => onChange({ name: e.target.value })}
                type="text" 
                className="rounded-none rounded-e-base block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand placeholder:text-body" 
                placeholder="Name" />
            
            </div>
              {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
        </div>
        <div>
            <label  className="block mb-2.5 text-sm font-medium text-heading text-black">Address: &nbsp;<span className=" font-thin text-sm"> Note* Should be Barangay, Municipality, Province.  </span></label>
            <div className="flex shadow-md rounded-md text-black border-black shadow-gray-600 ">
                <span className="inline-flex items-center px-3 text-sm text-body bg-neutral-tertiary border rounded-e-0 border-default-medium border-e-0 rounded-s-base">
                    @
                </span>
                <input 
                value={data.address}
                onChange={(e) => onChange({ address: e.target.value })}
                type="text" 
                className="rounded-none rounded-e-base block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand placeholder:text-body" 
                placeholder="Name" />
            
            </div>
              {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
        </div>

        <div>
            <label  className="block mb-2.5 text-sm font-medium text-heading text-black">Email: &nbsp;<span className=" font-thin text-sm"> Note*  Use the Institutional Email.  </span></label>
            <div className="flex shadow-md rounded-md text-black border-black shadow-gray-600 ">
                <span className="inline-flex items-center px-3 text-sm text-body bg-neutral-tertiary border rounded-e-0 border-default-medium border-e-0 rounded-s-base">
                    @
                </span>
                <input 
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                type="text" 
                className="rounded-none rounded-e-base block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand placeholder:text-body" 
                placeholder="Name" />
            
            </div>
              {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
        </div>

        <div>
            <label  className="block mb-2.5 text-sm font-medium text-heading text-black">Telephone: &nbsp;<span className=" font-thin text-sm"> Note*  Use the Institutional Email.  </span></label>
            <div className="flex shadow-md rounded-md text-black border-black shadow-gray-600 ">
                <span className="inline-flex items-center px-3 text-sm text-body bg-neutral-tertiary border rounded-e-0 border-default-medium border-e-0 rounded-s-base">
                    #
                </span>
                <input 
                value={data.telephone}
                onChange={(e) => onChange({ telephone: e.target.value })}
                type="text" 
                className="rounded-none rounded-e-base block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand placeholder:text-body" 
                placeholder="Name" />
            
            </div>
              {errors.telephone && (
                  <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
              )}
        </div>

        <input type="hidden" value={data.User_Class} />
        <input type="hidden" value={data.Year_Level} />
        <input type="hidden" value={data.IDnum} />
        <input type="hidden" value={data.gender} />
        <input type="hidden" value={data.campus} />

     
    

      
    </div>
  );
}