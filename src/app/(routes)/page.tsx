"use client"

import { HeroSection } from "../Components/Home/HeroSection";
import { Identity } from "../Components/Home/Identity";
import { StrategySlides } from "../Components/Home/StrategySlides";
import { OppurtinityMissions } from "../Components/Home/OpportunityMissions";
import { QuoteSection } from "../Components/Home/Quote";
import { PageNavigation } from "../Components/Home/PageNavigation";
import { useRef } from "react";

export default function Home() {

  const pageWrapperRef = useRef(null)

  return (
    <main className="page_wrapper">

      <HeroSection />

      <Identity />

      <OppurtinityMissions />

      <QuoteSection />

      <StrategySlides />

      <PageNavigation pageWrapper={pageWrapperRef} />

    </main>
  )
}
