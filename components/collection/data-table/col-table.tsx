"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CollectionCols = {
    id: bigint | number
    name: string
    code: string
}

export type OtherCols = {
    id: bigint | number
    name: string
    code: string
    parent?: string
    colleges?: {
        name: string;
        code: string;

    }
    courses?: {
        name: string;
        code: string;
    }

}

export const CollegeColumns: ColumnDef<CollectionCols>[] = [
    
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
            const id = row.original.id
            return <div>
               <ButtonGroup>
                 <ButtonGroup className="hidden sm:flex">
                    <Button
                    onClick={() => {
                        window.location.href = '/dashboard/collection/groupings/college/' + id; //add id here
                    }}
                    variant="outline" size="icon" aria-label="Go Back">
                        <Eye />
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                </ButtonGroup>
               </ButtonGroup>
            </div>
        }
    }
]

export const OtherColumns: ColumnDef<OtherCols>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "parent",
        header: "Parent",
        cell: ({ row }) => {
            const parent = row.original.colleges?.name;
            return <span>{parent ?? "No College"}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
            const id = row.original.id
            return <div>
               <ButtonGroup>
                 <ButtonGroup className="hidden sm:flex">
                    <Button 
                    onClick={() => {
                        window.location.href = '/dashboard/collection/groupings/course/' + id; //add id here
                    }}
                    variant="outline" size="icon" aria-label="Go Back">
                        <Eye />
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                </ButtonGroup>
               </ButtonGroup>
            </div>
        }
    }
]


export const SubjectCols: ColumnDef<OtherCols>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "parent",
        header: "Parent",
        cell: ({ row }) => {
            const parent = row.original.courses?.name;
            return <span>{parent ?? "No Course"}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
            const id = row.original.id
            return <div>
               <ButtonGroup>
                 <ButtonGroup className="hidden sm:flex">
                    <Button 
                    onClick={() => {
                        window.location.href = '/dashboard/collection/groupings/college/' + id; //add id here
                    }}
                    variant="outline" size="icon" aria-label="Go Back">
                        <Eye />
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                </ButtonGroup>
               </ButtonGroup>
            </div>
        }
    }
]