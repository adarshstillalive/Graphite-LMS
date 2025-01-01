import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { IReviewPopulated } from '@/interfaces/Review';
import { addReview, fetchReviewsWithUser } from '@/services/user/courseService';
import { Button } from '@/components/ui/button';

const ReviewSectionPurchased = ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<IReviewPopulated[]>([]);
  const [userReview, setUserReview] = useState<IReviewPopulated>();
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const loadReviews = async () => {
    try {
      const response = await fetchReviewsWithUser(
        userId,
        courseId,
        currentPage
      );
      const result = response.data;

      setReviews((prev) => [...prev, ...result.data]);
      setTotalPages(Math.ceil(result.total / 2));
      if (result.extra) {
        setUserReview(result.extra.userReview);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddReview = async () => {
    if (!currentRating || !reviewText.trim()) {
      toast({
        variant: 'destructive',
        description: 'Please provide both a rating and a review.',
      });
      return;
    }

    try {
      const newReview = {
        userId,
        courseId,
        rating: currentRating,
        review: reviewText.trim(),
      };
      await addReview(newReview);
      setReviewText('');
      setCurrentRating(0);
      setReviews([]);
      setCurrentPage(1);
      toast({
        variant: 'default',
        description: 'Review added successfully!',
      });
      loadReviews();
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to add review.',
      });
    }
  };

  const handleEditReview = () => {
    setIsEditing(true);
    setCurrentRating(userReview?.rating || 0);
    setReviewText(userReview?.review || '');
  };

  const handleUpdateReview = async () => {
    try {
      const updatedReview = {
        userId,
        courseId,
        rating: currentRating,
        review: reviewText.trim(),
      };
      await addReview(updatedReview);
      setIsEditing(false);
      setReviews([]);
      setCurrentPage(1);
      toast({
        variant: 'default',
        description: 'Review updated successfully!',
      });
      loadReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to update review.',
      });
    }
  };

  useEffect(() => {
    loadReviews();
  }, [currentPage]);

  return (
    <div className="border border-gray-200 rounded p-6 mt-8">
      <h2 className="text-3xl mb-6 text-stone-800 border-b pb-2">Reviews</h2>

      <ScrollArea className="space-y-6 max-h-[400px] overflow-auto">
        {userReview && !isEditing ? (
          <div className="p-4 border-b border-gray-200 last:border-b-0 bg-gray-100 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-stone-800">Your Review</span>
              <button
                onClick={handleEditReview}
                className="text-gray-600 hover:underline text-sm"
              >
                Edit
              </button>
            </div>
            <div className="flex mb-2">
              {[...Array(userReview?.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-amber-400 fill-amber-400"
                />
              ))}
              {[...Array(5 - userReview?.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-stone-300" />
              ))}
            </div>
            <p className="text-stone-600 mb-2">{userReview?.review}</p>
            <span className="text-sm text-stone-400">
              {new Date(userReview?.createdAt).toLocaleDateString()}
            </span>
          </div>
        ) : (
          <div className="mb-8">
            <label className="block mb-2 font-medium text-stone-700">
              {isEditing ? 'Update Your Review' : 'Your Rating'}
            </label>
            <div className="flex items-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  onClick={() => setCurrentRating(num)}
                  className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                    currentRating >= num
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <textarea
              placeholder="Share your thoughts about this course..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border border-stone-300 rounded-md mt-2 text-stone-700 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition duration-200 ease-in-out"
              rows={4}
            ></textarea>
            <div className="flex space-x-4 mt-4">
              <Button
                onClick={isEditing ? handleUpdateReview : handleAddReview}
                className=" rounded transition duration-200 ease-in-out font-medium"
              >
                {isEditing ? 'Save Changes' : 'Submit Review'}
              </Button>
              {isEditing && (
                <Button
                  variant={'outline'}
                  onClick={() => setIsEditing(false)}
                  className="rounded transition duration-200 ease-in-out font-medium"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Other Users' Reviews */}
        {reviews.length > 0 ? (
          reviews.map((review: IReviewPopulated) => (
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

export default ReviewSectionPurchased;
