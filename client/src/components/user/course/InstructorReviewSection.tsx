import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { fetchInstructorReviews } from '@/services/user/courseService';
import { Button } from '@/components/ui/button';
import { IInstructorReviewPopulated } from '@/interfaces/InstructorReview';

const InstructorReviewSection = ({
  instructorId,
}: {
  instructorId: string;
}) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<IInstructorReviewPopulated[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadReviews = async () => {
    try {
      const response = await fetchInstructorReviews(instructorId, currentPage);
      const result = response.data;

      setReviews((prev) => {
        const existingIds = new Set(prev.map((r) => r._id));
        const filteredNewReviews = result.data.filter(
          (r: IInstructorReviewPopulated) => !existingIds.has(r._id)
        );
        return [...prev, ...filteredNewReviews];
      });
      setTotalPages(Math.ceil(result.total / 2));
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        variant: 'destructive',
        description: 'Loading failed, Refresh the page',
      });
    }
  };

  useEffect(() => {
    loadReviews();
  }, [currentPage]);

  return (
    <div className="border border-gray-200 rounded p-6 mt-8 mx-auto max-w-3xl">
      <h2 className="text-3xl mb-6 text-stone-800 border-b pb-2">Reviews</h2>

      <ScrollArea className="space-y-6 max-h-[400px] overflow-auto">
        {/* Other Users' Reviews */}
        {reviews.length > 0 ? (
          reviews.map((review: IInstructorReviewPopulated) => (
            <div
              key={review._id}
              className="p-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-stone-800">
                  {review.userId.firstName + ' ' + review.userId.lastName}
                </span>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-stone-300" />
                  ))}
                </div>
              </div>
              <p className="text-stone-600 mb-2">{review.review}</p>
              <span className="text-sm text-stone-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-stone-500 text-center">No reviews yet.</p>
        )}
      </ScrollArea>

      <div className="flex justify-center py-4">
        <Button
          variant={'outline'}
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default InstructorReviewSection;
