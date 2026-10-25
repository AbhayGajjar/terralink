import type { Metadata } from "next";
import Image from "next/image";
import { company } from "@/data/company";
import { certifications, mission, story, team, values } from "@/data/about";
import { stats } from "@/data/home";
import { images } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ServiceAreas from "@/components/sections/ServiceAreas";
import CtaBanner from "@/components/sections/CtaBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Icon from "@/components/ui/Icon";
import styles from "./about.module.css";

export const metadata: Metadata = buildMetadata({
  title: "About Us – Local NBN & CCTV Installers in Adelaide",
  description: `Meet ${company.name}, a locally owned South Australian telecommunications contractor. Experienced, fully insured NBN and CCTV technicians servicing Adelaide and regional SA.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${company.name}`}
        title={
          <>
            Local technicians. <span className="text-gradient">Lasting connections.</span>
          </>
        }
        lead={`${company.name} is a South Australian team of NBN and security specialists who believe great installs come down to skill, care and clear communication.`}
        breadcrumbs={[{ name: "About", path: "/about" }]}
        image={images.technicianPlans}
      />

      {/* Story */}
      <section className="section section--white" aria-labelledby="story-title">
        <div className={`container ${styles.story}`}>
          <Reveal className={styles.storyMedia}>
            <div className={styles.storyImage}>
              <Image src={images.technician.src} alt={images.technician.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className={styles.cover} />
            </div>
            <div className={`card ${styles.since}`}>
              <strong>Since {company.foundedYear}</strong>
              <span>Connecting South Australia</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Our story</span>
            <h2 id="story-title" className="section-title">
              Built on doing the job <span className="text-gradient-blue">properly</span>
            </h2>
            <div className={styles.storyText}>
              {story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className={styles.miniStats}>
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <strong>
                    <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & values */}
      <section className="section section--dark" aria-labelledby="mission-title">
        <div className="container">
          <Reveal className={styles.mission}>
            <span className="eyebrow">Our mission</span>
            <h2 id="mission-title" className={styles.missionText}>
              &ldquo;{mission}&rdquo;
            </h2>
          </Reveal>
          <Stagger className="grid grid--4">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <article className={`glass-card glass-card--hover ${styles.value}`}>
                  <span className="icon-tile icon-tile--glass">
                    <Icon name={value.icon} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section className="section section--light" aria-labelledby="team-title">
        <div className="container">
          <SectionHeading
            id="team-title"
            eyebrow="Our team"
            title="The people behind every install"
            lead="Friendly, experienced and local. These are the technicians you'll meet on site."
          />
          <Stagger className="grid grid--4">
            {team.map((member) => (
              <StaggerItem key={member.role}>
                <article className={`card card--hover ${styles.member}`}>
                  {/* PLACEHOLDER – replace with a real team photo via next/image */}
                  <div className={styles.avatar} aria-hidden="true">
                    <Icon name="team" />
                  </div>
                  <h3>{member.name}</h3>
                  <span className={styles.role}>{member.role}</span>
                  <p>{member.bio}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Certifications */}
      <section className="section section--white" aria-labelledby="certs-title">
        <div className="container">
          <SectionHeading
            id="certs-title"
            eyebrow="Certifications & insurance"
            title="Qualified, licensed and fully insured"
            lead="Peace of mind is part of every job. Here's what stands behind our work."
          />
          <Stagger className="grid grid--3">
            {certifications.map((cert) => (
              <StaggerItem key={cert.title}>
                <article className={`card card--hover ${styles.cert}`}>
                  <span className="icon-tile icon-tile--soft">
                    <Icon name={cert.icon} />
                  </span>
                  <div>
                    <h3>{cert.title}</h3>
                    <p>{cert.description}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <p className={styles.abn}>
            {company.legalName} · ABN {company.abn}
          </p>
        </div>
      </section>

      <ServiceAreas />

      <CtaBanner tone="white" title="Let's get you connected" />
    </>
  );
}
