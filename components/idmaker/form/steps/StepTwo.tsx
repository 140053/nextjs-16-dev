import { Label } from "@/components/ui/label";
import { FormData } from "../schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface College {
  id: number;
  name: string;
  code: string;
  
}

type Course = {
  id: number | bigint;
  name: string;
  code: string;
  colleges: {
    id: number | bigint;
    name: string;
    code: string;
  };
};

export default function StepTwo({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: Record<string, string>;
  onChange: (data: Partial<FormData>) => void;
}) {
  const [colleges, setColleges] = useState<College[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
   
  
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
    

  // get College from the db 
  ///api/db/collection/colleges

  /* LOAD COLLEGES --------------------------- */
  useEffect(() => {
    fetch("/api/db/collection/colleges")
      .then((res) => res.json())
      .then((json) => setColleges(json.data ?? []));
  }, []);

  /* LOAD COURSES --------------------------- */
  useEffect(() => {
    if(!selectedCollege) return;
    fetch("/api/db/collection/course")
      .then((res) => res.json())
      .then((json) => setCourses(json.data ?? []));
  }, [selectedCollege]);

 /* FILTER COURSES BASED ON COLLEGE */
  const filteredCourses = selectedCollege
    ? courses.filter((crs) => String(crs.colleges.code) === selectedCollege)
    : [];


  




  
  return (
    <div className="space-y-4">
      <div className=" space-y-2 mx-auto w-full text-black shadow-md shadow-gray-400 rounded-lg ">
        <Label>Filter by College</Label>
        <Select
            value={data.College ?? selectedCollege}            
            onValueChange={(v) => {              
              setSelectedCollege(v);
              setSelectedCourse("");
              onChange({ College: v })  
              
            }}
        >
          <SelectTrigger>
            <SelectValue
              className="  border-2 border-black"
              placeholder="All colleges"
            >
              
             </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-full">
             {colleges.map((clg) => (
              <SelectItem key={clg.id.toString()} value={String(clg.code)}>
                {clg.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
          {errors.College && (
                  <p className="text-red-500 text-sm mt-1">{errors.College}</p>
          )}
      </div>

      <div>
        <label className="block mb-2.5 text-sm font-medium text-heading text-black">
          Course: &nbsp;<span className=" font-thin text-sm"> </span>
        </label>
        <div className="flex shadow-md rounded-md text-black border-black shadow-gray-600 ">
          <Select
           value={data.Degree_Course}
            onValueChange={(v) => {
              setSelectedCourse(v);
              onChange({ Degree_Course: v })            
            }}
          disabled={!selectedCollege}
          >
            <SelectTrigger>
              <SelectValue
                className="  border-2 border-black"
                placeholder="All colleges"
              > { data.Degree_Course } </SelectValue>
            </SelectTrigger>
            <SelectContent className="w-full">
              {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <SelectItem
                  key={course.id.toString()}
                  value={String(course.name)}
                >
                  {course.name}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-muted-foreground">No courses found</div>
            )}
            </SelectContent>
          </Select>
        </div>
        {errors.Degree_Course && (
          <p className="text-red-500 text-sm mt-1">{errors.Degree_Course}</p>
        )}
      </div>
    </div>
  );
}