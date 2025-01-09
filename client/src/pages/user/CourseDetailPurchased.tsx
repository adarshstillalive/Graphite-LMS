import BreadCrumbs from '@/components/common/BreadCrumbs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChapterEpisodeSelector from '@/components/user/course/ChapterEpisodeDropdown';
import ReviewSectionPurchased from '@/components/user/course/ReviewSectionPurchased';
import TextContent from '@/components/user/course/TextContent';
import VideoPlayer from '@/components/user/course/VideoPlayer';
import { useToast } from '@/hooks/use-toast';
import { IChapter, IEpisode, IPopulatedCourse } from '@/interfaces/Course';
import { ICourseProgress } from '@/interfaces/Progress';
import { RootState } from '@/redux/store';
import { fetchCommonCourse } from '@/services/user/courseService';
import {
  fetchProgressApi,
  updateCourseProgress,
} from '@/services/user/profileService';
import { Clock, FileText, PlayCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface CourseDetailPurchasedProps {
  id: string;
}

const CourseDetailPurchased: React.FC<CourseDetailPurchasedProps> = ({
  id,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<IPopulatedCourse>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState<ICourseProgress>();

  const handleEpisodeSelect = (chapterId: string, episodeId: string) => {
    const chapter =
      course?.chapters?.find((c: IChapter) => c.id === chapterId) || null;
    setSelectedChapter(chapter);
    if (chapter) {
      const episode =
        chapter.episodes.find((e: IEpisode) => e.id === episodeId) || null;
      setSelectedEpisode(episode);
    }
  };

  const getEpisodeProgress = (episodeId: string | undefined) => {
    if (!progress || !selectedChapter || !episodeId) return 0;

    const chapterProgress = progress.chapters.find(
      (chapter) => chapter.chapterId === selectedChapter._id
    );
    const episodeProgress = chapterProgress?.episodes.find(
      (episode) => episode.episodeId === episodeId
    );

    return episodeProgress?.progress || 0;
  };

  useEffect(() => {
    if (course?.chapters && course.chapters.length > 0) {
      setSelectedChapter(course.chapters[0]);
      setSelectedEpisode(course.chapters[0].episodes[0]);
    }
  }, [course]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) return;
        const response = await fetchCommonCourse(id, currentUser?._id);

        setCourse(response.data);
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Fetching course data failed',
        });
      }
    };
    fetchCourse();
  }, [id, currentUser?._id, toast]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        if (
          !course?._id ||
          !currentUser?.purchasedCourses?.some((c) => c._id === course._id)
        )
          return;
        const response = await fetchProgressApi(course?._id);

        setProgress(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProgress();
  }, [course?._id]);

  useEffect(() => {
    if (selectedEpisode?._id) {
      const currentProgress = getEpisodeProgress(selectedEpisode._id);

      setIsCompleted(currentProgress === 100);
    }
  }, [selectedEpisode, progress]);

  if (!course) {
    return <div>Loading course details...</div>;
  }

  const updateProgress = async (progress: number = 100) => {
    try {
      if (course._id && selectedChapter?._id && selectedEpisode?._id) {
        const response = await updateCourseProgress(
          course._id,
          selectedChapter._id,
          selectedEpisode._id,
          progress
        );
        setProgress(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <BreadCrumbs />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-6">
              {selectedEpisode?.type === 'video' ? (
                <VideoPlayer
                  content={
                    typeof selectedEpisode.content === 'string'
                      ? selectedEpisode.content
                      : ''
                  }
                  onEnd={updateProgress}
                />
              ) : (
                selectedEpisode && <TextContent episode={selectedEpisode} />
              )}
            </div>
            {selectedEpisode && (
              <div className="bg-white p-6 rounded-md shadow-sm mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedEpisode.title}
                </h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="mr-4">Duration: N/A</span>
                  {selectedEpisode.type === 'video' ? (
                    <>
                      <PlayCircle className="mr-1 h-4 w-4" />
                      <span>Type: {selectedEpisode.type}</span>
                    </>
                  ) : (
                    <>
                      <FileText className="mr-1 h-4 w-4" />
                      <span>Type: {selectedEpisode.type}</span>
                      <Checkbox
                        id="progress"
                        className="rounded-full ml-4"
                        checked={isCompleted}
                        onCheckedChange={(checked) => {
                          if (checked === 'indeterminate') return;
                          setIsCompleted(checked);
                          updateProgress(checked ? 100 : 0); // Update server progress
                        }}
                      />
                      <Label htmlFor="progress" className="ml-1">
                        Mark as completed
                      </Label>
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="bg-white rounded-md shadow-sm p-6">
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{course.subtitle}</p>
              <div className="text-gray-600 mb-4">
                {course.category.name} -{' '}
                {course.category.subCategory.find(
                  (sub) => sub._id === course.subcategory
                )?.name || 'Not found'}
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="rounded-md w-full object-cover"
                />
                <div className="bg-gray-50 p-6 rounded-md">
                  <h2 className="text-2xl font-bold mb-4">Course Info</h2>
                  <ul className="space-y-2">
                    <li>
                      <strong>Level:</strong> {course.level}
                    </li>
                    <li>
                      <strong>Language:</strong> {course.language}
                    </li>
                  </ul>
                </div>
              </div>

              {/* New Instructor Section */}
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Instructor Profile</h2>
                <div
                  className="flex items-center bg-gray-50 p-6 rounded-md cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/courses/courseDetail/instructorProfile/${course.instructorId._id}`
                    )
                  }
                >
                  <img
                    src={course.instructorId.profilePicture}
                    alt={course.instructorId.firstName}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {course.instructorId.firstName +
                        ' ' +
                        course.instructorId.lastName}
                    </h3>
                    {/* <p className="text-gray-600 text-sm">
                      
                    </p> */}
                  </div>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                <p className="text-gray-700">{course.description}</p>
              </section>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Progress:</span>
                <div className="relative w-full h-4 overflow-hidden">
                  <Progress
                    value={progress?.totalProgress}
                    className="h-full bg-gray-500"
                  />
                </div>
                <span className="ml-2 text-sm font-medium">
                  {progress?.totalProgress !== undefined
                    ? progress?.totalProgress.toFixed(2) + '%'
                    : '0%'}
                </span>
              </div>
              <h2 className="text-xl font-semibold">Course Content</h2>
            </div>

            <ScrollArea className="h-[600px] p-2">
              <ChapterEpisodeSelector
                chapters={course?.chapters || []}
                onSelect={handleEpisodeSelect}
                selectedChapterId={selectedChapter?.id}
                selectedEpisodeId={selectedEpisode?.id}
              />
            </ScrollArea>
            {currentUser?._id && course._id && (
              <ReviewSectionPurchased
                userId={currentUser?._id}
                courseId={course._id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPurchased;
