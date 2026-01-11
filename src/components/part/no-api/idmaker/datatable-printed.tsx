import {
  PrintedColumn
} from "@/components/custom/idmaker-columns";
import { DataTable } from "@/components/custom/data-table";
import { getAllPrinted } from "@/lib/utils/idmaker";
import { IdMakerPrintedTypes } from "@/types/Patron";



export default async function IdmakerPrinted() {
  const data: IdMakerPrintedTypes[] = (await getAllPrinted()) ?? [];
  console.log(data)

  return (
    <div className="p-6">
      <DataTable columns={PrintedColumn} data={data} toolbar="idnum" />
    </div>
  );
}
