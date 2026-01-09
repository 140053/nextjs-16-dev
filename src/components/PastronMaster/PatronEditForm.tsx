"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patronMasterSchema } from "@/ZodSchema/patronMasterSchema";
import { z } from "zod";

export type PatronMasterForm = z.infer<typeof patronMasterSchema>;

export default function PatronMasterEditForm() {
  const form = useForm<PatronMasterForm>({
    resolver: zodResolver(patronMasterSchema),
    defaultValues: {
      gender: "Other",
      telephone: "None",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: PatronMasterForm) => {
    console.log("Form Data:", data);

    // TODO: send to API
    // await fetch("/api/patron", { method: "PUT", body: JSON.stringify(data) })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      
      <div>
        <label>Name</label>
        <input {...register("name")} className="input" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label>Address</label>
        <input {...register("address")} className="input" />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
      </div>

      <div>
        <label>ID Number</label>
        <input {...register("IDnum")} className="input" />
        {errors.IDnum && <p className="text-red-500">{errors.IDnum.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...register("email")} className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label>Gender</label>
        <select {...register("gender")} className="input">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
      </div>

      <div>
        <label>Campus</label>
        <input {...register("campus")} className="input" />
        {errors.campus && <p className="text-red-500">{errors.campus.message}</p>}
      </div>

      <div>
        <label>Telephone</label>
        <input {...register("telephone")} className="input" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
