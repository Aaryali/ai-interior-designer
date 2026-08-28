import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { BeforeAfter } from '../components/BeforeAfter';
import { Capabilities } from '../components/Capabilities';
import { HowItWorks } from '../components/HowItWorks';
import { FeatureShowcase } from '../components/FeatureShowcase';
import { AIChatPreview } from '../components/AIChatPreview';
import { ProductPreview } from '../components/ProductPreview';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#181716] antialiased selection:bg-[#DED8CB]">
      {/* 1. Navigation */}
      <Navbar brandName="Forma" />

      <main className="flex-1">
        {/* 2. Cinematic Hero Section with Computer Vision Analysis */}
        <Hero />

        {/* 3. Interactive Before / After Room Comparison Slider */}
        <BeforeAfter />

        {/* 4. Product Capabilities: "From empty room to complete vision." */}
        <Capabilities />

        {/* 5. How It Works: 4-Step Progressive Timeline */}
        <HowItWorks />

        {/* 6. Feature Showcase: Multi-Angle, Lighting Studio, Seasons & 360° Concept Tour */}
        <FeatureShowcase />

        {/* 7. AI Design Assistant Preview (Concept Demo) */}
        <AIChatPreview />

        {/* 8. Product Visualization Preview: In-Room Furniture Placement & Compatibility Radar */}
        <ProductPreview />

        {/* 9. Final CTA: "Your room is only the beginning." */}
        <FinalCTA />
      </main>

      {/* 10. Footer */}
      <Footer brandName="Forma" />
    </div>
  );
}
