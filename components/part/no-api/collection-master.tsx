import { prisma } from "@/lib/prisma";

export async function getAllCollege() {
  try {
    const data = await prisma.colleges.findMany({
      select: {
        id: true,
        name: true,
        code: true,
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Error fetching data:", error);
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
            code: true,
          },
        },
      },
    });
    // ✅ Map to your UI type
    return data;
  } catch (error) {
    console.error("❌ Error fetching patrons:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCourseByCollege(collegeid: number) {
  try {
    const data = await prisma.courses.findMany({
      where: {
        college_id: collegeid,
      },
      select: {
        id: true,
        name: true,
        code: true,
        colleges: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });
    // ✅ Map to your UI type
    return data;
  } catch (error) {
    console.error("❌ Error fetching patrons:", error);
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
            code: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Error fetching patrons:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getSubjectByCourse(courseid: number) {
  try {
    const data = await prisma.subjects.findMany({
      where: {
        course_id: courseid,
      },
      select: {
        id: true,
        name: true,
        code: true,
        courses: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Error fetching patrons:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getBookBySubjects(subjectid: number) {
  try {
    const data = await prisma.collection_by_subjects.findMany({
      where: {
        subject_id: subjectid,
      },
      select: {
        id: true,
        bkid: true,
        title: true,
        author: true,
        contributor: true,
        publisher: true,
        copyrights: true,
        isbn: true,
        call_number: true,
        accession_number: true,
        edition: true,
        place_of_publication: true,
        material_type: true,
        code: true,
        is_fil: true,
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Error fetching patrons:", error);
  } finally {
    await prisma.$disconnect();
  }
}
