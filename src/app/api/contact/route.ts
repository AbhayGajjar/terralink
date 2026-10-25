import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { company } from "@/data/company";
import { contactMethods, contactSchema, propertyTypes, serviceOptions, type ContactData } from "@/lib/contact";

// --- Basic in-memory rate limiting (per server instance; best effort on serverless) ---
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const labelFor = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

function buildEmail(data: ContactData) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Suburb", data.suburb],
    ["Service", labelFor(serviceOptions, data.serviceType)],
    ["Property type", labelFor(propertyTypes, data.propertyType)],
    ["Preferred contact", labelFor(contactMethods, data.contactMethod)],
    ["Message", data.message || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0F1B33">
      <div style="background:#0A1F44;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
        <h2 style="margin:0;font-size:20px">New quote request</h2>
        <p style="margin:6px 0 0;color:#9FB4D8;font-size:14px">${escapeHtml(company.name)} website</p>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #E3E9F3;border-top:0">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:12px 16px;border-bottom:1px solid #E3E9F3;background:#F7F9FC;font-weight:bold;width:170px;vertical-align:top">${escapeHtml(k)}</td>
              <td style="padding:12px 16px;border-bottom:1px solid #E3E9F3;white-space:pre-wrap">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  return { text, html };
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later or give us a call." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot filled in → almost certainly a bot. Pretend it worked so bots don't retry.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      // Lets the form be tested locally before Resend is configured.
      console.info("[contact] RESEND_API_KEY/CONTACT_EMAIL not set – submission not emailed:\n", buildEmail(data).text);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_EMAIL environment variable.");
    return NextResponse.json({ ok: false, error: "Our contact form is temporarily unavailable. Please call or email us." }, { status: 500 });
  }

  const { text, html } = buildEmail(data);
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || `${company.name} Website <onboarding@resend.dev>`,
    to: to.split(",").map((addr) => addr.trim()),
    replyTo: data.email,
    subject: `New quote request: ${labelFor(serviceOptions, data.serviceType)} – ${data.name} (${data.suburb})`,
    text,
    html,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ ok: false, error: "We couldn't send your message. Please try again or give us a call." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
