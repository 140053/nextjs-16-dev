

import { prisma } from "@/lib/prisma"



export async function getAllPatrons() {
    try {
        const patrons = await prisma.patron_master.findMany()
        return patrons
    } catch (error) {
        console.error("❌ Error fetching patrons:", error)
        throw new Error("Failed to fetch patrons")
    } 
}


export async function getAllBooks() {
    try {
        const books = await prisma.books.findMany(
            {
                where: {
                    branch: {
                        contains: "Pili%"
                    },
                    tm: {
                        contains: "book"
                    }
                },
                //take: 1000,
                select:{
                    bkID: true,
                    Title: true,
                    Maintext: true,
                    coding: true,
                    filsts:true,
                    updated_by:true,

                }
            }
        )
        return books.map((book) => ({
            ...book,
            bkID: Number(book.bkID), // ✅ fix bigint → number
        }))

    } catch (error) {
        console.error("❌ Error fetching patrons:", error)
        throw new Error("Failed to fetch patrons")
    }
    
}


export async function getBookById(id: number) {
    try {
        const book = await prisma.books.findFirst({
            where: {
                bkID: BigInt(id),   // ✅ convert incoming id → bigint
                branch: {
                    contains: "Pili%"
                },
                tm: {
                    contains: "book"
                }
            },
            
        });

        if (!book) return null;

        return {
            ...book,
            bkID: Number(book.bkID), // ✅ fix bigint → number
        };

    } catch (error) {
        console.error("❌ Error fetching book:", error);
        throw new Error("Failed to fetch book");
    } 
}



