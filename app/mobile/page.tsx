
"use client";

import AddPatron from "@/components/idmaker/AddPatron";
import Idvalidate from "@/components/idmaker/Idvalidate";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface UserData {
    id: number;
    name: string;
    address: string;
    Degree_Course: string;
    User_Class: string;
    Year_Level: string;
    IDnum: string;
    DateApplied: string | null;
    DateExpired: string | null;
    email: string;
    gender: string;
    campus: string;
    Bkloan: string | null;
    telephone: string | null;
    Overdue: string | null;
    remarks: string | null;
    suspended: string | null;
    tag: string | null;
    reg_date: string;
}


export default function Patron() {
    const [patronData, setPatronData] = useState<UserData | null>(null);

    useEffect(() => {
        toast.success('Student Number Found!');
        console.log("Updated Patron Data in AddPatronPage:", patronData);
    }, [patronData]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-5">
            <div className="flex flex-col bg-white mh-20 justify-items-center ">
                <h1 className="w-full text-center text-5xl font-extrabold text-green-800">Library Card Request Form</h1>
                <p className="w-full text-center italic text-sm mt-3 dark:text-black">Validate first your Student ID. type it in and press submit.</p>
                <div className=" p-5 mt-3">
                    <Idvalidate onValidate={(data) => setPatronData(data)} apiURL={"/api/db/patron?IDnum="} />
                </div>

                {patronData &&

                    <div className="grid justify-items-center  mt-4  ">
                        <AddPatron patronData={patronData} addUser={true} addSign={false} urlDst={"/mobile/done"} btntxt={"Request"} fromsts={() => setPatronData(null)} removebgAPI={"http://192.168.88.100:4001/removebg/"} />
                    </div>
                }



            </div>

        </div>
    )
}