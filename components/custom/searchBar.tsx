"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { BookDataTable } from "./book-data-table";

import { Book } from "@/components/custom/books";
import { addBookSubject, parseMaintext } from "@/lib/utils/maintext";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CollectionTable } from "../collection/data-table/data-table";
import { BooklistColumns } from "../collection/data-table/col-table";


interface SelBooks {
  id: string;
  subject_id: string;
  bkid: string;
  title: string;
  author: string | null;
  contributor: string | null;
  publisher: string | null;
  copyrights: string | null;
  isbn: string | null;
  call_number: string | null;
  accession_number: string | null;
  edition: string | null;
  place_of_publication: string | null;
  material_type: string | null;
  code: string | null;
  is_fil: boolean;
  created_at: string;  // ISO string
  updated_at: string;  // ISO string
}

export function SearchBar({ subjectid }: { subjectid: string }) {
  const [books, setBooks] = useState<Book[]>([]);     // results
 
  const [query, setQuery] = useState("");     // search keyword
  const [loading, setLoading] = useState(false);

  // ✅ Fetch only when user types
  useEffect(() => {
    if (!query.trim()) {
      setBooks([]); // clear results when empty
      return;
    }

    const delay = setTimeout(() => {
      setLoading(true);

      fetch(`/api/db/collection/books?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((json) => {
          setBooks(json.data ?? []);
          //console.log("Search results:", json.data); // ✅ Console log here
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  

   const CollectionColumns: ColumnDef<Book>[] = [
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
          <div className="whitespace-normal wrap-break-word max-w-[350px] text-sm leading-tight space-y-1">
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
         const maintext = row.getValue("Maintext") as string | null
         const bib = maintext ? parseMaintext(maintext) : null
          // ✅ Add bkID to bib
          const bibWithId = { ...bib, bkid: book.bkID }
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" 
              onClick={() => { window.open(`/dashboard/catalog/books/view/${book.bkID}`, '_blank')}}>
              View 
            </Button>
            <Button
              onClick={() => addBookSubject(bibWithId, subjectid)}
            size="sm">
              Add
            </Button>
          </div>
        )
      },
    },
  ]
  



  return (
    <div className="grid w-full m-5">
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end">
          {loading ? "..." : `${books.length} results`}
        </InputGroupAddon>
      </InputGroup>

        {books.length > 0 &&  <BookDataTable columns={CollectionColumns} data={books} />}


       

       
    </div>
  );
}
