import type { Metadata } from "next";
import { company, fullAddress, mapsLink } from "@/data/company";
import { serviceOptions } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./contact.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us – Free NBN & CCTV Quote Adelaide",
  description: `Request a free quote for nbn installation, cabling or CCTV installation in Adelaide. Call ${company.phone.display} or send your details online.`,
  path: "/contact",
});

const infoCards: { icon: IconName; title: string; lines: string[]; href?: string; cta?: string }[] = [
  { icon: "phone", title: "Call us", lines: [company.phone.display], href: company.phone.href, cta: "Call now" },
  ...(company.email ? [{ icon: "mail" as IconName, title: "Email us", lines: [company.email], href: `mailto:${company.email}`, cta: "Send an email" }] : []),
  { icon: "location", title: "Our address", lines: [company.name, fullAddress] },
  { icon: "clock", title: "Opening hours", lines: company.openingHours.map((row) => `${row.days}: ${row.hours}`) },
];

const nextSteps = [
  "We review your request and check your address details",
  "A technician calls or emails you within one business day",
  "You receive a clear, fixed-price quote – no obligation",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Get a free <span className="text-gradient">NBN or CCTV quote</span> in Adelaide
          </>
        }
        lead="Tell us a little about your property and what you need. We'll come back to you within one business day with honest advice and a fixed-price quote."
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className={`section section--light ${styles.main}`} aria-label="Quote request form and contact details">
        <div className={`container ${styles.layout}`}>
          <div className={`card ${styles.formCard}`} id="quote-form">
            <h2 className={styles.formTitle}>Request a quote</h2>
            <p className={styles.formLead}>Fields marked optional can be left blank. Everything else helps us quote accurately.</p>
            <ContactForm
              serviceOptions={serviceOptions}
              icons={{ arrow: <Icon name="arrowRight" />, lock: <Icon name="lock" />, check: <Icon name="check" /> }}
            />
          </div>

          <div className={styles.side}>
            <Stagger className={styles.cards} stagger={0.08}>
              {infoCards.map((card) => (
                <StaggerItem key={card.title}>
                  <div className={`card card--hover ${styles.info}`}>
                    <span className="icon-tile icon-tile--sm">
                      <Icon name={card.icon} />
                    </span>
                    <div className={styles.infoBody}>
                      <h3>{card.title}</h3>
                      {card.lines.map((line) =>
                        card.href ? (
                          <a key={line} href={card.href} className={styles.infoLink}>
                            {line}
                          </a>
                        ) : (
                          <p key={line}>{line}</p>
                        ),
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className={styles.next} delay={0.15}>
              <h3>What happens next?</h3>
              <ol>
                {nextSteps.map((step, i) => (
                  <li key={step}>
                    <span>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--white section--tight" aria-labelledby="find-us">
        <div className="container">
          <div className={styles.mapHead}>
            <h2 id="find-us" className={styles.mapTitle}>
              Find {company.name} in {company.address.suburb}
            </h2>
            <address className={styles.nap}>
              <strong>{company.name}</strong>
              <span>{fullAddress}</span>
              <a href={company.phone.href}>{company.phone.display}</a>
            </address>
            <a href={mapsLink} className="btn btn--outline btn--sm" target="_blank" rel="noopener">
              <Icon name="location" /> Get directions
            </a>
          </div>
          <Reveal className={styles.mapWrap}>
            {/* Update company.mapEmbedUrl in src/data/company.ts if the pin is not exactly on the business */}
            <iframe
              src={company.mapEmbedUrl}
              title={`Map showing ${company.name} at ${fullAddress}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
