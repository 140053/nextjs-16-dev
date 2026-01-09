import { z } from "zod";

export const patronMasterSchema = z.object({
  id: z.number().int().positive().optional(),

  name: z.string().min(1).max(255),
  address: z.string().min(1).max(255),
  Degree_Course: z.string().min(1).max(255),
  User_Class: z.string().min(1).max(100),
  Year_Level: z.string().min(1).max(100),
  IDnum: z.string().min(1).max(50),

  DateApplied: z.string().max(255).nullable().optional(),
  DateExpired: z.string().max(255).nullable().optional(),

  email: z.string().email().max(255).nullable().optional(),

  gender: z.enum(["Male", "Female", "Other"]).nullable().optional(),

  campus: z.string().min(1).max(255),

  Bkloan: z.string().max(255).nullable().optional(),

  telephone: z.string().max(255).optional(), // ✅ NO default here

  Overdue: z.string().max(255).nullable().optional(),
  remarks: z.string().max(255).nullable().optional(),
  suspended: z.string().max(255).nullable().optional(),
  tag: z.string().max(255).nullable().optional(),
  photo: z.string().max(150).nullable().optional(),
  esig: z.string().max(150).nullable().optional(),

  reg_date: z.date().optional(),

  College: z.string().max(100).nullable().optional(),
  Course_Code: z.string().max(50).nullable().optional(),
});
