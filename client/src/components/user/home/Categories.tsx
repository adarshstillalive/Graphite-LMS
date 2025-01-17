import { Button } from '@/components/ui/button';
import { inputStyle } from '@/interfaces/zodCourseFormSchema';
import { ICategory } from '@/services/admin/courseService';
import { fetchCategoriesFromApi } from '@/services/user/courseService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CategoriesProps {
  passCategories: (c: ICategory[]) => void;
}

const Categories: React.FC<CategoriesProps> = ({ passCategories }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleCategoryClick = (id: string) => {
    const queryParams = new URLSearchParams();
    queryParams.append('Category', id.toString());
    const queryString = queryParams.toString();
    navigate(`/courses?${queryString}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategoriesFromApi();
        setCategories(response.data);
        passCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="bg-gray-100 py-8 sm:py-16 px-4 sm:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Top Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((category) => (
            <Button
              key={category._id}
              variant="outline"
              className={`${inputStyle} w-full text-sm sm:text-base`}
              onClick={() => category._id && handleCategoryClick(category._id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
