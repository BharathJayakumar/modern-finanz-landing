import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Phone, Mail, User, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhitepaperForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_phone: ""
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"form" | "verification" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('form.errors.name');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('form.errors.email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('form.errors.emailInvalid');
    }
    
    if (!formData.mobile_phone.trim()) {
      newErrors.mobile_phone = t('form.errors.phone');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/functions/v1/send-verification-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStep("verification");
        toast({
          title: t('form.sms.sent.title'),
          description: t('form.sms.sent.description'),
        });
      } else {
        throw new Error(data.error || 'Failed to send SMS');
      }
    } catch (error) {
      toast({
        title: t('form.errors.title'),
        description: error instanceof Error ? error.message : t('form.errors.generic'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      setErrors({ code: t('form.errors.code') });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const response = await fetch('/functions/v1/verify-sms-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: formData.mobile_phone,
          code: verificationCode,
          language
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStep("success");
        toast({
          title: t('form.verification.success.title'),
          description: t('form.verification.success.description'),
        });
      } else {
        setErrors({ code: data.error || t('form.errors.codeInvalid') });
      }
    } catch (error) {
      setErrors({ code: t('form.errors.generic') });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const downloadWhitepaper = () => {
    // This would typically trigger a download or redirect to a secure download link
    window.open("/assets/whitepaper-cover.jpg", "_blank");
    toast({
      title: t('form.download.title'),
      description: t('form.download.description'),
    });
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
            {step === "form" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t('form.name.label')}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('form.name.placeholder')}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`mt-2 h-12 text-base border-border focus:border-primary ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

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
                      className={`mt-2 h-12 text-base border-border focus:border-primary ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="mobile_phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t('form.mobile.label')}
                    </Label>
                    <Input
                      id="mobile_phone"
                      type="tel"
                      placeholder={t('form.mobile.placeholder')}
                      value={formData.mobile_phone}
                      onChange={(e) => handleInputChange("mobile_phone", e.target.value)}
                      className={`mt-2 h-12 text-base border-border focus:border-primary ${
                        errors.mobile_phone ? "border-red-500" : ""
                      }`}
                    />
                    {errors.mobile_phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.mobile_phone}</p>
                    )}
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
                      t('form.submit')
                    )}
                  </Button>
                </div>
              </form>
            )}

            {step === "verification" && (
              <form onSubmit={handleVerification} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t('form.verification.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('form.verification.description')} {formData.mobile_phone}
                  </p>
                </div>

                <div>
                  <Label htmlFor="code" className="text-sm font-medium text-foreground">
                    {t('form.verification.code.label')}
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder={t('form.verification.code.placeholder')}
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      if (errors.code) {
                        setErrors(prev => ({ ...prev, code: "" }));
                      }
                    }}
                    className={`mt-2 h-12 text-base text-center tracking-widest border-border focus:border-primary ${
                      errors.code ? "border-red-500" : ""
                    }`}
                    maxLength={6}
                  />
                  {errors.code && (
                    <p className="text-red-500 text-sm mt-1">{errors.code}</p>
                  )}
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full h-14 text-lg font-semibold bg-trust-gradient hover:shadow-professional transition-all duration-300"
                  >
                    {isVerifying ? (
                      t('form.verification.verifying')
                    ) : (
                      t('form.verification.verify')
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep("form")}
                    className="w-full"
                  >
                    {t('form.verification.back')}
                  </Button>
                </div>
              </form>
            )}

            {step === "success" && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t('form.success.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('form.success.description')}
                  </p>
                </div>

                <Button
                  onClick={downloadWhitepaper}
                  className="h-14 text-lg font-semibold bg-trust-gradient hover:shadow-professional transition-all duration-300 px-8"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t('form.cta')}
                </Button>
              </div>
            )}
            
            <div className="text-center pt-6">
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