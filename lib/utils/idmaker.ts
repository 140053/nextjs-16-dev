"use server"
import  { prisma } from "@/lib/prisma"
import { truncate } from "fs";

function logError(err: unknown){
    console.error("❌ Error fetching patrons:", err)
}


export async function getAllRequest(){
    try {
        const data = await prisma.lib_request.findMany({         
            select:{
                id: true,
                patron_id: true,
                photo: true,
                esig: true,
                reg_date: true,
                patron:{
                    select: {
                        name: true,
                        address: true,
                        IDnum: true,                       
                        telephone: true,
                        Degree_Course:true,
                        email: true,
                        gender: true
                    }
                }
            },
           
        });
        return data
    }catch(error){
        logError(error)        
    }
}


export async function getAllPending(){
    try {
        const data = await prisma.lib_pending.findMany({         
            select:{
                id: true,
                patron_id: true,
                photo: true,
                esig: true,
                reg_date: true,
                patron:{
                    select: {
                        name: true,
                        address: true,
                        IDnum: true,                       
                        telephone: true,
                        Degree_Course:true,
                        email: true,
                        gender: true
                    }
                }
            },
           
        });
        return data
    }catch(error){
        logError(error)        
    }
}


export async function getallForPrint(){
    try {
        const data = await prisma.lib_forprint.findMany({         
            select:{
                id: true,
                patron_id: true,              
                reg_date: true,
                patron:{
                    select: {
                        name: true,
                        address: true,
                        IDnum: true,                       
                        telephone: true,
                        Degree_Course:true,
                        email: true,
                        gender: true,
                        photo: true,
                        esig: true
                    }
                }
            },
           
        });
        return data
    }catch(error){
        logError(error)        
    }
}



export async function getAllPrinted(){
    try {
        const data = await prisma.libman_patron.findMany({         
            select:{
                id: true,
                patron_id: true,             
                reg_date: true,
                patron:{
                    select: {
                        name: true,
                        address: true,
                        IDnum: true,                       
                        telephone: true,
                        Degree_Course:true,
                        email: true,
                        gender: true,
                        photo: true,
                        esig: true
                    }
                }
            },
           
        });
        return data
    }catch(error){
        logError(error)        
    }
}


export async function patroninfo(sid:string) {

    try {
        const data = await prisma.lib_request.findFirst({
            where:{
                patron_id: sid
            },
            include:{
                patron: {
                    select: {
                        gender: true
                    }
                }
            }
            
        })

        return data
    }catch(err: unknown){
        logError(err)
    }
    
}


export async function ForPrint(sid:string) {
    try {

        //1. check if the id exist 
        const a = await  prisma.lib_request.findFirst({
            where:{
                patron_id: sid
            }
        })

        if(!a){
            return false
        }

        //2. update patron_master fill the photo and esig and add a record in lib_forprint
        const b = await prisma.patron_master.update({
            where:{
                IDnum: sid
            },
            data: {               
                name: a.name,
                address: a.address,
                Degree_Course: a.Degree_Course,
                telephone: a.telephone,
                photo: a.photo,
                esig: a.esig,
            },
        })

        if(!b){
            return false
        }

        //3. insert entry for for print 
        const c = await prisma.lib_forprint.create({
            data:{
                patron_id: a.patron_id,              

            }
        })

        if(!c){
            return false
        }
        // 4. delete entry for lib_request 
        const d = await prisma.lib_request.delete({
            where:{
               id: a.id
            }
        })

        if(!d){
            return false
        }

       return true

    }catch(err: unknown){
        logError(err)
    }
}