

import { columns, Patron } from "@/components/custom/columns";
import { DataTable } from "@/components/custom/data-table";
import { getAllPatrons } from "@/lib/utils/patron";


export default async function PatronMaster() {
  const data: Patron[] = await getAllPatrons(); // ✅ Direct Prisma call

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Patron List</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
