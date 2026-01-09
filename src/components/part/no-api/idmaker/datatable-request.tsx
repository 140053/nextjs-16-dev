import { columns, idPatron } from "@/components/custom/idmaker-columns";
import { DataTable } from "@/components/custom/data-table";
import { getAllRequest } from "@/lib/utils/idmaker";



export default async function IdmakerRequest() {
  const data: idPatron[] = (await getAllRequest()) ?? []; 

  return (
    <div className="p-6">
    
      <DataTable columns={columns} data={data} toolbar="idnum"/>
    </div>
  );
}
