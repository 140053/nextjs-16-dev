
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FormData } from "../schema";
import Image from "next/image";

export default function StepFour({data}: {  data: FormData}){

    return(
        <div>
            <Card>
                <CardHeader>
                    <h1 className=" text-3xl text-center ">Library Card Information</h1>
                </CardHeader>
                <CardContent>

                    <div className="flex justify-items-center rounded-2xl border-2 border-amber-100 shadow-lg bg-gray-700 shadow-amber-200">
                        <div className=" flex-col justify-items-start pt-3 pb-3">
                            <Image key={data.photo} src={data.photo} unoptimized width={150} height={10} alt="photo" className="m-4 rounded-md border-2 border-gray-400"/>
                             <Image key={data.esig} src={data.esig} unoptimized width={140} height={10} alt="photo" className="bg-white m-4 p-3 rounded-md max-w-full" />
                        </div>
                        <div className="flex-1 justify-items-start pt-3 pb-3 pr-3">
                            <div className="flex-1 pl-2">
                                <p className=" italic">Name:</p>
                                <p className=" font-bold">{data.name}</p>
                            </div>
                            <div className="flex-1 pl-2">
                                <p className=" italic">Course:</p>
                                <p className=" font-bold">{data.Degree_Course}</p>
                            </div>
                            <div className="flex-1 pl-2">
                                <p className=" italic">Student Number:</p>
                                <p className=" font-bold">{data.IDnum}</p>
                            </div>
                            <div className="flex-1 pl-2">
                                <p className=" italic">Email:</p>
                                <p className=" font-bold">{data.email}</p>
                            </div>
                            <div className="flex-1 pl-2">
                                <p className=" italic">Phone:</p>
                                <p className=" font-bold">{data.telephone}</p>
                            </div>
                            <div className="flex-1 pl-2">
                                <p className=" italic">Address:</p>
                                <p className=" font-bold">{data.address}</p>
                            </div>
                            
                        </div>

                    </div>
                </CardContent>
                
            </Card>            
        </div>
    )
}