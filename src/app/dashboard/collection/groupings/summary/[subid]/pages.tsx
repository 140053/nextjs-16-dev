import SummaryClient from "./summarycl";
import { getCopyrightRaw } from "@/components/part/no-api/collection-master";




export default async function Page({ params }: { params: { subid: number } }) {
  const { subid } = params;
  

  const result = await getCopyrightRaw(subid);
  const data = Array.isArray(result.data) ? result.data : [];

  return (
    <SummaryClient data={data} />
  );
}
