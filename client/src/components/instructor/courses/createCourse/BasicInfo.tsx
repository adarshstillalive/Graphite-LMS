import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CourseFormValues } from '@/pages/instructor/courses/CreateCourse';
import { ICategory, ISubCategory } from '@/services/admin/courseService';
import { UseFormReturn } from 'react-hook-form';
import {
  gridStyle,
  inputStyle,
  languages,
  levels,
} from '@/interfaces/zodCourseFormSchema';

interface BasicInfoProps {
  form: UseFormReturn<CourseFormValues>;
  categories: ICategory[];
}

const BasicInfo = ({ form, categories }: BasicInfoProps) => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);

  useEffect(() => {
    const currentCategory = form.getValues('category');
    if (currentCategory) {
      const foundCategory = categories.find(
        (cat) => cat._id === currentCategory
      );
      if (foundCategory) {
        setSubCategories(foundCategory.subCategory || []);

        const currentSubcategory = form.getValues('subcategory');
        if (currentSubcategory) {
          const isValidSubcategory = foundCategory.subCategory?.some(
            (subCat) => subCat._id === currentSubcategory
          );

          if (!isValidSubcategory) {
            form.setValue('subcategory', '');
          }
        }
      }
    }
  }, [categories, form]);

  const handleCategoryChange = (categoryId: string) => {
    const selectedCategory = categories.find((cat) => cat._id === categoryId);

    if (selectedCategory) {
      setSubCategories(selectedCategory.subCategory || []);

      form.setValue('subcategory', '');
    }
  };

  return (
    <Card className="w-full mt-4 space-y-4 mx-auto">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={gridStyle}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    className={inputStyle}
                    placeholder="Enter course title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A clear and concise title that accurately reflects the course
                  content.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Subtitle</FormLabel>
                <FormControl>
                  <Input
                    className={inputStyle}
                    placeholder="Enter course subtitle"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A brief description to provide additional context.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className={gridStyle}>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCategoryChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={inputStyle}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.name}
                        value={category._id ? category._id : ''}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={subCategories.length === 0}
                >
                  <FormControl>
                    <SelectTrigger className={inputStyle}>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subCategories.map((subCategory) => (
                      <SelectItem
                        key={subCategory.name}
                        value={subCategory._id ? subCategory._id : ''}
                      >
                        {subCategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {subCategories.length === 0 && (
                  <FormDescription>
                    Select a category first to choose a subcategory
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className={gridStyle}>
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={inputStyle}>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={inputStyle}>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
