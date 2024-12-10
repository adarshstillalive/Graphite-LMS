import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { IPopulatedCourse } from '@/interfaces/Course';

interface CourseRequestDetailProps {
  course: IPopulatedCourse;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (courseId: string) => void;
}

export const RejectedRequestDetails: React.FC<CourseRequestDetailProps> = ({
  course,
  isOpen,
  onClose,
  onApprove,
}) => {
  return (
    <>
      {/* Main Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[800px] h-[90vh]">
          <DialogHeader>
            <DialogTitle>{course.title}</DialogTitle>
            <DialogDescription>{course.subtitle}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <p>
                  <strong>Instructor Name:</strong>{' '}
                  {course.instructorId.firstName}
                </p>
                <p>
                  <strong>Category:</strong> {course.category.name}
                </p>
                <p>
                  <strong>Subcategory:</strong>{' '}
                  {course.category.subCategory.reduce((acc, curr) => {
                    if (curr._id === course.subcategory) {
                      return curr.name;
                    }
                    return acc;
                  }, 'Not found')}
                </p>
                <p>
                  <strong>Language:</strong> {course.language}
                </p>
                <p>
                  <strong>Level:</strong> {course.level}
                </p>
                <p>
                  <strong>MRP:</strong> ₹{course.mrp}
                </p>
                <p>
                  <strong>Price:</strong> ₹{course.price}
                </p>
                <div className="flex items-center space-x-2">
                  <strong>Status:</strong>
                  <Badge variant="destructive">Rejected</Badge>
                  <Badge variant={course.isPublished ? 'default' : 'secondary'}>
                    {course.isPublished ? 'Published' : 'Unpublished'}
                  </Badge>
                </div>
                {course.rating !== undefined && (
                  <p>
                    <strong>Rating:</strong> {course.rating}
                  </p>
                )}
                <p>
                  <strong>Created At:</strong>{' '}
                  {course.createdAt &&
                    new Date(course.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{' '}
                  {course.updatedAt &&
                    new Date(course.updatedAt).toLocaleString()}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p>{course.description}</p>
              </div>
            </div>
            {course.welcomeMessage && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold">Welcome Message</h3>
                  <p>{course.welcomeMessage}</p>
                </div>
              </>
            )}

            {course.courseCompletionMessage && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold">
                    Course Completion Message
                  </h3>
                  <p>{course.courseCompletionMessage}</p>
                </div>
              </>
            )}

            {course.chapters && course.chapters.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold">Chapters</h3>
                  {course.chapters.map((chapter, index) => (
                    <div key={chapter.id} className="mt-2">
                      <h4 className="text-md font-semibold">
                        Chapter {index + 1}: {chapter.title}
                      </h4>
                      {chapter.description && <p>{chapter.description}</p>}
                      <ul className="list-disc list-inside">
                        {chapter.episodes.map((episode) => (
                          <li key={episode.id}>
                            {episode.title} ({episode.type})
                            {episode.description && (
                              <p className="ml-4 text-sm">
                                {episode.description}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => course._id && onApprove(course._id)}>
              Approve Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
