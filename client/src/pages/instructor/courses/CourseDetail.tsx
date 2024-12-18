import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import VideoPlayer from '@/components/common/course/VideoPlayer';
import { IChapter, IEpisode, IPopulatedCourse } from '@/interfaces/Course';
import ChapterEpisodeSelector from '@/components/common/course/ChapterEpisodeDropdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TextContent from '@/components/common/course/TextContent';
import BreadCrumbs from '@/components/common/BreadCrumbs';
import { useToast } from '@/hooks/use-toast';
import {
  deleteCourse,
  fetchCourseApi,
  publishAction,
} from '@/services/instructor/courseService';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<IPopulatedCourse>();
  const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.chapters && course.chapters.length > 0) {
      setSelectedChapter(course.chapters[0]);
      setSelectedEpisode(course.chapters[0].episodes[0]);
    }
  }, [course]);

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

  const handlePublish = async (id: string) => {
    if (!course || !course.chapters) return;
    let videoUploadIncomplete = false;

    for (const chapter of course?.chapters || []) {
      for (const episode of chapter.episodes) {
        if (episode.type === 'video' && !episode.content) {
          videoUploadIncomplete = true;
          break;
        }
      }
      if (videoUploadIncomplete) {
        break;
      }
    }

    if (videoUploadIncomplete) {
      toast({
        variant: 'destructive',
        description: 'Video upload is not complete',
      });
      return;
    }
    try {
      const response = await publishAction(id);
      const updatedCourse = response.data;
      setCourse(updatedCourse);
      toast({
        variant: 'default',
        description: course?.isPublished
          ? 'Course unpublished'
          : 'Course published',
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Action failed, Try again.',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id);
      toast({
        variant: 'default',
        description: 'Course deleted',
      });
      navigate('/instructor/courses');
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Action failed, Try again.',
      });
    }
  };
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) return;
        const response = await fetchCourseApi(id);
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
  }, [id, toast]);

  if (!course) {
    return <div>Loading course details...</div>;
  }

  return (
    <>
      <BreadCrumbs />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className=" mb-4">
              <div className="">
                {selectedEpisode?.type === 'video' ? (
                  <VideoPlayer
                    content={
                      typeof selectedEpisode.content === 'string'
                        ? selectedEpisode.content
                        : ''
                    }
                  />
                ) : (
                  selectedEpisode && <TextContent episode={selectedEpisode} />
                )}
              </div>
            </div>
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
            </header>

            <div className="flex flex-col md:flex-row gap-8">
              <main className="md:w-2/3">
                <div className="flex items-start gap-8">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className=" object-contain rounded-sm mb-8"
                  />
                  <aside className="">
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
                  <h2 className="text-2xl font-bold mb-4">
                    Course Description
                  </h2>
                  <p className="text-gray-700">{course.description}</p>
                </section>
              </main>
            </div>
          </div>
          <div>
            <div className="bg-white border-4 border-gray-800">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Chapters</h2>
                <ScrollArea className="pb-16">
                  <ChapterEpisodeSelector
                    chapters={course.chapters || []}
                    onSelect={handleEpisodeSelect}
                    selectedChapterId={selectedChapter?.id}
                    selectedEpisodeId={selectedEpisode?.id}
                  />
                </ScrollArea>
              </div>
            </div>
            <div className="flex flex-col my-2 gap-2">
              <Button
                disabled={!course.isApproved}
                className="h-14 border-2 border-black text-lg"
                variant={'outline'}
                onClick={() => course._id && handlePublish(course._id)}
              >
                {course.isPublished ? 'Unpublish' : 'Publish'}
              </Button>
              <Button
                className="h-14 border-2 border-gray-800 text-lg"
                variant={'outline'}
                asChild
              >
                <Link to={`/instructor/courses/edit/${course._id}`}>Edit</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-14 border-2 border-black text-lg">
                    Delete course
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will delete your
                      course.
                    </DialogDescription>
                    <div className="flex justify-end space-x-4 mt-4">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={() => course._id && handleDelete(course._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
