/**
 * Quote form field options and validation shared by the browser form and the server API.
 * Deliberately dependency-free (no zod, no page content) so the form's JavaScript stays tiny.
 */

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

export const propertyTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
] as const;

export const contactMethods = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "either", label: "Either" },
] as const;

export interface Option {
  value: string;
  label: string;
}

export interface ContactValues {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  serviceType: string;
  propertyType: string;
  contactMethod: string;
  message: string;
  website: string;
}

export type FieldErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Client-side checks that mirror the server's zod schema (the server still re-validates). */
export function validateContact(values: ContactValues, serviceValues: string[]): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name";
  if (!values.phone.trim()) errors.phone = "Please enter your phone number";
  else if (!isAustralianPhone(values.phone)) errors.phone = "Please enter a valid Australian phone number";
  if (!values.email.trim()) errors.email = "Please enter your email";
  else if (!EMAIL.test(values.email.trim())) errors.email = "Please enter a valid email address";
  if (values.suburb.trim().length < 2) errors.suburb = "Please enter your suburb";
  if (!serviceValues.includes(values.serviceType)) errors.serviceType = "Please choose a service";
  if (values.message.length > 2000) errors.message = "Message is too long (2000 characters max)";
  return errors;
}
