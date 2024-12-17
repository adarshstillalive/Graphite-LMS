import { Button } from '@/components/ui/button';
import { inputStyle } from '@/interfaces/zodCourseFormSchema';
import { ICategory } from '@/services/admin/courseService';
import { fetchCategoriesFromApi } from '@/services/user/courseService';
import { useEffect, useState } from 'react';

interface CategoriesProps {
  passCategories: (c: ICategory[]) => void;
}

const Categories: React.FC<CategoriesProps> = ({ passCategories }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

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
    <section className="bg-gray-100 py-16 px-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Button key={category._id} variant="outline" className={inputStyle}>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
