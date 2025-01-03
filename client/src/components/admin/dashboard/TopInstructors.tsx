import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IInstructorPopulated } from '@/interfaces/Instructor';
import { fetchTopInstructors } from '@/services/admin/instructorService';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const TopInstructors = () => {
  const [instructors, setInstructors] = useState<IInstructorPopulated[]>();

  useEffect(() => {
    const topInstructors = async () => {
      try {
        const response = await fetchTopInstructors();

        setInstructors(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    topInstructors();
  }, []);
  return (
    instructors && (
      <Card className="rounded-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Instructors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {instructors.map((instructor) => (
              <div
                key={instructor._id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-10 h-10">
                    <img
                      src={instructor.profilePicture}
                      alt={instructor.userId.firstName}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {instructor.userId.firstName +
                        ' ' +
                        instructor.userId.lastName}
                    </p>
                    {/* <p className="text-sm text-muted-foreground">
                      {instructor.organization}
                    </p> */}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">
                      {instructor.rating} ({instructor.reviews?.length})
                    </span>
                  </div>
                  <span className="text-sm">
                    {instructor.courses?.length} courses
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default TopInstructors;
