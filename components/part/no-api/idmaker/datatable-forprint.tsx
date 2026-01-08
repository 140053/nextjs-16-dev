import { forPrintColumn } from "@/components/custom/idmaker-columns";
import { DataTable } from "@/components/custom/data-table";
import { getallForPrint } from "@/lib/utils/idmaker";
import { IdMakerForPrintTypes } from "@/types/Patron";



export default async function IdmakerForPrint() {
  const data: IdMakerForPrintTypes[] = (await getallForPrint()) ?? []; 

  return (
    <div className="p-6">
    
      <DataTable columns={forPrintColumn} data={data} toolbar="idnum"/>
    </div>
  );
}
