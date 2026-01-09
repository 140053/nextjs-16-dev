"use client";

import { useEffect, useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import { FormData, stepFourSchema, stepOneSchema, stepThreeSchema, stepTwoSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { PatronIntf } from "@/types/Patron";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";


const steps = ["Student Information", "Course", "Upload Photo", "Upload Signature" ,  "Review"];



const defaultData: FormData = {    
    id: 0,
    name: "",
    address: "",
    College: "",
    Degree_Course: "",
    User_Class: "",
    Year_Level: "",
    IDnum: "",
    email: "",
    gender: "",
    campus: "",
    telephone: "" as string ,
    photo: "",
    esig: "",   
}

interface pageProp{
    patron: PatronIntf
}

export default function MultiStepForm({patron}: pageProp) {
  
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(patron || defaultData);

  

  const update = (data: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...data }));

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  

  const next = () => {
    let result;
    console.log(formData)

    if (step === 0) result = stepOneSchema.safeParse(formData);
    if (step === 1) result = stepTwoSchema.safeParse(formData);
    if (step === 2) result = stepThreeSchema.safeParse(formData);
    if (step === 3) result = stepFourSchema.safeParse(formData);

    if (result && !result.success) {
      const fieldErrors: Record<string, string> = {};
        
      for (const issue of result.error.issues){
        const key = issue.path[0];
        if (typeof key === "string"){
            fieldErrors[key] = issue.message
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStep((s) => s + 1);
  };


  const HandleSubmit = async (form: FormData) => {

    //console.log(form)
    try{
      const r = await fetch("/api/db/patron/idmaker/request", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(form)
      });

      if(!r.ok){
        console.log("error")
      }

      //Make Redirect later 



    }catch(err:unknown){ console.log(`Error: ${err}`) }

  }





  return (
    <div className="w-full  rounded-2xl border p-6 shadow-sm shadow-gray-800">
      {/* Progress */}
      <div className="flex justify-between mb-6 text-sm gap-1  ">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`flex-1 text-center text-black p-3 shadow-md shadow-gray-400  ${
              i <= step ? "font-semibold bg-green-500 rounded-md hover:text-white" : "text-gray-300 bg-gray-600 rounded-lg"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Steps */}
      {step === 0 && (
        <StepOne data={formData} errors={errors} onChange={update} />
      )}
      {step === 1 && (
        <StepTwo data={formData} errors={errors} onChange={update} />
      )}
      {step === 2 && (
        <StepThree data={formData} errors={errors} onChange={update} />
      )}
       {step === 3 && (
        <StepFour data={formData} errors={errors} onChange={update} removebgAPI={"http://127.0.0.1:4001/removebg/"}  />
      )}
      {step === 4 && (
        <StepFive data={formData}  />
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={back}
          disabled={step === 0}
          className="px-4 py-2 rounded-lg border-2 border-gray-900 disabled:opacity-40 text-black"
        >
          Back
        </Button>

        {step < steps.length - 1 ? (
          <button
            onClick={next}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => HandleSubmit(formData)}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
