import CourseContent from '@/components/admin/course/CourseContent';
import EpisodeContent from '@/components/admin/course/EpisodeContent';
import BreadCrumbs from '@/components/common/BreadCrumbs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { IEpisode, IPopulatedCourse } from '@/interfaces/Course';
import {
  approveCourseRequest,
  fetchCourseApi,
  rejectCourseRequest,
} from '@/services/admin/courseService';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId } = location.state;
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [course, setCourse] = useState<IPopulatedCourse>();

  const handleApproveCourse = async (id: string) => {
    try {
      const response = await approveCourseRequest(id);
      if (response.success) {
        navigate('/admin/courses');
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Approving course status failed, try again',
      });
    }
  };

  const handleRejectCourse = async (id: string) => {
    try {
      const response = await rejectCourseRequest(id, rejectionReason);
      if (response.success) {
        navigate('/admin/courses');
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Rejecting course status failed, try again',
      });
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async (id: string) => {
      try {
        const response = await fetchCourseApi(id);
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseDetails(courseId);
  }, [courseId]);

  return (
    course && (
      <>
        <BreadCrumbs />
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{course.subtitle}</p>
            <div className="flex items-center mb-4">
              <span className="text-gray-600">
                {course.category.name} -{' '}
                {course.category.subCategory.reduce((acc, curr) => {
                  if (curr._id === course.subcategory) {
                    return curr.name;
                  }
                  return acc;
                }, 'Not found')}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Created by{' '}
              <span className="font-semibold">
                {course.instructorId.firstName +
                  ' ' +
                  course.instructorId.lastName}
              </span>
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-8">
            <main className="md:w-2/3">
              <div className="flex items-start gap-8">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className=" object-contain rounded-sm mb-8"
                />
                <aside className="md:w-1/3">
                  <div className="bg-white rounded-sm border-gray-300 border p-6 top-8">
                    <h2 className="text-2xl font-bold mb-4">Course Info</h2>
                    <ul className="space-y-2 mb-6">
                      <li>
                        <strong>Level:</strong> {course.level}
                      </li>
                      <li>
                        <strong>Language:</strong> {course.language}
                      </li>
                      <li>
                        <strong>Price:</strong> ₹{course.price}{' '}
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                <p className="text-gray-700">{course.description}</p>
              </section>
              {course.chapters && (
                <CourseContent
                  chapters={course.chapters}
                  onSelectEpisode={setSelectedEpisode}
                />
              )}
            </main>
            {(!course.isApproved || course.isRejected) && (
              <aside className="md:w-1/3">
                <div className="bg-white flex flex-col gap-2 rounded-lg border-4 border-gray-600 p-6 sticky top-8">
                  <h2 className="text-2xl text-center font-bold mb-4">
                    Actions
                  </h2>
                  <Button
                    onClick={() =>
                      course._id && handleApproveCourse(course._id)
                    }
                  >
                    Approve Course
                  </Button>
                  {!course.isRejected && (
                    <Button onClick={() => setRejectDialogOpen(true)}>
                      Reject Course
                    </Button>
                  )}
                </div>
              </aside>
            )}
          </div>

          {selectedEpisode && (
            <EpisodeContent
              episode={selectedEpisode}
              onClose={() => setSelectedEpisode(null)}
            />
          )}
          <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Course</DialogTitle>
                <DialogDescription>
                  Please provide a reason for rejecting this course.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-4"
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setRejectDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => course._id && handleRejectCourse(course._id)}
                  disabled={!rejectionReason.trim()}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </>
    )
  );
};

export default CourseDetail;
