import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { GamificationSection } from "@/components/landing/GamificationSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <DashboardPreview />
        <FeaturesSection />
        <GamificationSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
