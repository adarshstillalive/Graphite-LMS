import { Button } from '@/components/ui/button';
import Categories from '@/components/user/home/Categories';
import FeaturedCourses from '@/components/user/home/FeaturesCourses';
import Hero from '@/components/user/home/Hero';
import HighRatedCourse from '@/components/user/home/HighRatedCourse';
import Testimonials from '@/components/user/home/Testimonials';
import { ICategory } from '@/services/admin/courseService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  const handleCategoryClick = (id: string) => {
    const queryParams = new URLSearchParams();
    queryParams.append('Category', id.toString());
    const queryString = queryParams.toString();
    navigate(`/courses?${queryString}`);
  };

  return (
    <div className="min-h-screen">
      {categories.length > 0 && (
        <div className="fixed w-full flex justify-around bg-white overflow-x-auto py-2 px-4 shadow-sm z-10">
          <div className="flex space-x-2">
            {categories.map((c: ICategory) => (
              <Button
                key={c._id}
                variant={'outline'}
                className="whitespace-nowrap px-4 sm:px-8 border-none"
                onClick={() => c._id && handleCategoryClick(c._id)}
              >
                {c.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      <Hero />
      <FeaturedCourses />
      <HighRatedCourse />
      <Categories passCategories={(c: ICategory[]) => setCategories(c)} />
      <Testimonials />
    </div>
  );
};

export default Home;
