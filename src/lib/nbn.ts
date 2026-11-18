import { company } from "@/data/company";
import type { ContentSection } from "./content";

/**
 * "Who does what" explainer used on every nbn page. It makes clear that TerraLink is not an
 * internet provider and is not nbn, and its wording depends on company.nbnNetworkAuthorised
 * (whether TerraLink's technicians may work on nbn's own network equipment).
 */
export function whoDoesWhatSection(id = "who-does-what"): ContentSection {
  const terralink = company.nbnNetworkAuthorised
    ? `- **${company.name}** carries out installation work for you: our technicians are authorised to work on the nbn network, so depending on how your job is booked we can complete the network-side installation as well as all the cabling and set-up on your side of the connection.`
    : `- **${company.name}** looks after your side of the connection: preparing lead-in conduit and pits so nbn can connect you, running data cabling from the nbn connection box to where you actually want your router, fixing internal phone-line wiring on FTTN and FTTC, router and Wi-Fi set-up, and finding faults inside your property.`;

  return {
    id,
    heading: "Who does what: your provider, nbn and TerraLink",
    body: `Getting an nbn connection involves three different parties, and knowing who does what saves a lot of time on the phone.

- **Your internet provider** (also called a retail service provider or RSP) sells you the plan, places the order with nbn and books any nbn appointment. ${company.name} is **not** an internet provider and doesn't sell plans.
- **nbn** owns the network up to your premises, including the network equipment such as the utility box on an outside wall and the nbn connection box or device inside. nbn's own authorised technicians install and repair that equipment.
${terralink}

${company.name} is an independent contractor. We are not part of nbn and the word "nbn" on this site simply describes the network we work with.`,
  };
}
