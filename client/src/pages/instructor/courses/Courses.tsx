import { CourseCard } from '@/components/instructor/courses/course/CourseCard';
import { CourseDetailPage } from '@/components/instructor/courses/course/CourseDetailPage';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IPopulatedCourse } from '@/interfaces/Course';
import { fetchCoursesApi } from '@/services/instructor/courseService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<IPopulatedCourse | null>(
    null
  );
  const [courses, setCourses] = useState<IPopulatedCourse[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchCoursesApi();
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleViewDetails = (course: IPopulatedCourse) => {
    setSelectedCourse(course);
    setShowDetails(true);
  };

  // const handleBackToCourses = () => {
  //   setShowDetails(false);
  //   setSelectedCourse(null);
  // };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="rounded-none">
          <Link to="/instructor/createCourse">Create Course</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>Manage and view your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="container mx-auto p-4">
            {!showDetails ? (
              courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onViewDetails={() => handleViewDetails(course)}
                  />
                ))
              ) : (
                <p>No courses found. Start by creating a new course.</p>
              )
            ) : selectedCourse ? (
              <CourseDetailPage course={selectedCourse} />
            ) : (
              <p>Loading course details...</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p>End of Courses</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Courses;
