"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patronMasterSchema } from "@/ZodSchema/patronMasterSchema";
import { z } from "zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  AtSign,
  IdCardLanyard,
  MapPinHouse,
  School,
  Transgender,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type PatronMasterForm = z.infer<typeof patronMasterSchema>;

export default function PatronMasterEditForm() {
  const form = useForm<PatronMasterForm>({
    resolver: zodResolver(patronMasterSchema),
    defaultValues: {
      gender: "Other",
      telephone: "None",
    },
  });

  const { handleSubmit, control, register, formState } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: PatronMasterForm) => {
    console.log("Form Data:", data);
    // TODO: send to API
    // await fetch("/api/patron", { method: "PUT", body: JSON.stringify(data) })
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
        {/* Name */}
        <div>
          <InputGroup>
            <InputGroupInput
              placeholder="Name..."
              {...register("name")}
              className="input"
            />
            <InputGroupAddon>
              <User />
            </InputGroupAddon>
          </InputGroup>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Address */}
        <div>
          <InputGroup>
            <InputGroupInput
              placeholder="Address..."
              {...register("address")}
              className="input"
            />
            <InputGroupAddon>
              <MapPinHouse />
            </InputGroupAddon>
          </InputGroup>
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* ID Number */}
        <div>
          <InputGroup>
            <InputGroupInput
              placeholder="ID Number..."
              {...register("IDnum")}
              className="input"
            />
            <InputGroupAddon>
              <IdCardLanyard />
            </InputGroupAddon>
          </InputGroup>
          {errors.IDnum && (
            <p className="text-red-500">{errors.IDnum.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <InputGroup>
            <InputGroupInput
              placeholder="Email..."
              {...register("email")}
              className="input"
            />
            <InputGroupAddon>
              <AtSign />
            </InputGroupAddon>
          </InputGroup>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Gender (fixed as ShadCN Select + icon) */}
        <div className="">
          <InputGroup>
                <Select {...register("gender")} >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <InputGroupAddon>
                  <Transgender className="mr-2" />
                </InputGroupAddon> 
          </InputGroup> 
          {errors.gender && (
            <p className="text-red-500 mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Campus */}
        <div>
          <InputGroup>
            <InputGroupInput
              placeholder="Campus..."
              {...register("campus")}
              className="input"
            />
            <InputGroupAddon>
              <School />
            </InputGroupAddon>
          </InputGroup>
          {errors.campus && (
            <p className="text-red-500">{errors.campus.message}</p>
          )}
        </div>

        {/* Telephone */}
        <div>
          <InputGroup>
            <InputGroupInput
              placeholder="Telephone..."
              {...register("telephone")}
              className="input"
            />
          </InputGroup>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
