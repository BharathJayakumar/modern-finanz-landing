import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhitepaperForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    mobile: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t('form.success.title'),
      description: t('form.success.description'),
    });

    setIsSubmitting(false);
    setFormData({ email: "", mobile: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t('form.email.label')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('form.email.placeholder')}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="mt-2 h-12 text-base border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {t('form.mobile.label')}
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder={t('form.mobile.placeholder')}
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    required
                    className="mt-2 h-12 text-base border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-semibold bg-trust-gradient hover:shadow-professional transition-all duration-300"
                >
                  {isSubmitting ? (
                    t('form.submitting')
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      {t('form.cta')}
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  {t('form.privacy')}
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};