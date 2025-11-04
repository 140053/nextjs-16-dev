"use client";

import { ArrowRightIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import { useState, useEffect } from "react";
import { SearchBar } from "../custom/searchBar";

/* TYPES --------------------------- */
type College = {
  id: number | bigint;
  name: string;
  code: string;
};

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

type Subject = {
  id: number | bigint;
  name: string;
  code: string;
  courses: {
    id: number | bigint;
    name: string;
    code: string;
  };
};

export function AddBookBySubForm() {
  /* STATE --------------------------- */
  const [colleges, setColleges] = useState<College[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  /* LOAD COLLEGES --------------------------- */
  useEffect(() => {
    fetch("/api/db/collection/colleges")
      .then((res) => res.json())
      .then((json) => setColleges(json.data ?? []));
  }, []);

  /* LOAD COURSES --------------------------- */
  useEffect(() => {
    fetch("/api/db/collection/course")
      .then((res) => res.json())
      .then((json) => setCourses(json.data ?? []));
  }, []);

  /* LOAD SUBJECTS --------------------------- */
  useEffect(() => {
    fetch("/api/db/collection/subject")
      .then((res) => res.json())
      .then((json) => setSubjects(json.data ?? []));
  }, []);

  /* FILTER COURSES BASED ON COLLEGE */
  const filteredCourses = selectedCollege
    ? courses.filter((crs) => String(crs.colleges.code) === selectedCollege)
    : [];

  /* ✅ FILTER SUBJECTS BASED ON SELECTED COURSE */
  const filteredSubjects = selectedCourse
    ? subjects.filter(
        (sub) => String(sub.courses.code) === String(selectedCourse)
      )
    : [];

  return (
    <div className="flex flex-col justify-center ">
      <ButtonGroup className="w-full">
        {/* ✅ SELECT COLLEGE */}
        <Select
          value={selectedCollege}
          onValueChange={(v) => {
            setSelectedCollege(v);
            setSelectedCourse("");
            setSelectedSubject("");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select College">
              {selectedCollege}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {colleges.map((clg) => (
              <SelectItem key={clg.id.toString()} value={String(clg.code)}>
                {clg.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ✅ SELECT COURSE (filtered by college) */}
        <Select
          value={selectedCourse}
          onValueChange={(v) => {
            setSelectedCourse(v);
            setSelectedSubject("");
          }}
          disabled={!selectedCollege}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Course">
              {selectedCourse}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <SelectItem
                  key={course.id.toString()}
                  value={String(course.code)}
                >
                  {course.name}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-muted-foreground">No courses found</div>
            )}
          </SelectContent>
        </Select>

        {/* ✅ SELECT SUBJECT (filtered by course) */}
        <Select
          value={selectedSubject}
          onValueChange={setSelectedSubject}
          disabled={!selectedCourse}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>

          <SelectContent>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((sub) => (
                <SelectItem key={sub.id.toString()} value={String(sub.id)}>
                  {sub.code} - {sub.name}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-muted-foreground">
                No subjects found for this course
              </div>
            )}
          </SelectContent>
        </Select>
      </ButtonGroup>


      <ButtonGroup className="w-full">     
       
        <SearchBar subjectid={selectedSubject}  />
      </ButtonGroup>
    </div>
  );
}
