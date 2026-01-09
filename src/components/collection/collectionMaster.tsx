import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { CollectionTable } from "./data-table/data-table";
import { CollegeColumns, OtherColumns, SubjectCols } from "./data-table/col-table";
import { getAllCollege, getAllCourse, getAllSubject } from "@/components/part/no-api/collection-master";


export default async function CollectionMaster() {
    const college = await getAllCollege();
    const program = await getAllCourse();
    const subject = await getAllSubject();



    return (
        <Card>
            <CardHeader>
                <CardTitle>Collection Groupings Master</CardTitle>
            </CardHeader>
            <CardContent className="">
                <Tabs defaultValue="college" className="w-full">
                    <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger className="w-full" value="college">College</TabsTrigger>
                        <TabsTrigger className="w-full" value="program">Program</TabsTrigger>
                       
                        <TabsTrigger className="w-full" value="subject">Subject</TabsTrigger>
                    </TabsList>

                    {/* Tabs Content... */}
                    <TabsContent value="college">                        
                            <CollectionTable columns={CollegeColumns} data={college ?? []}  />                        
                    </TabsContent>

                    <TabsContent value="program">                        
                            <CollectionTable columns={OtherColumns} data={program ?? []}  />                        
                    </TabsContent>

                    

                     <TabsContent value="subject">                        
                            <CollectionTable columns={SubjectCols} data={subject ?? []}  />                        
                    </TabsContent>

                </Tabs>

            </CardContent>
        </Card>

    );
}