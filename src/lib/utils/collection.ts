import { prisma } from "@/lib/prisma"


export async function getAllCollege(){
    try{

        const data = prisma.colleges.findMany({
            select:{
                id:true,
                name:true,
                code:true
            }
        })
        return data

    }catch(error){
        console.log("❌ Error fetching data:", error)
        throw new Error("Failed to fetch data")
    }
}