import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus, Trash2 } from 'lucide-react';
import { ICategory, updateCategory } from '@/services/admin/courseService';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be atlest 2 characters',
  }),
  subCategory: z
    .array(
      z.object({
        name: z.string().min(2, {
          message: 'Subcategory name must be at least 2 characters',
        }),
      })
    )
    .min(1, {
      message: 'Atleast one subcategory is required',
    }),
});

export type CategoryFormValues = z.infer<typeof formSchema>;
interface EditCategoryProps {
  categoryData: ICategory;
  click: () => void;
}
const EditCategory: React.FC<EditCategoryProps> = ({ categoryData, click }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: categoryData.name,
      subCategory: categoryData.subCategory,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subCategory',
  });

  const onSubmit = async (data: CategoryFormValues) => {
    setIsLoading(true);
    try {
      const response = await updateCategory(data, String(categoryData._id));
      if (response.success) {
        form.reset();
        click();
        toast({
          variant: 'default',
          description: 'Category updated',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Category creation failed, Try again',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Subcategories</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: '' })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Subcategory
            </Button>
          </div>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`subCategory.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Enter subcategory name" {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button
          disabled={isLoading}
          className={isLoading ? 'bg-gray-500 cursor-not-allowed' : '`'}
          type="submit"
        >
          Update Category
        </Button>
      </form>
    </Form>
  );
};

export default EditCategory;
