import { HeroSection } from "@/components/ui/hero-section";
import { ValueProposition } from "@/components/ui/value-proposition";
import { WhitepaperForm } from "@/components/ui/whitepaper-form";
import { TrustSignals } from "@/components/ui/trust-signals";
import { Footer } from "@/components/ui/footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <HeroSection />
        <ValueProposition />
        <WhitepaperForm />
        <TrustSignals />
        <Footer />
      </main>
    </LanguageProvider>
  );
};

export default Index;
