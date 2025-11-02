import { prisma } from "@/lib/prisma"



export async function getAllCollege() {

    try {
        const data = await prisma.colleges.findMany({
            select: {
                id: true,
                name: true,
                code: true
            }
        })
        return data
    } catch (error) {
        console.error("❌ Error fetching patrons:", error)
    } finally {
        await prisma.$disconnect();
    }
}

export async function getAllCourse() {

    try {
        const data = await prisma.courses.findMany({
            select: {
                id: true,
                name: true,
                code: true,
                colleges: {
                    select: {
                        name: true,
                        code: true
                    }
                }
            }
        })
        // ✅ Map to your UI type
        return data

    } catch (error) {
        console.error("❌ Error fetching patrons:", error)
    } finally {
        await prisma.$disconnect();
    }
}

export async function getCourseByCollege( collegeid:number) {   

    try {
        const data = await prisma.courses.findMany({
            where: {
                college_id: collegeid
            },
            select: {
                id: true,
                name: true,
                code: true,
                colleges: {
                    select: {
                        name: true,
                        code: true
                    }
                }
            }
        })
        // ✅ Map to your UI type
        return data

    } catch (error) {
        console.error("❌ Error fetching patrons:", error)
    } finally {
        await prisma.$disconnect();
    }
}




export async function getAllSubject() {

    try {
        const data = await prisma.subjects.findMany({
            select: {
                id: true,
                name: true,
                code: true,
                courses: {
                    select: {
                        name: true,
                        code: true
                    }
                }
            }
        })
        return data
    } catch (error) {
        console.error("❌ Error fetching patrons:", error)
    } finally {
        await prisma.$disconnect();
    }
}


export async function getSubjectByCourse(courseid:number) {

    try {
        const data = await prisma.subjects.findMany({
            where:{
                course_id: courseid
            },
            select: {
                id: true,
                name: true,
                code: true,
                courses: {
                    select: {
                        name: true,
                        code: true
                    }
                }
            }
        })
        return data
    } catch (error) {
        console.error("❌ Error fetching patrons:", error)
    } finally {
        await prisma.$disconnect();
    }
}


