import { TeamSection } from "../../Components/Team/TeamSlider";
import { TeamQuoteSection } from "../../Components/Team/QuoteSection";
import { TeamGrid } from "../../Components/Team/TeamGrid";

export default function About() {
  return (
    <main>
      {/* <TeamSection /> */}
      <TeamGrid />
      <TeamQuoteSection />
    </main>
  );
}
