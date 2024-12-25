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

const InstructorProfile = () => {
  const { toast } = useToast();
  const { instructorId } = useParams();
  const [instructor, setInstructor] = useState<IInstructorPopulatedCourse>();

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

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{instructor.bio || 'Empty'}</p>
                </div>

                {instructor.expertise && instructor.expertise.length > 0 && (
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
                )}

                {instructor.qualifications &&
                  instructor.qualifications.length > 0 && (
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
                  )}

                {instructor.socialAccounts &&
                  instructor.socialAccounts.length > 0 && (
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
                                <span className="font-medium mr-2">
                                  {account.provider}:
                                </span>
                                {account.link}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
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
      </>
    )
  );
};

export default InstructorProfile;
