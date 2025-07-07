import Container from "@/components/ui/container";
import HeroSection from "@/components/ui/landing-layout/hero-section";
import OfferSection from "@/components/ui/landing-layout/offer-section";
import TabsSection from "@/components/ui/landing-layout/tabs-section";
import React, { memo } from "react";
import TeamSection from "@/components/ui/landing-layout/teams-section";
import StartNowSection from "@/components/ui/landing-layout/startnow-section";
import "aos/dist/aos.css";
import FAQsSection from "@/components/ui/landing-layout/faq-section";

const Landing = () => {
  return (
    <div className="flex justify-center mt-12 w-full">
      <Container className="justify-center font-[family-name:var(--font-redhat)]">
        <div className="space-y-28 ">
          <HeroSection />
          <TabsSection />
          <OfferSection />
          <StartNowSection />
          <TeamSection />
          <FAQsSection/>
        </div>
      </Container>
    </div>
  );
};

export default memo(Landing);
