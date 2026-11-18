// Server-side quote form schema (used by src/app/api/contact/route.ts).
import { z } from "zod";
import { services } from "@/data/services";
import { contactMethods, isAustralianPhone, normalisePhone, propertyTypes, type Option } from "./contact-fields";

export { contactMethods, isAustralianPhone, normalisePhone, propertyTypes };

/** Service choices for the quote form (passed to the client form as a prop). */
export const serviceOptions: Option[] = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "other", label: "Something else / not sure" },
];

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string("Please enter your name").trim().min(2, "Please enter your name").max(80, "Name is too long"),
  phone: z.string("Please enter your phone number").trim().refine(isAustralianPhone, "Please enter a valid Australian phone number"),
  email: z.string("Please enter your email").trim().max(120, "Email is too long").pipe(z.email("Please enter a valid email address")),
  suburb: z.string("Please enter your suburb").trim().min(2, "Please enter your suburb").max(60, "Suburb is too long"),
  serviceType: z.enum(serviceValues, "Please choose a service"),
  propertyType: z.enum(["residential", "commercial"], "Please choose a property type"),
  contactMethod: z.enum(["phone", "email", "either"], "Please choose a contact method"),
  message: z.string().trim().max(2000, "Message is too long (2000 characters max)").optional().default(""),
  /** Honeypot – real users never see or fill this field */
  website: z.string().optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
