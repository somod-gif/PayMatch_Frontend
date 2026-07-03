import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  HeroSection,
  TrustSection,
  ProblemSection,
  SolutionSection,
  FeaturesSection,
  HowItWorksSection,
  WhyPayMatchSection,
  TargetUsersSection,
  FAQSection,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <HeroSection />
        <TrustSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <WhyPayMatchSection />
        <TargetUsersSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
