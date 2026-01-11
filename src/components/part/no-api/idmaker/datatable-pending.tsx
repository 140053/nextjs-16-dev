import { forPendningColumn, idPatron } from "@/components/custom/idmaker-columns";
import { DataTable } from "@/components/custom/data-table";
import { getAllPending } from "@/lib/utils/idmaker";



export default async function IdmakerPending() {
  const data: idPatron[] = (await getAllPending()) ?? []; 

  return (
    <div className="p-6">
    
      <DataTable columns={forPendningColumn} data={data} toolbar="idnum"/>
    </div>
  );
}
