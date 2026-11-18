import Link from "next/link";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import ServiceCard from "../ServiceCard";

export default function ServicesOverview() {
  return (
    <section id="services" className="section section--light" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          eyebrow="Our services"
          title={
            <>
              Every NBN connection type. <span className="text-gradient-blue">Plus smarter security.</span>
            </>
          }
          lead="Whatever nbn technology your address uses, we fix the wiring, run the cabling and get your connection working where you need it – and we design CCTV systems that actually protect what matters."
        />
        <Stagger className="grid grid--4">
          {services.map((service, index) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Link href="/services" className="btn btn--outline">
            View all services <Icon name="arrowRight" />
          </Link>
        </div>
      </div>
    </section>
  );
}
