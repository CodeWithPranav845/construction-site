import Button from '../common/Button.jsx';
import HeroDrawing from './HeroDrawing.jsx';
import { SITE } from '../../config/site.js';

export default function Hero() {
  return (
    <section className="blueprint-grid text-white">
      <div className="container-x grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div>
          <h1 className="text-5xl leading-[1.05] md:text-6xl lg:text-7xl">{SITE.tagline}</h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">{SITE.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/contact" size="lg">
              Get a free quote
            </Button>
            <Button to="/projects" variant="outlineLight" size="lg">
              See completed projects
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <HeroDrawing />
        </div>
      </div>
    </section>
  );
}
