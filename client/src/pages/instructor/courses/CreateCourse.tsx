import BasicInfo from '@/components/instructor/courses/createCourse/BasicInfo';
import CourseDetails from '@/components/instructor/courses/createCourse/CourseDetails';
import Curriculum from '@/components/instructor/courses/createCourse/Curriculum';
import Marketing from '@/components/instructor/courses/createCourse/Marketing';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { courseSchema } from '@/interfaces/zodCourseFormSchema';
import { ICategory } from '@/services/admin/courseService';
import { fetchCategoriesFromApi } from '@/services/instructor/courseService';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from '@reduxjs/toolkit';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

export type CourseFormValues = z.infer<typeof courseSchema>;

const CreateCourse = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeTab, setActiveTab] = useState('basicInfo');

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      category: '',
      subcategory: '',
      language: '',
      level: '',
      description: '',
      price: '',
      welcomeMessage: '',
      courseCompletionMessage: '',
      chapters: [
        {
          id: nanoid(),
          title: '',
          episodes: [
            {
              id: nanoid(),
              title: '',
              type: 'video',
              content: { video: false },
            },
          ],
        },
      ],
    },
  });

  const onSubmit = (data: CourseFormValues) => {
    console.log(data);
    console.log(form.formState.errors);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategoriesFromApi();
        setCategories(response.data);
      } catch (error) {
        toast({
          variant: 'destructive',
          description: 'Error in loading, Refresh the page',
        });
        console.log(error);
      }
    };
    fetchCategories();
  }, [toast]);
  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/instructor/courses"> Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create course</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basicInfo">
                Basic Info
                <TriangleAlert className="text-red-500 mx-2" />
              </TabsTrigger>
              <TabsTrigger value="courseDetails">
                Course Details
                <TriangleAlert className="text-red-500 mx-2" />
              </TabsTrigger>
              <TabsTrigger value="curriculum">
                Curriculum
                <TriangleAlert className="text-red-500 mx-2" />
              </TabsTrigger>
              <TabsTrigger value="marketing">
                Marketing
                <TriangleAlert className="text-red-500 mx-2" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="basicInfo">
              {categories.length > 0 && (
                <BasicInfo form={form} categories={categories} />
              )}
            </TabsContent>
            <TabsContent value="courseDetails">
              <CourseDetails form={form} />
            </TabsContent>
            <TabsContent value="curriculum">
              <Curriculum form={form} />
            </TabsContent>
            <TabsContent value="marketing">
              <Marketing form={form} />
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const currentIndex = [
                  'basicInfo',
                  'courseDetails',
                  'curriculum',
                  'marketing',
                ].indexOf(activeTab);
                if (currentIndex > 0) {
                  setActiveTab(
                    ['basicInfo', 'courseDetails', 'curriculum', 'marketing'][
                      currentIndex - 1
                    ]
                  );
                }
              }}
              disabled={activeTab === 'basicInfo'}
            >
              Previous
            </Button>
            <Button
              type={activeTab === 'marketing' ? 'submit' : 'button'}
              onClick={() => {
                const currentIndex = [
                  'basicInfo',
                  'courseDetails',
                  'curriculum',
                  'marketing',
                ].indexOf(activeTab);
                if (currentIndex < 3) {
                  setActiveTab(
                    ['basicInfo', 'courseDetails', 'curriculum', 'marketing'][
                      currentIndex + 1
                    ]
                  );
                }
              }}
            >
              {activeTab === 'marketing' ? 'Create Course' : 'Next'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourse;
