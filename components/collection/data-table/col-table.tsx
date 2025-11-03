"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Value } from "@radix-ui/react-select";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CollectionCols = {
  id: bigint | number;
  name: string;
  code: string;
};

export type OtherCols = {
  id: bigint | number;
  name: string;
  code: string;
  parent?: string;
  colleges?: {
    name: string;
    code: string;
  };
  courses?: {
    name: string;
    code: string;
  };
};

export type BookList = {
  id: bigint | number;
  subject_id?: string | null; 
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
};

export const BooklistColumns: ColumnDef<BookList>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "bkid",
    header: "Book ID",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const book = row.original;
      return <div className="whitespace-normal wrap-break-word">{book.title}</div>;
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => row.original.author ?? "—"
  },
  {
    accessorKey: "contributor",
    header: "Contributor",
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
  },
  {
    accessorKey: "copyrights",
    header: "Copyright",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "call_number",
    header: "Call Number",
  },
  {
    accessorKey: "accession_number",
    header: "Accession Number",
  },
  {
    accessorKey: "edition",
    header: "Edition",
  },
  {
    accessorKey: "place_of_publication",
    header: "Place of Publication",
  },
  {
    accessorKey: "material_type",
    header: "Material Type",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "is_fil",
    header: "Is FIL?",
    cell: ({ row }) => <span>{row.original.is_fil ? "Yes" : "No"}</span>,
  },
];

export const CollegeColumns: ColumnDef<CollectionCols>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const book = row.original;
      return <div className="whitespace-normal wrap-break-word">{book.name}</div>;
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div>
          <ButtonGroup>
            <ButtonGroup className="hidden sm:flex">
              <Button
                onClick={() => {
                  window.location.href =
                    "/dashboard/collection/groupings/college/" + id; //add id here
                }}
                variant="outline"
                size="icon"
                aria-label="Go Back"
              >
                <Eye />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Edit</Button>
              <Button variant="outline">Delete</Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      );
    },
  },
];

export const OtherColumns: ColumnDef<OtherCols>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const book = row.original;
      return <div className="whitespace-normal wrap-break-word">{book.name}</div>;
    },
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
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div>
          <ButtonGroup>
            <ButtonGroup className="hidden sm:flex">
              <Button
                onClick={() => {
                  window.location.href =
                    "/dashboard/collection/groupings/course/" + id; //add id here
                }}
                variant="outline"
                size="icon"
                aria-label="Go Back"
              >
                <Eye />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Edit</Button>
              <Button variant="outline">Delete</Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      );
    },
  },
];

export const SubjectCols: ColumnDef<OtherCols>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const book = row.original;
      return <div className="whitespace-normal wrap-break-word">{book.name}</div>;
    },
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
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div>
          <ButtonGroup>
            <ButtonGroup className="hidden sm:flex">
              <Button
                onClick={() => {
                  window.location.href =
                    "/dashboard/collection/groupings/list/" + id; //add id here
                }}
                variant="outline"
                size="icon"
                aria-label="Go Back"
              >
                <Eye />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Edit</Button>
              <Button variant="outline">Delete</Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      );
    },
  },
];
