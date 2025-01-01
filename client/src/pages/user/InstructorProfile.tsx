import { useParams } from 'react-router-dom';
import BreadCrumbs from '@/components/common/BreadCrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  IInstructorPopulatedCourse,
  InstructorCoursePopulated,
  SocialAccounts,
} from '@/interfaces/Instructor';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchInstructor } from '@/services/user/courseService';
import { CourseCardInstructor } from '@/components/user/course/CourseCardInstructor';
import InstructorReviewSectionPurchased from '@/components/user/course/InstructorReviewSectionPurchased';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import InstructorReviewSection from '@/components/user/course/InstructorReviewSection';
import { Star } from 'lucide-react';

const InstructorProfile = () => {
  const { toast } = useToast();
  const { instructorId } = useParams();
  const [instructor, setInstructor] = useState<IInstructorPopulatedCourse>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isEligibleToReview, setIsEligibleToReview] = useState(false);

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        if (!instructorId) {
          throw new Error('Instructor id not available');
        }
        const response = await fetchInstructor(instructorId);

        setInstructor(response.data);
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Loading error, Refresh the page',
        });
      }
    };
    fetchInstructorData();
  }, []);

  useEffect(() => {
    if (instructor?.courses && currentUser) {
      const isPurchased = instructor.courses.some(
        (course) =>
          currentUser.purchasedCourses &&
          currentUser.purchasedCourses.some(
            (purchased) => purchased._id === course.courseId._id
          )
      );
      setIsEligibleToReview(isPurchased);
    }
  }, [instructor, currentUser]);

  return (
    instructor && (
      <>
        <div className="flex flex-col gap-6 py-8 px-24">
          <BreadCrumbs />
          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
            <div className="space-y-6 w-full lg:w-2/3">
              <div>
                <h1 className="text-3xl font-bold">
                  {instructor.userId.firstName +
                    ' ' +
                    instructor.userId.lastName}
                </h1>
                <p className="text-gray-600">{instructor.userId.email}</p>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(instructor.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold mr-4">
                  {instructor.reviews?.length} rating(s)
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{instructor.bio || 'Empty'}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Expertise */}
                  {instructor.expertise && instructor.expertise.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Expertise</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {instructor.expertise.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Expertise</h3>
                      <p className="text-gray-500">
                        No expertise information available.
                      </p>
                    </div>
                  )}

                  {/* Education */}
                  {instructor.qualifications &&
                  instructor.qualifications.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Education</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {instructor.qualifications.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Education</h3>
                      <p className="text-gray-500">
                        No education information available.
                      </p>
                    </div>
                  )}

                  {/* Social Links */}
                  {instructor.socialAccounts &&
                  instructor.socialAccounts.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Social Links
                      </h3>
                      <ul className="space-y-2">
                        {instructor.socialAccounts.map(
                          (account: SocialAccounts, index: number) => (
                            <li key={index}>
                              <a
                                href={account.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center"
                              >
                                <span className="font-medium mr-2 text-black">
                                  {account.provider}:
                                </span>
                                {account.link}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Social Links
                      </h3>
                      <p className="text-gray-500">
                        No social links available.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-64 h-64 border-gray-800 border-8">
                <AvatarImage
                  src={instructor.profilePicture}
                  alt={instructor.userId.firstName}
                />
                <AvatarFallback>
                  {instructor.userId.firstName && instructor.userId.firstName}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {instructor.courses && instructor.courses.length > 0 && (
            <div className="w-full">
              <h3 className="text-2xl font-semibold mb-4">Courses</h3>
              <div className="w-full overflow-x-auto">
                <div className="flex space-x-4 pb-4">
                  {instructor.courses.map(
                    (course: InstructorCoursePopulated) => (
                      <div key={course.courseId._id} className="flex-shrink-0">
                        <CourseCardInstructor
                          course={course.courseId}
                          instructorName={
                            instructor.userId.firstName +
                            ' ' +
                            instructor.userId.lastName
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {instructor._id &&
          currentUser?._id &&
          (isEligibleToReview ? (
            <InstructorReviewSectionPurchased
              instructorId={instructor._id}
              userId={currentUser._id}
            />
          ) : (
            <InstructorReviewSection instructorId={instructor._id} />
          ))}
      </>
    )
  );
};

export default InstructorProfile;
