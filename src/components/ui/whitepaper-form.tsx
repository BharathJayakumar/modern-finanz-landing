import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhitepaperForm = () => {
  const { t } = useLanguage();

  return (
    <section id="whitepaper-form" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('form.headline')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('form.subheadline')}
            </p>
          </div>

          <Card className="p-8 shadow-professional border-primary/10">
            <div className="hs-form-frame" 
                 data-region="eu1" 
                 data-form-id="23b1426e-783e-47ce-9c43-456373e013fd" 
                 data-portal-id="146782067">
            </div>
            
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                {t('form.privacy')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};