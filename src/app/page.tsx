import Header from "@/components/header";
import HeroSection from "@/modules/hero";
import HowItWorksSection from "@/modules/howitworks";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <HowItWorksSection />
    </div>
  );
};

export default page;
