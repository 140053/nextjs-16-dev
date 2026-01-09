"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PhotoCrop from "./PhotoCrop";
import PhotoUpload from "./PhotoUpload";
import  Image  from "next/image";


// Interface for patron data
interface PatronData {
  id: number;
  name: string;
  address: string;
  Degree_Course: string;
  User_Class: string;
  Year_Level: string;
  IDnum: string;
  email: string;
  gender: string;
  campus: string;
  telephone: string | null;
 
}

interface AddPatronProps {
  patronData: PatronData | null;
  addUser: boolean;
  addSign: boolean;
  urlDst: string;
  
}

export default function EditProfileByid({ patronData, addUser, addSign, urlDst }: AddPatronProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<PatronData>({
    id: 0,
    name: "",
    address: "",
    Degree_Course: "",
    User_Class: "",
    Year_Level: "",
    IDnum: "",
    email: "",
    gender: "",
    campus: "",
    telephone: ""
    
  });

  // ✅ Prefill form data when patronData is available
  useEffect(() => {
    if (patronData) {
      setFormData(patronData);
    }
  }, [patronData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!formData.IDnum) {
      alert("Please enter the student number");
      return;
    }

    try {
      const response = await fetch("/api/db/patron/idrequest/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      alert(`Success: ${data.message}`);
      

      router.push(urlDst || "/dashboard/idmaker/request/add");


      setFormData({
        id: 0,
        name: "",
        address: "",
        Degree_Course: "",
        User_Class: "",
        Year_Level: "",
        IDnum: "",
        email: "",
        gender: "",
        campus: "",
        telephone: ""
       
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 lg:w-11/12 mt-3 mb-3">
        <p className="text-sm">Name:</p>
        <Input type="text" name="name" placeholder="Name" value={formData.name || ""} onChange={handleChange} />
        <p className="text-sm">Address:</p>
        <Input type="text" name="address" placeholder="Address" value={formData.address || ""} onChange={handleChange} />
        <p className="text-sm">Course from the Master List : {formData.Degree_Course}</p>
        <select name="Degree_Course" value={formData.Degree_Course || ""} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="">Choose...</option>
              <option value="Bachelor of Agricultural Technology">Bachelor of Agricultural Technology (BAT)</option>
              <option value="Bachelor of Science in Agroforestry">Bachelor of Science in Agroforestry (BSAF)</option>
              <option value="Bachelor of Science in Environmental Sciences">Bachelor of Science in Environmental Sciences (BSES)</option>
              <option value="Bachelor of Science in Agriculture">Bachelor of Science in Agriculture (BSA)</option>
              <option value="Bachelor of Science in Agriculture Major in Agricultural Extension">Bachelor of Science in Agriculture Major in Agricultural Extension (BSA-AGEX)</option>
              <option value="Bachelor of Science in Agriculture Major in Agronomy">Bachelor of Science in Agriculture Major in Agronomy (BSA-AGR)</option>
              <option value="Bachelor of Science in Agriculture Major in Animal Science">Bachelor of Science in Agriculture Major in Animal Science (BSA-ANSCI)</option>
              <option value="Bachelor of Science in Agriculture Major in Entomology">Bachelor of Science in Agriculture Major in Entomology (BSA-ENTOM)</option>
              <option value="Bachelor of Science in Agriculture Major in Farming Systems">Bachelor of Science in Agriculture Major in Farming Systems (BSA-FS)</option>
              <option value="Bachelor of Science in Agriculture Major in Horticulture">Bachelor of Science in Agriculture Major in Horticulture (BSA-HORT)</option>
              <option value="Bachelor of Science in Agriculture Major in Plant Pathology">Bachelor of Science in Agriculture Major in Plant Pathology </option>
              <option value="Bachelor of Science in Agriculture Major in Soil Science">Bachelor of Science in Agriculture Major in Soil Science </option>
              <option value="Bachelor of Science in Agriculture Major in Agricultural Economics">Bachelor of Science in Agriculture Major in Agricultural Economics </option>
              <option value="Bachelor of Science in Agriculture-General Curriculum Extended Tertiary Education Equivalency and Accreditation Program ">Bachelor of Science in Agriculture-General Curriculum Extended Tertiary Education Equivalency and Accreditation Program (ETEEAP)</option>
              <option value="Bachelor of Science in Biology">Bachelor of Science in Biology </option>
              <option value="Doctor of Veterinary Medicine">Doctor of Veterinary Medicine </option>
              <option value="Bachelor of Secondary Education ">Bachelor of Secondary Education </option>
              <option value="Bachelor of Secondary Education Major in English ">Bachelor of Secondary Education Major in English </option>
              <option value="Bachelor of Secondary Education Major in Mathematics ">Bachelor of Secondary Education Major in Mathematics </option>
              <option value="Bachelor of Secondary Education Major in Filipino ">Bachelor of Secondary Education Major in Filipino </option>
              <option value="Bachelor of Secondary Education Major in Science ">Bachelor of Secondary Education Major in Science </option>
              <option value="Bachelor of Secondary Education Major in Biological Science ">Bachelor of Secondary Education Major in Biological Science </option>
              <option value="Bachelor of Technical Vocational Teacher Education Agriculture Crops Production">Bachelor of Technical Vocational Teacher Education Agriculture Crops Production </option>
              <option value="Bachelor of Secondary Education Major in Physical Science and Educational Media/Technology ">Bachelor of Secondary Education Major in Physical Science and Educational Media/Technology </option>
              <option value="Bachelor of Elementary Education ">Bachelor of Elementary Education </option>
              <option value="Bachelor of Elementary Education ">Bachelor of Elementary Education</option>
              <option value="Bachelor of Science in Agribusiness ">Bachelor of Science in Agribusiness</option>
              <option value="Bachelor of Science in Agri-Ecotourism Management ">Bachelor of Science in Agri-Ecotourism Management</option>
              <option value="Bachelor of Science in Agri-Ecotourism Management ">Bachelor of Science in Tourism Management</option>
              <option value="Bachelor of Science in Agricultural Engineering">Bachelor of Science in Agricultural Engineering</option>
              <option value="Bachelor of Science in Agricultural and Biosystems Engineering">Bachelor of Science in Agricultural and Biosystems Engineering (BSABE)</option>
              <option value="Bachelor of Science in Food Technology">Bachelor of Science in Food Technology </option>
              <option value="Doctor of Phylosophy in Development Education">Doctor of Phylosophy in Development Education</option>
              <option value="Doctor of Philosophy in Plant Science major in Agronomy" >Doctor of Philosophy in Plant Science major in Agronomy/Horticulture</option>
              <option value="Doctor of Philosophy in Plant Science major in Horticulture" >Doctor of Philosophy in Plant Science major in Horticulture</option>
              <option value="Master of Science in Agricultural and Biosystems Engineering">Master of Science in Agricultural and Biosystems Engineering</option>
              <option value="Master of Science in Animal Science" >Master of Science in Animal Science (MS AS)</option>
              <option value="Master of Science in Plant Science" >Master of Science in Plant Science (MS PS)</option>
              <option value="Master of Science in Agricultural Education" >Master of Science in Agricultural Education (MS AGED)</option>
              <option value="Master of Science in Agricultural Extension">Master of Science in Agricultural Extension (MSAgExt)</option>
              <option value="Master of Science in Plant Protection major in Plant Pathology" >Master of Science in Plant Protection major in Plant Pathology</option>
              <option value="Master of Science in Plant Protection major in Entomology">Master of Science in Plant Protection major in Entomology</option>
              <option value="Master of Science in Resource Management major in Cooperative Management">Master of Science in Resource Management major in Cooperative Management</option>
              <option value="Master of Science in Resource Management major in Entrepreneurship and Environmental Management" >Master of Science in Resource Management major in Entrepreneurship and Environmental Management</option>
              <option value="Master of Science in Disaster-Risk Management">Master of Science in Disaster-Risk Management (Ladderized)</option>
              <option value="Diploma in Disaster Risk Management">Diploma in Disaster Risk Management</option>
        </select>

        <Input className="hidden" type="text" name="User_Class" placeholder="User Class" value={formData.User_Class || ""} onChange={handleChange} />
        <Input className="hidden" type="text" name="Year_Level" placeholder="Year Level" value={formData.Year_Level || ""} onChange={handleChange} />
        <p className="text-sm">Student Number:</p>
        <Input type="text" name="IDnum" placeholder="Student Number" value={formData.IDnum } onChange={handleChange} />
        <p className="text-sm">Email:</p>
        <Input type="email" name="email" placeholder="Email" value={formData.email || ""} onChange={handleChange} />        
        <Input className="hidden" type="text" name="gender" placeholder="Gender" value={formData.gender || ""} onChange={handleChange} />
        <Input className="hidden" type="text" name="campus" placeholder="Campus" value={formData.campus || ""} onChange={handleChange} />
        <p className="text-sm">Phone Number:</p>
        <Input type="text" name="telephone" placeholder="Telephone" value={formData.telephone || ""} onChange={handleChange} />
       
        <Input type="text" name="id" value={formData.id || ""} onChange={handleChange} className="hidden" />

        {formData.id && 

          <div className="flex flex-row justify-center justify-items-center gap-5">
            <div className="flex flex-col justify-center justify-items-center " >
                <Card>
                  <CardHeader>
                    <CardTitle>User Photo</CardTitle>
                    
                  </CardHeader>
                  <CardContent>  
                    <Image src={"/uploads/user/"+ formData.IDnum + ".jpg"} alt={"user photo"}  width={150} height={150} className="contain w-[150px]" />
                  </CardContent>
                </Card>
            </div>
            <div className="flex flex-col justify-center justify-items-center" >
                <Card>
                  <CardHeader>
                    <CardTitle>User Esignature</CardTitle>
                    
                  </CardHeader>
                  <CardContent>  
                  <Image src={"/uploads/esig/"+ formData.IDnum + ".png"} alt={"user photo"}  width={150} height={150} />
                  </CardContent>
                </Card>
            </div>
          </div>
          
        }

        
        <div className="gap-2">
        {addUser &&
          <div className="w-full mb-2">
            <Card>
              <CardHeader>
                <CardTitle>Add User Photo</CardTitle>
                <CardDescription>*Note: Patron attire should be on uniform and on white background.</CardDescription>
              </CardHeader>
              <CardContent>  
                <PhotoCrop uploadPath="/api/upload/user" filenameLabel="ID Photo" fileName={formData.IDnum} />
              </CardContent>
            </Card>
          </div>
          }
          {addSign &&
          <div className="w-full mb-2">
            <Card>
              <CardHeader>
                <CardTitle>Add User E-Signature</CardTitle>
                <CardDescription>
                  Note: Sign a Signature in a white paper using a large stroke of pen or marker
                </CardDescription>
              </CardHeader>
              <CardContent>                
                <PhotoUpload uploadPath="/api/upload/esig" filenameLabel="e-Signature" fileNamu={formData.IDnum} />
              </CardContent>
            </Card>
          </div>
          }

        </div>
        

        <Button className="button-class w-full" variant="outline" type="submit">
          Add a Request
        </Button>
      </form>
    </>
  );
}
