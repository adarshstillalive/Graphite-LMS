import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ICategory } from '@/services/admin/courseService';
import { fetchCategoriesFromApi } from '@/services/instructor/courseService';
import { useEffect, useState } from 'react';

const BasicInfo = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategoriesFromApi();

        setCategories(response.data);
      } catch (error) {
        toast({
          variant: 'destructive',
          description: 'Error in categories management',
        });

        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-4">
      <FormField
        name="title"
        render={() => (
          <FormItem>
            <FormLabel>Course Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter course title" />
            </FormControl>
            <FormDescription>
              A clear and concise title that accurately reflects the course
              content.
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        name="subtitle"
        render={() => (
          <FormItem>
            <FormLabel>Course Subtitle</FormLabel>
            <FormControl>
              <Input placeholder="Enter course subtitle" />
            </FormControl>
            <FormDescription>
              A brief description to provide additional context.
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        name="category"
        render={() => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name="subcategory"
        render={() => (
          <FormItem>
            <FormLabel>Subcategory</FormLabel>
            <Select>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="digital-marketing">
                  Digital Marketing
                </SelectItem>
                <SelectItem value="painting">Painting</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name="language"
        render={() => (
          <FormItem>
            <FormLabel>Language</FormLabel>
            <Select>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name="level"
        render={() => (
          <FormItem>
            <FormLabel>Level</FormLabel>
            <Select>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfo;
