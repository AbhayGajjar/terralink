import { company } from "@/data/company";

/** Blog categories – /blog/category/<slug> */
export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

export const blogCategories: BlogCategory[] = [
  {
    slug: "nbn-guides",
    name: "nbn guides",
    description: "Plain-English explanations of nbn technologies and how to get connected in Adelaide.",
  },
  {
    slug: "fttp",
    name: "FTTP & fibre upgrades",
    description: "Everything about Fibre to the Premises: installation day, upgrades from FTTN and FTTC, and getting the most from fibre.",
  },
  {
    slug: "troubleshooting",
    name: "Troubleshooting",
    description: "How to diagnose slow or unreliable nbn connections and when to call a technician.",
  },
  {
    slug: "security-cameras",
    name: "Security cameras",
    description: "Practical advice on choosing, placing and using CCTV and security camera systems.",
  },
];

export interface Author {
  /** Key used in post frontmatter */
  key: string;
  name: string;
  role: string;
  bio: string;
}

/**
 * PLACEHOLDER – replace with a real person (name, role and relevant experience) if you can.
 * Articles written by a named, experienced technician are more trustworthy to readers and
 * to Google than ones credited to a company.
 */
export const authors: Record<string, Author> = {
  "terralink-team": {
    key: "terralink-team",
    name: `The ${company.name} team`,
    role: "nbn & CCTV technicians, Adelaide",
    bio: `Written by ${company.name}'s technicians, who install and fix nbn connections and security camera systems across Adelaide every week.`,
  },
};
