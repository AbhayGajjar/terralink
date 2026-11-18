import Link from "next/link";
import { company, fullAddress } from "@/data/company";
import { footerServiceLinks } from "@/data/navigation";
import { areas } from "@/data/areas";
import { getAllPosts } from "@/lib/blog";
import Icon, { type IconName } from "@/components/ui/Icon";
import Logo from "./Logo";
import { BackToTop, CurrentYear } from "./FooterClient";
import styles from "./Footer.module.css";

const socialLinks = (
  [
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instagram" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "google", label: "Google reviews" },
  ] as const
).filter((item) => Boolean(company.social[item.key]));

export default function Footer() {
  const posts = getAllPosts();
  const areaPages = new Map(areas.map((area) => [area.name, area.slug]));
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.about}>
            <Logo />
            <p className={styles.blurb}>{company.description}</p>
            <ul className={styles.social} aria-label="Social media">
              {socialLinks.map((item) => (
                <li key={item.key}>
                  <a href={company.social[item.key]} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                    <Icon name={item.key as IconName} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>Services</h2>
            <ul className={styles.links}>
              {footerServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>Guides</h2>
            <ul className={styles.links}>
              {posts.slice(0, 5).map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>{post.seoTitle}</Link>
                </li>
              ))}
              <li>
                <Link href="/blog">All guides</Link>
              </li>
              <li>
                <Link href="/faq">nbn &amp; CCTV FAQs</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>Get in touch</h2>
            <ul className={styles.contact}>
              <li>
                <Icon name="phone" />
                <a href={company.phone.href}>{company.phone.display}</a>
              </li>
              {company.email && (
                <li>
                  <Icon name="mail" />
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </li>
              )}
              <li>
                <Icon name="location" />
                <address>{fullAddress}</address>
              </li>
              <li>
                <Icon name="form" />
                <Link href="/contact">Request a free quote</Link>
              </li>
              <li>
                <Icon name="clock" />
                <span>
                  {company.openingHours.map((row) => (
                    <span key={row.days} className={styles.hoursRow}>
                      {row.days}: {row.hours}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.areas}>
          <span className={styles.areasLabel}>
            <Icon name="location" /> Servicing
          </span>
          <ul>
            {company.serviceAreas.map((area) => {
              const slug = areaPages.get(area);
              return <li key={area}>{slug ? <Link href={`/areas/${slug}`}>{area}</Link> : area}</li>;
            })}
            <li>
              <Link href="/areas">All service areas</Link>
            </li>
          </ul>
        </div>

        <div className={styles.bottom}>
          <p>
            © <CurrentYear /> {company.legalName || company.name}. All rights reserved.{company.abn ? ` ABN ${company.abn}` : ""}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
