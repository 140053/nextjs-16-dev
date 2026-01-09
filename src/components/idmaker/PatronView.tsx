import { ForPrint, patroninfo } from "@/lib/utils/idmaker";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import ErrorCard from "../custom/ErrorCard";
import Link from "next/link";
import toast from "react-hot-toast";
import ActionButton from "../custom/PatronInfoActionButton";

interface pageProp {
  sid : string
}

export default async function PatronView({sid}:pageProp){

   const patron = await patroninfo(sid)

   if(!patron){
    return (
      <ErrorCard title={"Error!!"} titleCol={"text-red-600"} message={"Patron ID not Found!"} />
    );
   }

  const photo = patron?.patron.gender  == "Male" ? "/muser.png" : "/fuser.png"

  



    
    return (
         <Card className="m-3 shadow-md shadow-white">
              <CardHeader>
                <h1 className=" text-6xl">Patron Info </h1>
                <CardAction className="flex flex-col gap-2">
                  <ActionButton sid={patron.patron_id} />
                </CardAction>
              </CardHeader>

              <CardContent>
                <Card className="p-5 ">
                    <div className="flex flex-row justify-center gap-3  ">
                          <div className="p-5 shadow-amber-300 shadow-2xl rounded-2xl">
                              <div className="m-1"> 
                                  <Image src={patron?.photo ?? photo} width={250} height={50} alt={"user"} className="border border-amber-50 rounded-md w-auto h-auto" loading="eager" />
                              </div>
                              <div className="grid  justify-items-center justify-center w-full border bg-white rounded-2xl p-5">
                                 <div className=" flex justify-items-center">
                                     {!patron?.esig ? (
                                      <Image src="/error.png" width={40} height={20} alt={"Photo"} className="bg-yellow-500  rounded-full hover:bg-red-700" />
                                     ):(
                                      <Image src={patron?.esig} width={70} height={50} alt={"user"} className=" w-auto h-auto " />
                                     )}
                                    
                                 </div>
                                  <div>
                                    <p className="text-black">{!patron?.esig ? "No " : ""} Signature</p>
                                  </div>
                              </div>
                                
                          </div>
                          <div className="flex flex-col justify-items-start justify-between p-5 border shadow-amber-300 shadow-2xl rounded-2xl ">
                            
                            <div className="">
                              <p className=" text-2xl text-green-700 dark:text-green-300">Name:</p>
                              <span className="text-4xl font-extrabold underline">{patron?.name} &#123; {patron?.patron_id} &#125;</span>
                            </div>
                            <div>
                              <p className=" text-2xl text-green-700 dark:text-green-300">Course:</p>
                              <span className=" text-3xl font-extrabold underline">{patron?.Degree_Course}</span>
                            </div>
                            
                           <div>
                             <p className=" text-2xl text-green-700 dark:text-green-300">Address: </p>
                             <span className=" text-4xl font-extrabold underline">{patron?.address}</span>
                           </div>
                           <div>
                            <p className=" text-2xl text-green-700 dark:text-green-300">Email: </p>
                            <span className=" text-4xl font-extrabold underline">{patron?.email}</span>
                           </div>
                           <div>
                              <p className=" text-2xl text-green-700 dark:text-green-300">Phone Number:</p>    
                              <span className=" text-4xl font-extrabold underline">{patron?.telephone}</span>
                           </div>
                          
                           
                          </div>
                    </div>
                </Card>
              </CardContent>
            </Card>
    )
}