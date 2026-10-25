import { z } from "zod";
import { services } from "@/data/services";

/** Strips spaces, dashes, dots and brackets so "(08) 7010-1234" becomes "0870101234". */
export const normalisePhone = (value: string) => value.replace(/[\s\-().]/g, "");

/**
 * Australian phone numbers: mobiles (04…), landlines (02/03/07/08),
 * +61 international format, and 1300 / 1800 / 13 numbers.
 */
export function isAustralianPhone(value: string) {
  const n = normalisePhone(value);
  return /^(?:\+?61|0)[2-478]\d{8}$/.test(n) || /^1[38]00\d{6}$/.test(n) || /^13\d{4}$/.test(n);
}

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "other", label: "Something else / not sure" },
];

export const propertyTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
] as const;

export const contactMethods = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "either", label: "Either" },
] as const;

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
