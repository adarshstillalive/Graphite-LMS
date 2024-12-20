import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gray-100 py-24 px-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Learn on your schedule</h1>
          <p className="text-xl mb-6">
            Study any topic, anytime. Choose expert-led courses now.
          </p>
          <Button size="lg">Explore Courses</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
