"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { PatronIntf } from "@/types/Patron";

interface ApiResponse {
  message: string;
  data: PatronIntf[];
}

interface IdvalidateProps {
  apiURL: string;
  onValidate: (data: PatronIntf | null) => void;

}

export default function Idvalidate({ apiURL, onValidate }: IdvalidateProps) {
  const [IDnum, setIDnum] = useState<string>("");
  const [userData, setUserData] = useState<PatronIntf | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //const [Value, setValue ] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!IDnum.trim()) {
      setError("Please enter a student number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${apiURL}${encodeURIComponent(IDnum)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: 'no-store'
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result: ApiResponse = await response.json();

      if (result.data.length > 0) {
        const fetchedUser = result.data[0];
        //console.log("Fetched user data:", fetchedUser);
        toast.success('Student Number Found!');
        setUserData(fetchedUser);
        onValidate(fetchedUser);
      } else {
        setError("No data found for the given ID number.");
        setUserData(null);
        onValidate(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error('Student ID not found!');
      setError("");
    } finally {
      setLoading(false);
    }
  };

  //const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
  //  setValue(e.target.value.toUpperCase());
  //}

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="">
        <div className="flex  items-center gap-2">
          <Input
            type="text"
            placeholder="Enter Student Number"
            value={IDnum}
            onChange={(e) => setIDnum(e.target.value.toLocaleUpperCase())}
            disabled={loading}
            className="flex-1 dark:text-green-900 shadow-md shadow-gray-600 border-2"
          />
          <Button variant="default" type="submit" disabled={loading} className=" bg-green-400 hover:bg-green-800 text-white shadow-amber-200 shadow-md">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>

      {error && (
        <p className="mt-2 text-sm text-red-600" aria-live="polite">{error}</p>
      )}

      {userData && (
        <div className="mt-4 p-4 border rounded bg-gray-50 hidden">
          <h3 className="text-lg font-semibold">Student Information</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Student Number:</strong> {userData.IDnum}</p>
          <p><strong>Course:</strong> {userData.Degree_Course}</p>
          <p><strong>Campus:</strong> {userData.campus}</p>
          <p><strong>Year Level:</strong> {userData.Year_Level}</p>
          {userData.Overdue && <p className="text-red-600"><strong>Overdue:</strong> {userData.Overdue}</p>}
        </div>
      )}
    </div>
  );
}
