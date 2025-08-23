import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WhitepaperForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    mobile: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Whitepaper wird gesendet!",
      description: "Sie erhalten Ihr kostenloses Whitepaper in Kürze per E-Mail.",
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
              Download Your Free Whitepaper
            </h2>
            <p className="text-lg text-muted-foreground">
              Enter your details to receive the whitepaper and unlock exclusive financial planning insights.
            </p>
          </div>

          <Card className="p-8 shadow-professional border-primary/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-Mail Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ihre.email@beispiel.de"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="mt-2 h-12 text-base border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Mobile Number
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="+49 123 456 7890"
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
                    "Wird gesendet..."
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Download Whitepaper
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};