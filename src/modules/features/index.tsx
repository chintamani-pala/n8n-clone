import { Card } from "@/components/ui/card";
import {
  Activity,
  BookOpen,
  Brain,
  CreditCard,
  Globe,
  Puzzle,
  Shield,
  Zap,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: Brain,
    title: "AI Nodes",
    description:
      "Integrated OpenAI, Claude, Gemini, and more AI models to enhance your workflows with intelligent capabilities.",
    color: "text-neon-purple",
  },
  {
    icon: Puzzle,
    title: "200+ Integrations",
    description:
      "Connect with over 200 popular apps and services including Stripe, Gmail, Slack, and more to automate your tasks seamlessly.",
    color: "text-neon-blue",
  },
  {
    icon: Shield,
    title: "Secure Credential Valult",
    description:
      "Store and manage your API keys and credentials securely with end-to-end encryption.",
    color: "text-neon-green",
  },
  {
    icon: Activity,
    title: "Live logs and monitoring",
    description:
      "Track your workflow executions in real-time with detailed logs and performance metrics.",
    color: "text-neon-cyan",
  },
  {
    icon: BookOpen,
    title: "Template Library",
    description:
      "Access a wide range of pre-built workflow templates to kickstart your automation projects quickly.",
    color: "text-neon-purple",
  },
  {
    icon: CreditCard,
    title: "Flexible Billing",
    description:
      "Pay with Stripe or crypto through crytomus. Choose a plan that fits your needs with easy upgrades and downgrades.",
    color: "text-neon-blue",
  },
  {
    icon: Zap,
    title: "High Performance",
    description:
      "Experience fast and reliable workflow execution with our optimized infrastructure designed for scalability.",
    color: "text-neon-green",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description:
      "Run workflows closer to your user with our global edge network for reduced latency and improved performance.",
    color: "text-neon-cyan",
  },
];
const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-24 px-6 bg-linear-to-b from-background to-secondary/20"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl md:leading-snug font-bold m-6 bg-gradient-primary bg-clip-text text-transparent">
            Everything You Need to Automate
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for developers and learners who want to
            build sophisticated automation workflows with ease.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Features*/}
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <Card className="relative p-6 h-full bg-gradient-card border border-primary/10 backdrop-blur-sm hover:shadow-[0_10px_30px_rgba(99,102,241,0.12)] transition-transform duration-300 hover:-translate-y-1 group">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors duration-300">
                        <Icon
                          className={`w-6 h-6 ${feature.color}`}
                          aria-hidden
                        />
                      </div>
                      <h3 className="text-lg font-semibold leading-tight">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
        {/*Payment solutions*/}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-secondary/30 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="text-sm">
              <span className="text-muted-foreground">Payments powered by</span>
              <span className="font-semibold text-foreground ml-1">Stripe</span>
              <span className="text-muted-foreground mx-2">+</span>
              <span className="font-semibold text-muted-foreground">
                Cryptomus
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
