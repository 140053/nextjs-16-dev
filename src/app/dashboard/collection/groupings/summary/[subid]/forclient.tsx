"use client";

import { useEffect, useState } from "react";
import { SummaryTable } from "@/components/collection/SummaryTable";
import { makeColumns } from "@/components/collection/data-table/col-table";
import DashboardPage from "@/components/dashboardpage";
import { Card, CardHeader } from "@/components/ui/card";

type SummaryClientProps = {
  subid: number; // Receive as prop directly
};

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

export default function SummaryClient({ subid }: SummaryClientProps) {
  const [data, setData] = useState<SubjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch(`/api/db/collection/course/summary?courseId=${subid}`);
      const json = await res.json();
      setData(json.data || []);
      setLoading(false);
    }
    fetchData();
  }, [subid]);

  const years = Array.from(
    new Set(data.flatMap((d) => Object.keys(d.years ?? {}).map(Number)))
  ).sort((a, b) => b - a);

  const columns = makeColumns(years);

  return (
    <DashboardPage title="Dashboard" parent="Collection Management" parentHref="#">
      <div className="overflow-x-auto rounded-md border mt-5">
        <Card >
          <CardHeader>
            <h1 className="text-4xl">LIBRARY COLLECTION PROFILE</h1>            
          </CardHeader>
        </Card>
        <div className="mt-2">
         <SummaryTable columns={columns} data={loading ? [] : data} />
        </div>
       
      </div>
    </DashboardPage>
  );
}
