"use server"
import  { prisma } from "@/lib/prisma"
import { string } from "zod";
import { fa } from "zod/v4/locales";


function logError(err: unknown){
    console.error("❌ Error fetching patrons:", err)
}


export async function getAllRequest(){
    try {
        const data = await prisma.lib_request.findMany({         
            select:{
                id: true,
                patron_id: true,
                name: true,
                Degree_Course: true,
                address:true,
                photo: true,
                esig: true,
                reg_date: true,
                email: true,
                telephone: true,
                patron:{
                    select: {
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
                name: true,
                Degree_Course: true,
                address:true,
                photo: true,
                esig: true,
                reg_date: true,
                email: true,
                telephone: true,
                patron:{
                    select: {
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
                name: true,
                Degree_Course: true,
                address:true,
                photo: true,
                esig: true,
                reg_date: true,
                email: true,
                telephone: true,
                patron:{
                    select: {
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
                name: a.name,
                Degree_Course: a.Degree_Course,
                address: a.address,
                email: a.email,
                telephone: a.telephone,
                photo: a.photo,
                esig:a.esig              

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


export async function  AddToPrinted(sid: string) {
    
    try {


        //1.  check if the sid exist in the lib_forprint
        const a = await prisma.lib_forprint.findFirst({
            where: {
                patron_id: sid
            }

        })

        if(!a){
            return false
        }

        //2. update the patron master for the new record 

        const b = await prisma.patron_master.update({
            where: {
                IDnum: sid
            },
            data: {
                name: a.name,
                Degree_Course: a.Degree_Course,
                address: a.address,
                email: a.email,
                telephone: a.telephone,
                photo: a.photo,
                esig: a.esig
            }
        })

        if (!b){
            return false
        }

        const c = await prisma.libman_patron.create({
            data: {
                patron_id: a.patron_id                
            }
        })

        // 3. delete the record in forprint

        const d = await prisma.lib_forprint.delete({
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




export async function ForPending(sid:string){


    try{
        // 1. check of the sid exist on the lib_request
        const a = await prisma.lib_request.findFirst({
            where:{
                patron_id: sid
            }
        })

        if(!a){
            return(false)
        }

        // 2. insert data to lib_pending
        const b = await prisma.lib_pending.create({
            data:{
                patron_id: a.patron_id,
                photo: a.photo,
                esig: a.esig,
                Degree_Course: a.Degree_Course,
                address: a.address,
                email: a.email,
                name: a.name,
                telephone: a.telephone
            }
        })

        if (!b){
            return false
        }

        //3 . delete record form request 
        const c = await prisma.lib_request.delete({
            where:{
                id: a.id
            }
        })


        if(!c){
            return false
        }

        return true;

    }catch(err: unknown){
        logError(err)
    }
}

export async function ReturnToRequest( sid: string){
    try{
        const a = await prisma.lib_pending.findFirst({
            where: {
                patron_id: sid
            }
        })

        if(!a){
            return false;
        }

        const b = await prisma.lib_request.create({
            data: {
                patron_id: a.patron_id,
                name: a.name,
                Degree_Course: a.Degree_Course,
                address: a.address,
                email: a.email,
                telephone: a.telephone,
                photo: a.photo,
                esig:a.esig  
            }
        })

        if(!b){
            return false
        }


        const c = await prisma.lib_pending.delete({
            where: {

                id: a.id
            }
        })

        if(!c){
            return false
        }

        return true
    }catch(err: unknown){
        logError(err)
    }
}





export async function DeleteRecord(sid:number, table: string) {
    try{
        switch (table) {
            case "request":
                const a = await prisma.lib_request.delete({
                    where:{
                        id: sid
                    }
                })
                
                if(!a){
                    return false
                }               
                break;
            case "pending":    
                const p = await prisma.lib_pending.delete({
                    where:{
                        id: sid
                    }
                })
                
                if(!p){
                    return false
                }               
                break;
              case "forprint":    
                const f = await prisma.lib_forprint.delete({
                    where:{
                        id: sid
                    }
                })
                
                if(!f){
                    return false
                }               
                break;
                
        
            default:
                break;
        }



    }catch(err: unknown){
        logError(err)
    }
}