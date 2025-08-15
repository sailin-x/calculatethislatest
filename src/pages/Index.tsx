import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedCalculator from "@/components/FeaturedCalculator";
import CalculatorCategories from "@/components/CalculatorCategories";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedCalculator />
        <CalculatorCategories />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
