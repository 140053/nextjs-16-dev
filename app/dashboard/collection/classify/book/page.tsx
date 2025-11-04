import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardPage from "@/components/dashboardpage";

import { AddBookBySubForm } from "@/components/collection/CollectionUI";
import { Card } from "@/components/ui/card";

export default async function Page() {
  const user = await getSession();
  if (!user) redirect("/login");

  return (
    <DashboardPage
      title="Dashboard"
      parent="Collection Management"
      parentHref="#"
    >
      <Card className="m-5 p-4">
        <h1>Collection Management - Classify</h1>
      </Card>
      <div className="flex flex-col justify-center m-5 max-w-full">
        <AddBookBySubForm />
      </div>
    </DashboardPage>
  );
}
``;
