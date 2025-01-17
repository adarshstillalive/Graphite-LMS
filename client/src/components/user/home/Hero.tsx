import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gray-100 py-16 sm:py-24 px-4 sm:px-8">
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            Learn on your schedule
          </h1>
          <p className="text-lg sm:text-xl mb-4 sm:mb-6">
            Study any topic, anytime. Choose expert-led courses now.
          </p>
          <Link to="/courses">
            <Button size="lg" className="w-full sm:w-auto">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
