import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Web Developer',
    content:
      'The courses on this platform have been instrumental in advancing my career. Highly recommended!',
    avatar: '/avatars/alice.jpg',
  },
  {
    id: 2,
    name: 'Mark Thompson',
    role: 'Data Scientist',
    content:
      "I've learned more from these courses than I did in my entire college education. Great quality content!",
    avatar: '/avatars/mark.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
