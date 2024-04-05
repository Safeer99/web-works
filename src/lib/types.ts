import { Role } from "@prisma/client";
import * as z from "zod";

export const AgencyFormSchema = z.object({
  name: z.string().min(2, { message: "Agency name must be atleast 2 chars." }),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  agencyLogo: z.string().min(1),
});

export const WorkspaceFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
});

export const WorkspacePageSchema = z.object({
  name: z.string().min(1),
  pathName: z.string().optional(),
});

export const mediaFormSchema = z.object({
  link: z.string().min(1, { message: "Media File is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export type MembersTable = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  role: Role;
  joined: Date;
};
