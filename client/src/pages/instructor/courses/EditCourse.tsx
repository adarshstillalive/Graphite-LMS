import BasicInfo from '@/components/instructor/courses/createCourse/BasicInfo';
import CourseDetails from '@/components/instructor/courses/createCourse/CourseDetails';
import Curriculum from '@/components/instructor/courses/createCourse/Curriculum';
import Marketing from '@/components/instructor/courses/createCourse/Marketing';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { courseSchema } from '@/interfaces/zodCourseFormSchema';
import {
  setCourseId,
  setIsFormSubmitted,
} from '@/redux/slices/instructor/courseCreationSlice';
import { ICategory, ISubCategory } from '@/services/admin/courseService';
import {
  editCourseApi,
  fetchCategoriesFromApi,
  fetchCourseApi,
} from '@/services/instructor/courseService';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from '@reduxjs/toolkit';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { CourseFormValues } from './CreateCourse';
import BreadCrumbs from '@/components/common/BreadCrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { IChapter } from '@/interfaces/Course';

const EditCourse = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeTab, setActiveTab] = useState('basicInfo');
  const navigate = useNavigate();

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
      thumbnail: '',
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
    if (!id) return;
    try {
      await editCourseApi(id, data);

      dispatch(setIsFormSubmitted(true));
      dispatch(setCourseId(id));
      navigate('/instructor/courses');
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update the course. Please try again.',
      });
    }
  };

  useEffect(() => {
    const fetchInitials = async () => {
      try {
        if (!id) return;
        const response1 = await fetchCourseApi(id);
        const subcategory =
          response1.data.category.subCategory.find(
            (curr: ISubCategory) => curr._id === response1.data.subcategory
          )?._id || '';

        form.reset({
          ...response1.data,
          category: response1.data.category?._id || '',
          subcategory: subcategory || '',
          chapters:
            response1.data?.chapters?.map((chapter: IChapter) => ({
              ...chapter,
              episodes: chapter.episodes.map((episode) => ({
                ...episode,
                content:
                  episode.type === 'text'
                    ? { content: episode.content }
                    : { video: episode.content },
              })),
            })) || [],
          price: String(response1.data.price),
        });
        const response2 = await fetchCategoriesFromApi();
        setCategories(response2.data);
      } catch (error) {
        toast({
          variant: 'destructive',
          description: 'Error in loading, Refresh the page',
        });
        console.log(error);
      }
    };

    fetchInitials();
  }, [toast]);
  return (
    <div className="space-y-4">
      <BreadCrumbs />
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
                <Button type="submit">Submit</Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditCourse;
