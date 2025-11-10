import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";

const CTASection = () => {
  return (
    <section
      id="cta"
      className="py-24 px-6 bg-linear-to-r from-secondary/20 to-secondary/20"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="animate-fade-in">
          {/*Floating Elements*/}
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-neon-green rounded-full animate-glow-pulse"></div>
            <div className="absolute -top-2 -right-8 w-2 h-2 bg-neon-blue rounded-full animate-float"></div>
            <div className="absolute -bottom-4 left-8 w-2.5 h-2.5 bg-accent rounded-full animate-node-glow"></div>

            <div className="p-12 bg-gradient-card rounded-3xl border border-primary/20 backdrop-blur-sm shadow-elevated">
              <div className="gap-2 inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Ready to Automate?</span>
              </div>
              <h2 className="font-bold text-4xl md:text-6xl mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Build your first workflow today
                <br />
                <span className="text-accent">Free Forever.</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of developers and teams who trust FlowX for their
                automation needs. Start building workflows in minutes, not
                hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button
                  size={"lg"}
                  variant={"hero"}
                  className="text-lg px-10 py-6"
                >
                  Sign Up Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
