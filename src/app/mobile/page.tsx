
"use client";
import MultiStepForm from "@/components/idmaker/form/MultiStepForm";
import Idvalidate from "@/components/idmaker/Idvalidate";
import { PatronIntf } from "@/types/Patron";
import { useState } from "react";

export default function Patron() {
    const [patronData, setPatronData] = useState<PatronIntf | null>(null);

    return (
      
        <div className="flex items-center justify-center min-h-screen bg-white p-5">
            <div className="flex flex-col bg-white mh-20 justify-items-center ">
                <h1 className="w-full text-center text-5xl font-extrabold text-green-800">Library Card Request Form</h1>
                <p className="w-full text-center italic text-sm mt-3 dark:text-black">Validate first your Student ID. type it in and press submit.</p>
                <div className=" p-5 mt-3">
                    <Idvalidate onValidate={(data) => setPatronData(data)} apiURL={"/api/db/patron?IDnum="} />
                </div>
                {patronData &&
                 <MultiStepForm patron={patronData} />
                }
            </div>
        </div>       
    )
}