"use client";

import { StringFilter } from "@/lib/generated/prisma/commonInputTypes";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
import { IdMakerForPrintTypes, IdMakerPrintedTypes } from "@/types/Patron";
import { AddToPrinted, DeleteRecord, ForPending, ReturnToRequest } from "@/lib/utils/idmaker";
import toast from "react-hot-toast";
//import { useRouter } from "next/navigation";

const handlePending = async (sid: string) => {
  //const router = useRouter();
  const a = await ForPending(sid);
  if (a) {
    toast.success("Request Add to Pending");
    window.alert("Request Add to Pending");
    window.location.href = "/dashboard/idmaker/request";
    //router.push("/dashboard/idmaker/request")
  }
};

const hanldeReturnToRequest = async (tid: string) => {
  const a = await ReturnToRequest(tid);
  if (a) {
    window.alert("Return To Request Successfully");
    window.location.href = "/dashboard/idmaker/request";
  }
};

const handleDeleteRecord = async (tid: number, table: string) => {
  const c = window.confirm(`Are You sure you want to delete this Record? `);
  if (c) {
    await DeleteRecord(tid, table);
    window.alert(`A record is Successfully Detelete at the ${table} record!`);
    window.location.href = `/dashboard/idmaker/${table}`;
    
  }
};

const handleViewIdCard = async (sid: string) => {
  window.alert(`View Patron ID ${sid}`);
};

const handleAddToPrinted = async (sid: string) => {
  const a = await AddToPrinted(sid)
  if(a){
    window.alert("Added To Printed Successfully");
    window.location.href = "/dashboard/idmaker/forprint";
  }
}

export type idPatron = {
  id: number;
  patron_id: string;
  photo: string | null;
  esig: string | null;
  reg_date?: string | Date | null;
  name: string;
  address: string;
  Degree_Course: string;
  patron: {
    gender: string | null;
  } | null;
};

export const columns: ColumnDef<idPatron>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "patron_id",
    header: "IDnum",
  },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const imgurl = row.getValue("photo") as string;
      const gender = row.original.patron?.gender as string;
      const photo = gender == "Male" ? "/muser.png" : "/fuser.png";

      return !imgurl ? (
        <div className="">
          <Image
            src={photo}
            width={50}
            height={50}
            alt={"Photo"}
            className=" rounded-full"
          />
        </div>
      ) : (
        <div>
          <Image
            src={imgurl}
            width={100}
            height={50}
            alt={"Photo"}
            className=" rounded-md border-2 border-gray-200"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Degree_Course",
    header: "Course",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telephone",
    header: "Phone Number",
  },
  {
    accessorKey: "esig",
    header: "Signature",
    cell: ({ row }) => {
      const sig = row.getValue("esig") as string;
      return sig ? (
        <div>
          <Image
            src={sig}
            width={100}
            height={50}
            alt={"Photo"}
            className="bg-white p-3 rounded-sm"
          />
        </div>
      ) : (
        <Image
          src="/error.png"
          width={40}
          height={20}
          alt={"Photo"}
          className="bg-yellow-500  rounded-full hover:bg-red-700"
        />
      );
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("patron_id") as string;
      const tid = row.getValue("id") as number;
      return id ? (
        <div className="flex gap-2">
          <Button
            variant="default"
            className="bg-green-500 text-white hover:bg-green-800"
            onClick={() =>
              (window.location.href = `/dashboard/idmaker/view/${id}`)
            }
          >
            View
          </Button>
          <Button
            variant="default"
            className="bg-blue-500 text-white hover:bg-blue-800"
            onClick={() => handlePending(id)}
          >
            Pending
          </Button>
          <Button
            variant="default"
            className="bg-yellow-500 text-white hover:bg-red-800"
            onClick={() => handleDeleteRecord(tid, "request")}
          >
            Delete
          </Button>
        </div>
      ) : (
        "-"
      );
    },
  },
];




export const forPrintColumn: ColumnDef<IdMakerForPrintTypes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "patron_id",
    header: "IDnum",
  },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const imgurl = row.original.photo as string;
      const gender = row.original.patron?.gender as string;
      const photo = gender == "Male" ? "/muser.png" : "/fuser.png";

      return !imgurl ? (
        <div className="">
          <Image
            src={photo}
            width={50}
            height={50}
            alt={"Photo"}
            className=" rounded-full"
          />
        </div>
      ) : (
        <div>
          <Image
            src={imgurl}
            width={100}
            height={50}
            alt={"Photo"}
            className=" rounded-md border-2 border-gray-200"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Degree_Course",
    header: "Course",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telephone",
    header: "Phone Number",
  },
  {
    accessorKey: "esig",
    header: "Signature",
    cell: ({ row }) => {
      const sig = row.original.esig as string;
      return sig ? (
        <div>
          <Image
            src={sig}
            width={100}
            height={50}
            alt={"Photo"}
            className="bg-white p-3 rounded-sm"
          />
        </div>
      ) : (
        <Image
          src="/error.png"
          width={40}
          height={20}
          alt={"Photo"}
          className="bg-yellow-500  rounded-full hover:bg-red-700"
        />
      );
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("patron_id") as string;
      const tid = row.getValue("id") as number;
      return id ? (
        <div className="flex gap-2">
          <Button
            variant="default"
            className="bg-green-500 text-white hover:bg-green-800"
            onClick={() => handleAddToPrinted(id)}
          >
            Add to Printed
          </Button>
          <Button
            variant="default"
            className="bg-blue-500 text-white hover:bg-blue-800"
          >
            Edit
          </Button>
          <Button
            variant="default"
            className="bg-yellow-500 text-white hover:bg-red-800 "
            onClick={() => DeleteRecord(tid, "forprint")}
          >
            Delete
          </Button>
        </div>
      ) : (
        "-"
      );
    },
  },
];

export const forPendningColumn: ColumnDef<IdMakerForPrintTypes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "patron_id",
    header: "IDnum",
  },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const imgurl = row.original.photo as string;
      const gender = row.original.patron?.gender as string;
      const photo = gender == "Male" ? "/muser.png" : "/fuser.png";

      return !imgurl ? (
        <div className="">
          <Image
            src={photo}
            width={50}
            height={50}
            alt={"Photo"}
            className=" rounded-full"
          />
        </div>
      ) : (
        <div>
          <Image
            src={imgurl}
            width={100}
            height={50}
            alt={"Photo"}
            className=" rounded-md border-2 border-gray-200"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Degree_Course",
    header: "Course",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telephone",
    header: "Phone Number",
  },
  {
    accessorKey: "esig",
    header: "Signature",
    cell: ({ row }) => {
      const sig = row.original.esig as string;
      return sig ? (
        <div>
          <Image
            src={sig}
            width={100}
            height={50}
            alt={"Photo"}
            className="bg-white p-3 rounded-sm"
          />
        </div>
      ) : (
        <Image
          src="/error.png"
          width={40}
          height={20}
          alt={"Photo"}
          className="bg-yellow-500  rounded-full hover:bg-red-700"
        />
      );
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("patron_id") as string;
      const tid = row.getValue("id") as number;
      return id ? (
        <div className="flex gap-2">
          <Button
            variant="default"
            className="bg-green-500 text-white hover:bg-green-800"
            onClick={() => hanldeReturnToRequest(id)}
          >
            Return to Request
          </Button>
          <Button
            variant="default"
            className="bg-blue-500 text-white hover:bg-blue-800"
          >
            Edit
          </Button>
          <Button
            variant="default"
            className="bg-yellow-500 text-white hover:bg-red-800"
            onClick={() => handleDeleteRecord(tid, "forprint")}
          >
            Delete
          </Button>
        </div>
      ) : (
        "-"
      );
    },
  },
];

export const PrintedColumn: ColumnDef<IdMakerPrintedTypes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "patron_id",
    header: "IDnum",
  },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const imgurl = row.original.patron?.photo as string;
      const gender = row.original.patron?.gender as string;
      const photo = gender == "Male" ? "/muser.png" : "/fuser.png";

      return !imgurl ? (
        <div className="">
          <Image
            src={photo}
            width={50}
            height={50}
            alt={"Photo"}
            className=" rounded-full"
          />
        </div>
      ) : (
        <div>
          <Image
            src={imgurl}
            width={100}
            height={50}
            alt={"Photo"}
            className=" rounded-md border-2 border-gray-200"
          />
        </div>
      );
    },
  },
  {
    accessorFn: {(row) => }
    id: "name",
    header: "Name",
  },
  {
    accessorKey: "Degree_Course",
    header: "Course",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telephone",
    header: "Phone Number",
  },
  {
    accessorKey: "esig",
    header: "Signature",
    cell: ({ row }) => {
      const sig = row.original.patron?.esig as string;
      return sig ? (
        <div>
          <Image
            src={sig}
            width={100}
            height={50}
            alt={"Photo"}
            className="bg-white p-3 rounded-sm"
          />
        </div>
      ) : (
        <Image
          src="/error.png"
          width={40}
          height={20}
          alt={"Photo"}
          className="bg-yellow-500  rounded-full hover:bg-red-700"
        />
      );
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("patron_id") as string;
      const tid = row.getValue("id") as number;
      return id ? (
        <div className="flex gap-2">
          <Button
            variant="default"
            className="bg-green-500 text-white hover:bg-green-800"
            onClick={() => AddToPrinted(id)}
          >
            View Card
          </Button>

          <Button
            variant="default"
            className="bg-yellow-500 text-white hover:bg-red-800 hidden"
            onClick={() => handleDeleteRecord(tid, "printed")}
          >
            Delete
          </Button>
        </div>
      ) : (
        "-"
      );
    },
  },
];
