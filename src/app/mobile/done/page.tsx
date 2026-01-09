
"use client";

import { Button } from "@/components/ui/button";


import { useRouter } from "next/navigation";


export default function Patron(){
    const router = useRouter()

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-5">
            <div className="flex flex-col bg-white mh-20 justify-items-center ">
                <h1 className="w-full text-center text-5xl font-extrabold text-green-800">Request Sent Successfully!</h1>
                <p className="w-full text-center italic text-sm mt-3 dark:text-black">Wait for your name to called for futher instruction. Thannk you.</p>
                <div className="flex items-center justify-center mt-3">
                    <Button onClick={()=>router.push("/mobile")}>Go Back </Button>
                </div>
           
            </div>

        </div>
    )
}