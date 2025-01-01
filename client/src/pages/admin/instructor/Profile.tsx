import { useLocation } from 'react-router-dom';
import BreadCrumbs from '@/components/common/BreadCrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SocialAccounts } from '@/interfaces/Instructor';
import { CourseCard } from '@/components/admin/course/CourseCard';
import { IPopulatedCourse } from '@/interfaces/Course';

interface CourseObj {
  courseId: IPopulatedCourse;
  createdAt: Date;
}

const Profile = () => {
  const location = useLocation();
  const { instructor } = location.state;

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col gap-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          <div className="space-y-6 w-full lg:w-2/3">
            <div>
              <h1 className="text-3xl font-bold">
                {instructor.userId.firstName + ' ' + instructor.userId.lastName}
              </h1>
              <p className="text-gray-600">{instructor.userId.email}</p>
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
                    <h3 className="text-xl font-semibold mb-2">Social Links</h3>
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
                    <h3 className="text-xl font-semibold mb-2">Social Links</h3>
                    <p className="text-gray-500">No social links available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32 lg:w-64 lg:h-64 border-gray-800 border-8">
              <AvatarImage
                src={instructor.profilePicture}
                alt={instructor.userId.firstName}
              />
              <AvatarFallback>{instructor.userId.firstName[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      {instructor.courses && instructor.courses.length > 0 && (
        <div className="space-y-6 w-full">
          <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto p-4">
            {instructor.courses.map((course: CourseObj) => (
              <CourseCard course={course.courseId} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
