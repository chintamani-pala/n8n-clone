import Header from "@/components/header";
import CTASection from "@/modules/cta";
import FeaturesSection from "@/modules/features";
import HeroSection from "@/modules/hero";
import HowItWorksSection from "@/modules/howitworks";
import PricingSection from "@/modules/pricing";
import TemplatesSection from "@/modules/templates";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TemplatesSection />
      <PricingSection />
      <CTASection />
    </div>
  );
};

export default page;
