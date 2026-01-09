import { z } from "zod";

export const stepOneSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Name Should not be empty"),
  address: z.string().min(5, "Should not be empty."),
  email: z.email({
    pattern: /^[a-zA-Z0-9._%+-]+@cbsua\.edu\.ph$/i,
    message: "PLease use your institutional email."
  }),  
  telephone: z.string().min(11, "Invalid Phone number"),  
});

export const stepTwoSchema = z.object({
  Degree_Course: z.string().min(5, "Should not be empty."),
  College: z.string().min(2, ""),
  User_Class: z.string(),
  Year_Level: z.string(),
  IDnum: z.string().min(5, "Should not be empty"),
  gender: z.string().min(4, "Should not be empty"),
  campus: z.string().min(4, "Should not be empty"),
});


export const stepThreeSchema = z.object({
  photo: z.string()
})


export const stepFourSchema = z.object({
  esig: z.string()
})

export const fullSchema = stepOneSchema
                                .extend(stepTwoSchema.shape)
                                .extend(stepThreeSchema.shape)
                                .extend(stepFourSchema.shape);

export type FormData = z.infer<typeof fullSchema>;
