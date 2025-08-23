import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import whitepaperCover from "@/assets/whitepaper-cover.jpg";

export const HeroSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('whitepaper-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-hero-gradient text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Smart Financial Planning for a Secure Future
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Download our free whitepaper and learn how to build wealth, protect yourself, and plan ahead with confidence.
              </p>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={scrollToForm}
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-4 shadow-professional hover:shadow-xl transition-all duration-300"
              >
                Get Your Free Whitepaper
              </Button>
            </div>

            <div className="pt-8 border-t border-white/20">
              <p className="text-sm text-white/80 font-medium">
                Die modernste Finanzkanzlei Deutschlands
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20 shadow-professional">
              <img 
                src={whitepaperCover} 
                alt="Modern Financial Planning Whitepaper Cover" 
                className="w-full max-w-sm mx-auto rounded-lg shadow-card"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};