"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PhotoCrop from "./PhotoCrop";
import PhotoUpload from "./PhotoUpload";
import toast from "react-hot-toast";
import RemoveBgWithCrop from "./RemoveBg";
import {useRouter} from "next/navigation"



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
  urlDst: string | "";
  btntxt: string;
  removebgAPI: string
  fromsts: () => void
  
}

export default function AddPatron({ patronData, addUser, addSign, urlDst, btntxt , fromsts, removebgAPI}: AddPatronProps) {
  
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
  const [esig, setEsigSTS] = useState(false)
  //console.log(urlDst)
  const router = useRouter();

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
      const response = await fetch("/api/db/patron", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if(response.ok){
       
        
          toast.success(`Success: ${data.message}`)
          router.push(urlDst)
          fromsts()
      }
     
     


      


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
    
      <div className="w-full border p-5 rounded-lg bg-white overflow-y-auto ">
        <form onSubmit={handleSubmit} className="space-y-4 lg:w-11/12 mt-3 mb-3 m-5 text-black">
          <p className="text-sm font-thin italic ">Name: &lt; Note! Name Format should be &apos;Firstname Middle Initial Lastname &apos; Sample: &apos; Juan R. Reyes &apos; &gt;</p>        
          <Input className="" type="text" name="name" placeholder="Name" value={formData.name || ""} onChange={handleChange} />
          <p className="text-sm font-thin italic">Address: &lt; Note: Format barangay, municipality, province &gt; </p>
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
                <option value="Doctor of Philosophy in Development Education">Doctor of Philosophy in Development Education</option>
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
          <p className="text-sm font-thin italic">Student Number: &nbsp; Format: &lt; PIL-**-**** &gt; </p>
          <Input type="text" name="IDnum" placeholder="Student Number" value={formData.IDnum } onChange={handleChange}  readOnly/>
          <p className="text-sm font-thin italic">Email: &lt; use Institutional email &gt; </p>
          <Input type="email" name="email" placeholder="Email" value={formData.email || ""} onChange={handleChange} />        
          <Input className="hidden" type="text" name="gender" placeholder="Gender" value={formData.gender || ""} onChange={handleChange} />
          <Input className="hidden" type="text" name="campus" placeholder="Campus" value={formData.campus || ""} onChange={handleChange} />
          <p className="text-sm">Phone Number:</p>
          <Input type="text" name="telephone" placeholder="Telephone" value={formData.telephone || ""} onChange={handleChange} />
        
          <Input type="hidden" name="uid" value={formData.id || ""} onChange={handleChange} />

          
          <div className="gap-2">
          {addUser &&
            <div className=" border p-5 rounded-lg mb-2">
              

              <h1>Add User Photo</h1>
              <h3>*Note: Patron’s attire should match their most recent ID photo on a white background.</h3>
              <PhotoCrop uploadPath="/api/upload/user" filenameLabel="ID Photo" fileName={formData.IDnum} />
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

          <RemoveBgWithCrop  uploadPath={"/api/upload/esig"} fileName={formData.IDnum} removebgAPI={removebgAPI} onValidate={(sts) => setEsigSTS(sts)}  />

            {esig && 
              <div className="flex justify-center border mt-2">
                <Image src={"/uploads/esig/" + formData.IDnum + ".png"} width={150} height={150} className="bg-white" alt="esignature" />

              </div>
            }
          </div>
          

          <Button className="button-class w-full text-white bg-green-800" variant="outline" type="submit">
            {btntxt}
          </Button>
        </form>
      </div>
    
  );
}
