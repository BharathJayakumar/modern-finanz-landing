import { Card } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Shield, Target } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Actionable Strategies",
    description: "Tailored guidance for young professionals & self-employed individuals to maximize their financial potential."
  },
  {
    icon: TrendingUp,
    title: "Smart Investment Planning",
    description: "Expert insights on retirement planning, strategic investments, and wealth building techniques."
  },
  {
    icon: Shield,
    title: "Comprehensive Protection",
    description: "Learn about insurance strategies and risk management to protect your financial future."
  }
];

export const ValueProposition = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Financial Expertise?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get access to proven strategies from Germany's most modern financial advisory firm
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-professional transition-all duration-300 border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/50 rounded-full px-6 py-3">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              Expertise from Germany's most modern financial advisory
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};