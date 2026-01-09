"use client"
import Link from "next/link";
import { Button } from "../ui/button";

import toast from "react-hot-toast";
import { ForPrint } from "@/lib/utils/idmaker";
import { useRouter } from "next/navigation";

interface pageProp{
    sid: string
}

export default function ActionButton ({sid}:pageProp){
    const router = useRouter();

    const handleForPrint = async (sid: string) => {
    const a = await ForPrint(sid);
    if(a){
      toast.success("Added to for Print Successfully!")
      router.push("/dashboard/idmaker/request")
    }
  }



    return (

        <>
        <Button onClick={() => handleForPrint(sid)} className="bg-green-500 text-white" variant="default" >For Print {sid}</Button>
        <Button className=" bg-blue-600 text-white " variant="default">Edit</Button>
        <Link href={"/dashboard/idmaker/request"} className="bg-gray-600 dark:bg-white p-2 hover:bg-gray-800 text-black text-center rounded-lg"  >Back</Link>                 
                
        </>
    )
}