import Hero from '../Components/Landing/Hero';
import StatsSection from '../Components/Landing/StatsSection';
import FeaturesSection from '../Components/Landing/FeaturesSection';
import TestimonialsSection from '../Components/Landing/TestimonialsSection';
import CTASection from '../Components/Landing/CTASection';
import Footer from '../Components/Misc/Footer';

export default function Landing() {
  return (
    <div className="bg-gradient-to-b from-slate-50 dark:from-gray-900 to-indigo-50 dark:to-indigo-950 pb-6">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
