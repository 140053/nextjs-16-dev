

import { columns, Book } from "@/components/custom/books";
import { BookDataTable } from "@/components/custom/book-data-table";
import { getAllBooks } from "@/lib/utils/patron";


export default async function BookMaster() {
  const data: Book[] = await getAllBooks(); // ✅ Direct Prisma call
 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Book List</h1>
       <BookDataTable columns={columns} data={data} /> 
    </div>
  );
}
