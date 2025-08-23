import { HeroSection } from "@/components/ui/hero-section";
import { ValueProposition } from "@/components/ui/value-proposition";
import { WhitepaperForm } from "@/components/ui/whitepaper-form";
import { TrustSignals } from "@/components/ui/trust-signals";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ValueProposition />
      <WhitepaperForm />
      <TrustSignals />
      <Footer />
    </main>
  );
};

export default Index;
