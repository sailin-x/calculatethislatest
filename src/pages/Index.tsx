import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SocialProof from "@/components/SocialProof";
import FeaturedCalculator from "@/components/FeaturedCalculator";
import CalculatorCategories from "@/components/CalculatorCategories";
import SuggestCalculator from "@/components/SuggestCalculator";
import EmailCapture from "@/components/EmailCapture";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <SocialProof />
        <FeaturedCalculator />
        <CalculatorCategories />
        <SuggestCalculator />
        <EmailCapture />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
