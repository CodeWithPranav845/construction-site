import Hero from '../components/home/Hero.jsx';
import ServicesPreview from '../components/home/ServicesPreview.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import FeaturedProjects from '../components/home/FeaturedProjects.jsx';
import TestimonialSlider from '../components/testimonials/TestimonialSlider.jsx';
import CTA from '../components/home/CTA.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyChooseUs />
      <FeaturedProjects />
      <TestimonialSlider />
      <CTA />
    </>
  );
}
