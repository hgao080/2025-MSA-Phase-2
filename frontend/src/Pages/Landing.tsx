import Hero from '../Components/Hero';
import StatsSection from '../Components/StatsSection';
import FeaturesSection from '../Components/FeaturesSection';
import TestimonialsSection from '../Components/TestimonialsSection';
import CTASection from '../Components/CTASection';
import Footer from '../Components/Footer';

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
