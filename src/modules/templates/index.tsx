import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Bot,
  CreditCard,
  Database,
  FileText,
  Mail,
  Webhook,
} from "lucide-react";
import React from "react";
const templates = [
  {
    icon: CreditCard,
    title: "Stripe -> Notion CRM",
    description:
      "Automatically create and update customer records in Notion CRM when new payments are made in Stripe.",
    tags: ["Stripe", "Notion", "CRM"],
    color: "border-neon-green/30 hover:border-neon-green/50",
  },
  {
    icon: FileText,
    title: "Google Form -> Sheets -> Slack",
    description:
      "Process form submissions, log them in Google Sheets, and notify your team on Slack.",
    tags: ["Forms", "Teams", "Slack", "Notifications"],
    color: "border-neon-blue/30 hover:border-neon-blue/50",
  },
  {
    icon: Mail,
    title: "Gmail -> AI Summarize -> Discord",
    description:
      "Summarize incoming emails using AI and send the summaries to a Discord channel.",
    tags: ["Gmail", "AI", "Discord", "Summarization"],
    color: "border-neon-purple/30 hover:border-neon-purple/50",
  },
  {
    icon: Webhook,
    title: "Weebhook -> HTTP -> Email",
    description:
      "Transform incoming webhook data and forward it via email using HTTP requests.",
    tags: ["Webhooks", "HTTP", "Email"],
    color: "border-neon-purple/30 hover:border-neon-purple/50",
  },
  {
    icon: Database,
    title: "CSV Import -> Validation -> CRM",
    description:
      "Import and validate CSV data before syncing it with your CRM system.",
    tags: ["CSV", "Data Validation", "CRM"],
    color: "border-neon-green/30 hover:border-neon-green/50",
  },
  {
    icon: Bot,
    title: "Social Media Monitor",
    description:
      "Track social media mentions and send alerts to your team via Slack or email.",
    tags: ["Social Media", "Monitoring", "Alerts"],
    color: "border-neon-blue/30 hover:border-neon-blue/50",
  },
];
const TemplatesSection = () => {
  return (
    <section
      id="templates"
      className="py-24 px-6 bg-linear-to-b from-background to-secondary/20"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold m-6 bg-gradient-secondary bg-clip-text text-transparent">
            Start from Templates
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Launch your automation projects faster with our collection of
            pre-built workflow templates. One-click setup to get you started
            quickly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {templates.map((template, index) => (
            <div
              className="animate-fade-in"
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card
                className={`p-6 h-full bg-gradient-card border-2 ${template.color} backdrop-blur-sm hover:shadow-glass transition-all duration-300 group cursor-pointer`}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center mb-4">
                    <template.icon className={`w-6 h-6 text-primary`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {template.description}
                  </p>
                </div>
                <div className="flex flex-wrap mb-4 gap-2">
                  {template.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className={`text-sx ${template.color} `}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Ready to use
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center animate-fade-in">
          <div className="p-8 bg-gradient-card rounded-2xl border border-primary/20 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">200+ More Templates</h3>
            <p className="text-muted-foreground mb-6">
              Explore our extensive library of over 200 additional templates to
              find the perfect automation for your needs.
            </p>
            <Button size={"lg"} variant={"hero"} className="text-lg p-8">
              Browse All Templates
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
