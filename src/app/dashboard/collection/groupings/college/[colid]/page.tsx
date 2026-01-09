import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { CollectionTable } from "@/components/collection/data-table/data-table"
import { OtherColumns } from "@/components/collection/data-table/col-table"
import { getCourseByCollege } from "@/components/part/no-api/collection-master"





export default async function Page({ params }: { params: Promise<{ colid: string }> }) {
  const user = await getSession()
  if (!user) redirect("/login")
  const { colid} = await params;
 const data = await getCourseByCollege(colid ? Number(colid) : 0);
  
  

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Collection Management
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>College</BreadcrumbPage>
                </BreadcrumbItem>
                 <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-5" >
            <div className="flex justify-center text-center">
              <h1 className=" font-bold text-5xl  m-3 p-5 ">
                List of Course in College
              </h1>
            </div>            
            <CollectionTable columns={OtherColumns} data={data ?? []}  />    
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
