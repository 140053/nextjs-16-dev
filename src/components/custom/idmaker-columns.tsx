"use client";

import { StringFilter } from "@/lib/generated/prisma/commonInputTypes";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
import { IdMakerForPrintTypes } from "@/types/Patron";



export type idPatron = {
  id: number;
  patron_id: string;
  photo: string | null;
  esig: string | null;
  reg_date?: string | Date | null;
  patron: {
    name:string;
    address:string;
    IDnum: string;
    Degree_Course: string;
    email: string | null;
    telephone: string | null;
    gender: string | null;
  } | null
  
};

export const columns: ColumnDef<idPatron>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "patron_id",
    header: "IDnum"
  },
  {
    accessorKey: "photo",   
    header: "Photo",
    cell: ({row}) => {
      const imgurl = row.getValue("photo") as string
      const gender = row.original.patron?.gender  as string
      const photo = (gender == "Male") ? "/muser.png": "/fuser.png"

      return !imgurl ? (
        <div className="">
          <Image src={photo} width={50} height={50} alt={"Photo"} className=" rounded-full" />
        </div>
      ):(
        <div>
          <Image src={imgurl} width={100} height={50} alt={"Photo"} className=" rounded-md border-2 border-gray-200" />
        </div>
      )
      
    },  
  },  
  {
    accessorFn: (row) => row.patron?.name ?? "",
    id: "name",
    header: "Name",   
  },
  {
    accessorFn: (row) => row.patron?.Degree_Course ?? "",
    id: "Degree_Course",
    header: "Course",   
  },

  {
    accessorFn: (row) => row.patron?.address ?? "",
    id: "address",
    header: "Address"
  },
  {
    accessorFn: (row) => row.patron?.email ?? "",
    id: "email",
    header: "Email"
  },
  {
    accessorFn: (row) => row.patron?.telephone ?? "",
    id: "telephone",
    header: "Phone Number"
  },
  {
    accessorKey: "esig",
    header: "Signature",
    cell: ({row}) => {
      const sig = row.getValue("esig") as string
      return sig ? (
        <div>
          <Image src={sig} width={100} height={50} alt={"Photo"} className="bg-white p-3 rounded-sm" />
        </div>
      ):(
         <Image src="/error.png" width={40} height={20} alt={"Photo"} className="bg-yellow-500  rounded-full hover:bg-red-700" />
      )
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({row}) => {
      const id = row.getValue('patron_id') as string
      return id ? (
        <div className="flex gap-2">
          <Button variant="default" className="bg-green-500 text-white hover:bg-green-800" onClick={()=>window.location.href=`/dashboard/idmaker/view/${id}`}   >View</Button>
          <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-800" >Pending</Button>
          <Button variant="default" className="bg-yellow-500 text-white hover:bg-red-800" >Delete</Button>
        </div>
      ):(
        "-"  
      )
    },
  }
  
];



export const forPrintColumn: ColumnDef<IdMakerForPrintTypes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "patron_id",
    header: "IDnum"
  },
  {
    accessorKey: "photo",   
    header: "Photo",
    cell: ({row}) => {
      const imgurl = row.original.patron?.photo as string
      const gender = row.original.patron?.gender  as string
      const photo = (gender == "Male") ? "/muser.png": "/fuser.png"

      return !imgurl ? (
        <div className="">
          <Image src={photo} width={50} height={50} alt={"Photo"} className=" rounded-full" />
        </div>
      ):(
        <div>
          <Image src={imgurl} width={100} height={50} alt={"Photo"} className=" rounded-md border-2 border-gray-200" />
        </div>
      )
      
    },  
  },  
  {
    accessorFn: (row) => row.patron?.name ?? "",
    id: "name",
    header: "Name",   
  },
  {
    accessorFn: (row) => row.patron?.Degree_Course ?? "",
    id: "Degree_Course",
    header: "Course",   
  },

  {
    accessorFn: (row) => row.patron?.address ?? "",
    id: "address",
    header: "Address"
  },
  {
    accessorFn: (row) => row.patron?.email ?? "",
    id: "email",
    header: "Email"
  },
  {
    accessorFn: (row) => row.patron?.telephone ?? "",
    id: "telephone",
    header: "Phone Number"
  },
  {
    accessorKey: "esig",
    header: "Signature",
    cell: ({row}) => {
      const sig = row.original.patron?.esig as string
      return sig ? (
        <div>
          <Image src={sig} width={100} height={50} alt={"Photo"} className="bg-white p-3 rounded-sm" />
        </div>
      ):(
         <Image src="/error.png" width={40} height={20} alt={"Photo"} className="bg-yellow-500  rounded-full hover:bg-red-700" />
      )
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({row}) => {
      const id = row.getValue('patron_id') as string
      return id ? (
        <div className="flex gap-2">
          <Button variant="default" className="bg-green-500 text-white hover:bg-green-800" onClick={()=>window.location.href=`/dashboard/idmaker/view/${id}`}   >Printed</Button>
          <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-800" >Edit</Button>
          <Button variant="default" className="bg-yellow-500 text-white hover:bg-red-800" >Delete</Button>
        </div>
      ):(
        "-"  
      )
    },
  }
  
];
