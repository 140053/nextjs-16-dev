import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardPage from "@/components/dashboardpage";

import { AddBookBySubForm } from "@/components/collection/CollectionUI";

export default async function Page() {
  const user = await getSession();
  if (!user) redirect("/login");

  return (
    <DashboardPage
      title="Dashboard"
      parent="Collection Management"
      parentHref="#"
    >
      <div className="flex justify-center mt-5">
        <AddBookBySubForm />
      </div>
    </DashboardPage>
  );
}
