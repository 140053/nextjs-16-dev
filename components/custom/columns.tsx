"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Patron = {
  id: number
  name: string
  address: string
  Degree_Course: string
  User_Class: string
  Year_Level: string
  IDnum: string
  DateApplied?: string | Date | null
  DateExpired?: string | Date | null
  email?: string | null
  gender?: string | null
  campus: string
  reg_date?: string | Date | null
}

export const columns: ColumnDef<Patron>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "Degree_Course",
    header: "Course",
  },
  {
    accessorKey: "User_Class",
    header: "User Type",
  },
  {
    accessorKey: "Year_Level",
    header: "Year Level",
  },
  {
    accessorKey: "campus",
    header: "Campus",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string
      return gender ? (
        <Badge
          variant={
            gender.toLowerCase() === "male" ? "default" : "secondary"
          }
          className="capitalize"
        >
          {gender}
        </Badge>
      ) : (
        "-"
      )
    },
  },
]
