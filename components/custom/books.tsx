"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { parseMaintext } from "@/lib/utils/maintext";

export interface Book {
  bkID: number;
  Title: string | null;
  Maintext: string | null;
  coding: string | null;
  filsts: string | null;
  updated_by: string | null;
}

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "bkID",
    header: "ID",
  },
  
  {
    accessorKey: "Maintext",
    header: "Bibliographic Info",
    cell: ({ row }) => {
      const maintext = row.getValue("Maintext") as string | null
      const bib = maintext ? parseMaintext(maintext) : null

      if (!bib) return <div>No Data</div>

      return (
        <div className="whitespace-normal break-words max-w-[350px] text-sm leading-tight space-y-1">
          {/* Title */}
          {bib.title && <div><strong>Title:</strong> {bib.title}</div>}

          {/* Author */}
          {bib.author && <div><strong>Author:</strong> {bib.author}</div>}
          {/* Editor */}
          {bib.editor && <div><strong>Editor:</strong> {bib.editor}</div>}

          {/* Call Number */}
          {bib.callNumber && <div><strong>Call No:</strong> {bib.callNumber}</div>}

          {/* Publisher & Year */}
          {(bib.publisher || bib.year) && (
            <div>
              <strong>Pub:</strong> {bib.publisher ?? "N/A"}
              {bib.year ? ` (${bib.year})` : ""}
            </div>
          )}

          {/* Category */}
          {bib.category && (
            <div><strong>Category:</strong> {bib.category}</div>
          )}

          {/* Subjects */}
          {bib.subjects?.length > 0 && (
            <div>
              <strong>Subjects:</strong> {bib.subjects.join(", ")}
            </div>
          )}
          
          {/** Accession number */}
          {bib.accessionNumber && (
            <div>
                <strong>Accession No.</strong> {bib.accessionNumber}
            </div>
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const book = row.original
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" 
            onClick={() => { window.open(`/dashboard/catalog/books/view/${book.bkID}`, '_blank')}}>
            View 
          </Button>
          <Button size="sm">
            Edit
          </Button>
        </div>
      )
    },
  },
]
