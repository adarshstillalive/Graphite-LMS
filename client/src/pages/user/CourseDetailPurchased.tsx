import BreadCrumbs from '@/components/common/BreadCrumbs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChapterEpisodeSelector from '@/components/user/course/ChapterEpisodeDropdown';
import TextContent from '@/components/user/course/TextContent';
import VideoPlayer from '@/components/user/course/VideoPlayer';
import { useToast } from '@/hooks/use-toast';
import { IChapter, IEpisode, IPopulatedCourse } from '@/interfaces/Course';
import { RootState } from '@/redux/store';
import { fetchCommonCourse } from '@/services/user/courseService';
import { updateCourseProgress } from '@/services/user/profileService';
import { Clock, FileText, PlayCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface CourseDetailPurchasedProps {
  id: string;
}

const CourseDetailPurchased: React.FC<CourseDetailPurchasedProps> = ({
  id,
}) => {
  const { toast } = useToast();
  const [course, setCourse] = useState<IPopulatedCourse>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const [progressData, setProgressData] = useState(0);
  console.log(progressData);

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

  if (!course) {
    return <div>Loading course details...</div>;
  }

  const updateProgress = async (progress: number) => {
    try {
      if (course._id && selectedChapter && selectedEpisode) {
        const response = await updateCourseProgress(
          course._id,
          selectedChapter._id,
          selectedEpisode._id,
          progress
        );
        const totalPro = calculateTotalProgress(response.data.chapters);

        setProgressData(totalPro);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function calculateTotalProgress(chapters) {
    let totalEpisodes = 0;
    let percentage = 0;

    chapters.forEach((chapter) => {
      chapter.episodes.forEach((episode) => {
        totalEpisodes++;
        percentage += episode.progress;
      });
    });

    return totalEpisodes > 0
      ? Math.round((percentage * totalEpisodes) / 100)
      : 0;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <BreadCrumbs />
      <div className="container mx-auto p-4">
        <Progress style={{ width: `${progressData}%` }} className="bg-black" />
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
                  updateProgress={updateProgress}
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
                    <PlayCircle className="mr-1 h-4 w-4" />
                  ) : (
                    <FileText className="mr-1 h-4 w-4" />
                  )}
                  <span>Type: {selectedEpisode.type}</span>
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
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                <p className="text-gray-700">{course.description}</p>
              </section>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Course Content</h2>
            </div>
            <ScrollArea className="h-[600px]">
              <ChapterEpisodeSelector
                chapters={course.chapters || []}
                onSelect={handleEpisodeSelect}
                selectedChapterId={selectedChapter?.id}
                selectedEpisodeId={selectedEpisode?.id}
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPurchased;
