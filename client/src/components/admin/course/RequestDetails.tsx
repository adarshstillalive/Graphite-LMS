import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea'; // Assuming you have a Textarea component in your UI library
import { IPopulatedCourse } from '@/interfaces/Course';

interface CourseRequestDetailProps {
  course: IPopulatedCourse;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (courseId: string) => void;
  onReject: (courseId: string, reason: string) => void;
}

export const RequestDetails: React.FC<CourseRequestDetailProps> = ({
  course,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleReject = () => {
    if (course._id) {
      onReject(course._id, rejectionReason);
      setRejectionReason(''); // Clear the reason after rejection
      setRejectDialogOpen(false);
    }
  };

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
                  <Badge variant={course.isApproved ? 'default' : 'secondary'}>
                    {course.isApproved ? 'Approved' : 'Pending'}
                  </Badge>
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
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => course._id && onApprove(course._id)}>
              Approve Course
            </Button>
            <Button onClick={() => setRejectDialogOpen(true)}>
              Reject Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Reason Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setRejectDialogOpen}>
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
            <Button onClick={handleReject} disabled={!rejectionReason.trim()}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
