import { Card } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Shield, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getBenefits = (t: (key: string) => string) => [
  {
    icon: Target,
    title: t('value.benefit1.title'),
    description: t('value.benefit1.description')
  },
  {
    icon: TrendingUp,
    title: t('value.benefit2.title'),
    description: t('value.benefit2.description')
  },
  {
    icon: Shield,
    title: t('value.benefit3.title'),
    description: t('value.benefit3.description')
  }
];

export const ValueProposition = () => {
  const { t } = useLanguage();
  const benefits = getBenefits(t);
  
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('value.headline')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('value.subheadline')}
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
              {t('value.badge')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};