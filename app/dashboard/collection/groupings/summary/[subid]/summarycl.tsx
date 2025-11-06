"use client";

import { makeColumns } from "@/components/collection/data-table/col-table";
import { SummaryTable } from "@/components/collection/SummaryTable";
import DashboardPage from "@/components/dashboardpage";

type SubjectItem = {
  subject: string;
  description: string;
  years: Record<string, YearData>;
  total: FormatData;
};

type YearData = {
  printed: FormatData;
  ebooks: FormatData;
};

type FormatData = {
  T: number;
  V: number;
};

type SummaryClientProps = {
  data: SubjectItem[];
};

export default function SummaryClient({ data }: SummaryClientProps) {
  const years = Array.from(
    new Set(
      data.flatMap((d) =>
        Object.keys(d.years ?? {}).map((y) => Number(y))
      )
    )
  ).sort((a, b) => b - a);

  const columns = makeColumns(years);

  return (
    <DashboardPage
      title="Dashboard"
      parent="Collection Management"
      parentHref="#"
    >
      <div className="overflow-x-auto rounded-md border">
        <SummaryTable columns={columns} data={data} />
      </div>
    </DashboardPage>
  );
}
