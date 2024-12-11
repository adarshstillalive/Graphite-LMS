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
import {
  setCourseId,
  setIsFormSubmitted,
} from '@/redux/slices/instructor/courseCreationSlice';
import { ICategory } from '@/services/admin/courseService';
import {
  createCourseApi,
  fetchCategoriesFromApi,
} from '@/services/instructor/courseService';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from '@reduxjs/toolkit';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { z } from 'zod';

export type CourseFormValues = z.infer<typeof courseSchema>;

const CreateCourse = () => {
  const dispatch = useDispatch();
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

  const onSubmit = async (data: CourseFormValues) => {
    console.log(data);
    try {
      const response = await createCourseApi(data);
      console.log(response);
      if (response.success) {
        const { courseId } = response.data;
        dispatch(setIsFormSubmitted(true));
        dispatch(setCourseId(courseId));
        form.reset();
        toast({
          variant: 'default',
          description:
            'Your course has been created. Uploads will continue in the background.',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create the course. Please try again.',
      });
    }
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
                {form.formState.errors.title ||
                form.formState.errors.subtitle ||
                form.formState.errors.category ||
                form.formState.errors.subcategory ||
                form.formState.errors.language ||
                form.formState.errors.level ? (
                  <TriangleAlert className="text-red-500 mx-2" />
                ) : null}
              </TabsTrigger>
              <TabsTrigger value="courseDetails">
                Course Details
                {form.formState.errors.description ||
                form.formState.errors.price ? (
                  <TriangleAlert className="text-red-500 mx-2" />
                ) : null}
              </TabsTrigger>
              <TabsTrigger value="curriculum">
                Curriculum
                {form.formState.errors.chapters ? (
                  <TriangleAlert className="text-red-500 mx-2" />
                ) : null}
              </TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
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
          <div className="mt-6 flex justify-between items-center">
            {/* Previous Button */}
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

            {/* Next and Create Course Buttons */}
            <div className="flex space-x-4">
              {activeTab !== 'marketing' && (
                <Button
                  type="button"
                  onClick={() => {
                    const currentIndex = [
                      'basicInfo',
                      'courseDetails',
                      'curriculum',
                      'marketing',
                    ].indexOf(activeTab);
                    if (currentIndex < 3) {
                      setActiveTab(
                        [
                          'basicInfo',
                          'courseDetails',
                          'curriculum',
                          'marketing',
                        ][currentIndex + 1]
                      );
                    }
                  }}
                >
                  Next
                </Button>
              )}

              {activeTab === 'marketing' && (
                <Button type="submit">Create Course</Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourse;
