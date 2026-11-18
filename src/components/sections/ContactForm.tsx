"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { company } from "@/data/company";
import { contactMethods, propertyTypes, validateContact, type ContactValues, type FieldErrors, type Option } from "@/lib/contact-fields";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success";

interface ContactFormProps {
  /** Service choices – built on the server from src/data/services.ts */
  serviceOptions: Option[];
  /** Icons rendered on the server (keeps icon code out of the browser bundle) */
  icons: { arrow: ReactNode; lock: ReactNode; check: ReactNode };
}

const fieldOrder: (keyof ContactValues)[] = ["name", "phone", "email", "suburb", "serviceType", "message"];

/**
 * Quote request form – plain HTML form + a little React state (no UI library), so it loads fast
 * on every page that links to /contact. On GitHub Pages it posts to FormSubmit; on a Node server
 * it posts to /api/contact, which re-validates with zod.
 */
export default function ContactForm({ serviceOptions, icons }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  // Pre-select the service when arriving from a service page (/contact?service=fttp-installation-adelaide).
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    const select = formRef.current?.elements.namedItem("serviceType") as HTMLSelectElement | null;
    if (service && select && serviceOptions.some((o) => o.value === service)) select.value = service;
  }, [serviceOptions]);

  const readValues = (form: HTMLFormElement): ContactValues => {
    const data = new FormData(form);
    const get = (key: keyof ContactValues) => String(data.get(key) ?? "");
    return {
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      suburb: get("suburb"),
      serviceType: get("serviceType"),
      propertyType: get("propertyType") || "residential",
      contactMethod: get("contactMethod") || "either",
      message: get("message"),
      website: get("website"),
    };
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = readValues(form);
    const fieldErrors = validateContact(values, serviceOptions.map((o) => o.value));
    setErrors(fieldErrors);
    setFormError("");

    const firstInvalid = fieldOrder.find((key) => fieldErrors[key]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    const label = (options: readonly Option[], value: string) => options.find((o) => o.value === value)?.label ?? value;
    setStatus("submitting");

    try {
      if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
        // Static hosting (GitHub Pages) has no /api/contact, so the request is emailed via FormSubmit.
        if (values.website) {
          setStatus("success"); // honeypot – pretend it worked so bots don't retry
          return;
        }
        const service = label(serviceOptions, values.serviceType);
        const res = await fetch(`https://formsubmit.co/ajax/${company.quoteEmail}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `New quote request: ${service} – ${values.name} (${values.suburb})`,
            _template: "table",
            _captcha: "false",
            _replyto: values.email,
            Name: values.name,
            Phone: values.phone,
            Email: values.email,
            Suburb: values.suburb,
            Service: service,
            "Property type": label(propertyTypes, values.propertyType),
            "Preferred contact": label(contactMethods, values.contactMethod),
            Message: values.message || "—",
          }),
        });
        const data: { success?: boolean | string } = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) !== "true") throw new Error("We couldn't send your request.");
      } else {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data: { ok: boolean; error?: string; fieldErrors?: Record<string, string[]> } = await res.json();
        if (!res.ok || !data.ok) {
          if (data.fieldErrors) {
            setErrors(Object.fromEntries(Object.entries(data.fieldErrors).map(([key, list]) => [key, list[0]])) as FieldErrors);
          }
          throw new Error(data.error ?? "Something went wrong.");
        }
      }
      setStatus("success");
      form.reset();
      setMessageLength(0);
    } catch (err) {
      setStatus("idle");
      setFormError(`${err instanceof Error ? err.message : "Something went wrong."} Please call us on ${company.phone.display}.`);
    }
  };

  if (status === "success") {
    return (
      <div className={styles.result} role="status">
        <span className={styles.resultIcon}>{icons.check}</span>
        <h2 className={styles.resultTitle}>Thanks – your quote request is on its way!</h2>
        <p>
          Our team will be in touch within one business day. Need us sooner? Call{" "}
          <a href={company.phone.href}>{company.phone.display}</a>.
        </p>
        <button type="button" className="btn btn--primary" onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );
  }

  const field = (name: keyof ContactValues) => ({
    id: `quote-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `quote-${name}-error` : undefined,
  });
  const error = (name: keyof ContactValues) =>
    errors[name] ? (
      <p id={`quote-${name}-error`} className={styles.error}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-busy={status === "submitting"}>
      <fieldset disabled={status === "submitting"} className={styles.fieldset}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="quote-name">Full name</label>
            <input {...field("name")} type="text" autoComplete="name" placeholder="Jane Citizen" required maxLength={80} />
            {error("name")}
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-phone">Phone</label>
            <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="04xx xxx xxx" required />
            {error("phone")}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="quote-email">Email</label>
            <input {...field("email")} type="email" autoComplete="email" placeholder="you@example.com" required maxLength={120} />
            {error("email")}
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-suburb">Suburb</label>
            <input {...field("suburb")} type="text" autoComplete="address-level2" placeholder="e.g. Norwood" required maxLength={60} />
            {error("suburb")}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="quote-serviceType">Service required</label>
          <select {...field("serviceType")} required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error("serviceType")}
        </div>

        <div className={styles.row}>
          <fieldset className={styles.choice}>
            <legend>Property type</legend>
            <div className={styles.segmented}>
              {propertyTypes.map((option) => (
                <label key={option.value}>
                  <input type="radio" name="propertyType" value={option.value} defaultChecked={option.value === "residential"} />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className={styles.choice}>
            <legend>Preferred contact method</legend>
            <div className={styles.segmented}>
              {contactMethods.map((option) => (
                <label key={option.value}>
                  <input type="radio" name="contactMethod" value={option.value} defaultChecked={option.value === "either"} />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className={styles.field}>
          <label htmlFor="quote-message">
            Tell us about your job <span className={styles.optional}>(optional)</span>
          </label>
          <textarea
            {...field("message")}
            rows={5}
            maxLength={2000}
            placeholder="e.g. We'd like 4 cameras covering the driveway and backyard, or our nbn box needs a cable run to the study…"
            onChange={(e) => setMessageLength(e.target.value.length)}
          />
          <span className={styles.count} aria-live="polite">
            {messageLength} / 2000
          </span>
          {error("message")}
        </div>

        {/* Honeypot – hidden from people and screen readers, bots tend to fill it in */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="quote-website">Website</label>
          <input id="quote-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {formError && (
          <p className={styles.formError} role="alert">
            {formError}
          </p>
        )}

        <button type="submit" className={`btn btn--cta btn--block btn--lg ${styles.submit}`}>
          {status === "submitting" ? "Sending…" : "Request my free quote"}
          {status !== "submitting" && icons.arrow}
        </button>
        <p className={styles.privacy}>
          {icons.lock} Your details are only used to respond to your enquiry. We never share them.
        </p>
      </fieldset>
    </form>
  );
}
