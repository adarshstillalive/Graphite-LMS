import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import ReviewSection from '@/components/user/course/ReviewSection';
import { useToast } from '@/hooks/use-toast';
import { IPopulatedCourseCommon } from '@/interfaces/Course';
import { inputStyle } from '@/interfaces/zodCourseFormSchema';
import { RootState } from '@/redux/store';
import { fetchCommonCourse } from '@/services/user/courseService';
import { addToCart, removeFromCart } from '@/services/user/profileService';
import { FileText, Play, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

interface CourseDetailProps {
  id: string;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ id }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
  const [course, setCourse] = useState<IPopulatedCourseCommon>();

  const handleCart = async (courseId: string) => {
    try {
      if (!currentUser) {
        navigate('/auth/login');
      }
      const isExist =
        currentUser?.cart &&
        currentUser?.cart.some((item) => item?._id === courseId);
      if (isExist) {
        await removeFromCart(courseId);
        toast({
          variant: 'default',
          description: 'Removed from cart',
        });
      } else {
        await addToCart(courseId);
        toast({
          variant: 'default',
          description: 'Added to cart',
        });
      }
    } catch (error) {
      const isExist =
        currentUser?.cart &&
        currentUser?.cart.some((item) => item._id === courseId);
      console.log(error);
      toast({
        variant: 'destructive',
        description: `${isExist ? 'Removal from ' : 'Adding to '}cart failed, Try again`,
      });
    }
  };

  const handleBuyNow = async (courseId: string) => {
    try {
      if (!currentUser) {
        navigate('/auth/login');
      }
      const isExist =
        currentUser?.cart &&
        currentUser?.cart.some((item) => item?._id === courseId);
      if (!isExist) {
        await addToCart(courseId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) return;
        const response = await fetchCommonCourse(id);
        const result = response.data;

        setCourse(result);
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Error in loading, Refresh the page',
        });
      }
    };
    fetchCourse();
  }, [id]);

  return (
    course && (
      <div className="min-h-screen bg-white">
        <div className="bg-gray-900 min-h-[400px] text-white">
          <div className="container mx-auto px-16 py-16 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl mb-6">{course.subtitle}</p>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(course.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold mr-4">
                  {course.reviews?.length} rating(s)
                </span>
              </div>
              <p>
                Created by{' '}
                <Link
                  to={`/courses/courseDetail/instructorProfile/${course?.instructorId?._id}`}
                >
                  <span className="font-semibold">
                    {course?.instructorId?.firstName}
                  </span>
                </Link>
              </p>
              <p>
                <span className="font-light">
                  {course?.category?.name} -{' '}
                  {course?.category?.subCategory.reduce((acc, curr) => {
                    if (curr?._id === course?.subcategory) {
                      return curr?.name;
                    }
                    return acc;
                  }, 'Not found')}
                </span>
              </p>
            </div>

            <div className="flex w-2/5 flex-col md:flex-row items-start bg-white text-gray-900 shadow-lg">
              {/* <div className="md:w-1/2 w-full">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div> */}

              <div className=" w-full p-12 border-4 border-white bg-gray-900 flex flex-col">
                <div className="mb-2">
                  <span className="text-2xl text-white font-bold">
                    ₹{course?.price?.toFixed(2)}
                  </span>
                </div>
                <Button
                  variant={'outline'}
                  className={`${inputStyle} border-2 mb-2 bg-white`}
                  onClick={() => handleCart(course?._id)}
                >
                  {currentUser?.cart?.some((item) => item?._id === course?._id)
                    ? 'Remove from cart'
                    : 'Add to cart'}
                </Button>
                <Button
                  variant={'outline'}
                  className={`${inputStyle} border-2 mb-2 bg-white`}
                  onClick={() => {
                    handleBuyNow(course._id);
                    navigate('/profile/cart');
                  }}
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-16 py-8">
          <div className="md:w-3/5">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Course Chapters</h2>
              <Accordion type="single" collapsible className="w-full">
                {course.chapters?.map((chapter) => (
                  <AccordionItem key={chapter.id} value={chapter.id}>
                    <AccordionTrigger className="py-6 text-lg font-normal">
                      {chapter.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {chapter.episodes.map((episode) => (
                          <li
                            key={episode.id}
                            className="flex items-center py-2"
                          >
                            {episode.type === 'video' ? (
                              <Play className="mr-2 h-4 w-4" />
                            ) : (
                              <FileText className="mr-2 h-4 w-4" />
                            )}
                            <span>{episode.title}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p>{course.description}</p>
            </div>
          </div>
        </div>
        <ReviewSection courseId={course._id} />
      </div>
    )
  );
};

export default CourseDetail;
