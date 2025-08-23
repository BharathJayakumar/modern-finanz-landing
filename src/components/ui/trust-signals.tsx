import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const TrustSignals = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <span className="text-primary font-semibold text-lg">
              {t('hero.tagline')}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('trust.headline')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 border-primary/10 shadow-card">
            <div className="flex items-start gap-4">
              <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-foreground mb-4 leading-relaxed">
                  "{t('trust.testimonial1')}"
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>{t('trust.testimonial1.author')}</strong>
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-primary/10 shadow-card">
            <div className="flex items-start gap-4">
              <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-foreground mb-4 leading-relaxed">
                  "{t('trust.testimonial2')}"
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>{t('trust.testimonial2.author')}</strong>
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">
            {t('trust.customers')}
          </p>
        </div>
      </div>
    </section>
  );
};