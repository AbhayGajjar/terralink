import type { IconName } from "@/components/ui/Icon";

/** PLACEHOLDER – replace with TerraLink's real story */
export const story = [
  "TerraLink started with a simple idea: telecommunications work should be done properly, explained clearly and left looking tidy. Founded in South Australia by technicians who'd spent years on the tools, we saw too many rushed installs, unexplained delays and cables stapled across walls.",
  "Today our team installs and maintains NBN connections across every fixed-line technology – FTTP, FTTN, FTTC and HFC – and designs CCTV and security camera systems for homes, small businesses and commercial sites throughout Adelaide and regional SA.",
  "We're still locally owned and operated, and we still measure success the same way: a connection that works, a customer who understands it and a site we'd be proud to show anyone.",
];

export const mission =
  "To connect and protect South Australian homes and businesses with reliable, neatly installed technology – delivered by friendly local technicians who do the job right the first time.";

export const values: { title: string; description: string; icon: IconName }[] = [
  { title: "Quality first", description: "We'd rather take an extra ten minutes than leave a job we're not proud of.", icon: "trophy" },
  { title: "Straight talk", description: "Clear advice and honest, fixed-price quotes – no jargon and no surprises.", icon: "support" },
  { title: "Respect your space", description: "Shoe covers, drop sheets and a spotless finish. Your property, treated like ours.", icon: "home" },
  { title: "Safety always", description: "Fully insured, properly trained and compliant with Australian standards on every job.", icon: "shield" },
];

/** PLACEHOLDER TEAM – replace names, roles and add real photos, then set TEAM_IS_REAL to true (hidden until then). */
export const TEAM_IS_REAL = false;

export const team: { name: string; role: string; bio: string }[] = [
  { name: "Team Member", role: "Founder & Lead Technician", bio: "15+ years in telecommunications, specialising in fibre and complex NBN installs." },
  { name: "Team Member", role: "Operations Manager", bio: "Keeps jobs on schedule and customers informed from first call to final sign-off." },
  { name: "Team Member", role: "Senior NBN Technician", bio: "FTTP and HFC specialist with thousands of residential and commercial connections." },
  { name: "Team Member", role: "Security Systems Specialist", bio: "Designs and commissions CCTV systems for homes, retail and industrial sites." },
];

/**
 * PLACEHOLDER – list only registrations, licences and cover TerraLink actually holds.
 * Each item is only shown when verified is true (add licence/registration numbers to the description).
 */
export const certifications: { title: string; description: string; icon: IconName; verified: boolean }[] = [
  { title: "Registered cablers", description: "Technicians hold ACMA cabling registration for the work they perform.", icon: "safety", verified: false },
  { title: "NBN accredited", description: "Trained and accredited to work on the NBN network (placeholder – confirm wording).", icon: "fibre", verified: false },
  { title: "Security licence", description: "Licensed to install security equipment in South Australia (placeholder – add licence no.).", icon: "lock", verified: false },
  { title: "$20M public liability", description: "Comprehensive public liability insurance on every job (placeholder – confirm amount).", icon: "insured", verified: false },
  { title: "Work health & safety", description: "Working at heights, White Card and first aid trained team members.", icon: "shield", verified: false },
  { title: "Workmanship guarantee", description: "Every installation tested and backed by our workmanship guarantee.", icon: "checkCircle", verified: false },
];
