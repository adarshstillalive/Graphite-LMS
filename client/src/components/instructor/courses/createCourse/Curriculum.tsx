import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { inputStyle } from '@/interfaces/zodCourseFormSchema';
import { CourseFormValues } from '@/pages/instructor/courses/CreateCourse';
import { Plus, Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  setDeleteChapter,
  setDeleteEpisode,
} from '@/redux/slices/instructor/courseCreationSlice';
import VideoDropzone from './VideoDropZone';

interface CurriculumProps {
  form: UseFormReturn<CourseFormValues>;
}

const Curriculum = ({ form }: CurriculumProps) => {
  const dispatch = useDispatch();
  const chapters = form.watch('chapters') || [];

  const addChapter = () => {
    try {
      const newChapters = [
        ...chapters,
        {
          id: nanoid(),
          title: '',
          description: '',
          episodes: [
            {
              id: nanoid(),
              title: '',
              type: 'video' as const,
              description: '',
              content: { video: false },
            },
          ],
        },
      ];

      form.setValue('chapters', newChapters);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error adding chapter:', error);
    }
  };

  const removeChapter = (chapterId: string) => {
    const updatedChapters = chapters.filter(
      (chapter) => chapter.id !== chapterId
    );

    try {
      form.setValue('chapters', updatedChapters);
      dispatch(setDeleteChapter(chapterId));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error removing chapter:', error);
    }
  };

  const addEpisode = (chapterIndex: number) => {
    const currentChapters = form.getValues('chapters');
    const currentChapter = currentChapters[chapterIndex];

    if (!currentChapter) {
      console.error('Chapter not found');
      return;
    }

    const updatedEpisodes = [
      ...currentChapter.episodes,
      {
        id: nanoid(),
        title: '',
        type: 'video' as const,
        description: '',
        content: { type: 'video' as const, video: false },
      },
    ];

    try {
      form.setValue(`chapters.${chapterIndex}.episodes`, updatedEpisodes);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error adding episode:', error);
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Curriculum</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="multiple">
          {/* <FormField
            control={form.control}
            name="chapters"
            render={() => (
              <FormItem> */}
          {chapters.map((chapter, chapterIndex: number) => (
            <AccordionItem key={chapter.id} value={`section-${chapterIndex}`}>
              <AccordionTrigger>
                Chapter {chapterIndex + 1}:{' '}
                {chapter.title || 'Untitled Section'}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`chapters.${chapterIndex}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <Input
                          {...field}
                          placeholder="Enter chapter title"
                          className={inputStyle}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`chapters.${chapterIndex}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <Textarea
                          {...field}
                          placeholder="Enter chapter description"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {chapter.episodes.map((episode, episodeIndex: number) => (
                    <div
                      key={episode.id}
                      className="border p-4 rounded-md space-y-4 bg-gray-50"
                    >
                      <FormField
                        control={form.control}
                        name={`chapters.${chapterIndex}.episodes.${episodeIndex}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Episode Title</FormLabel>
                            <Input
                              {...field}
                              placeholder="Enter episode title"
                              className={inputStyle}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`chapters.${chapterIndex}.episodes.${episodeIndex}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Episode description (Optional)
                            </FormLabel>
                            <Textarea
                              {...field}
                              placeholder="Enter episode description"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`chapters.${chapterIndex}.episodes.${episodeIndex}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Episode Type</FormLabel>
                            <Select
                              // onValueChange={field.onChange}
                              onValueChange={(value) => {
                                field.onChange(
                                  value == 'video'
                                    ? ('video' as const)
                                    : ('text' as const)
                                );
                                // Update the nested `content` field based on type
                                form.setValue(
                                  `chapters.${chapterIndex}.episodes.${episodeIndex}.content`,
                                  value == 'text'
                                    ? { content: '' } // Default for text
                                    : { video: false } // Default for video
                                );
                              }}
                              value={field.value}
                            >
                              <SelectTrigger className={inputStyle}>
                                <SelectValue placeholder="Select item type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="text">Text</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {form.watch(
                        `chapters.${chapterIndex}.episodes.${episodeIndex}.type`
                      ) === 'video' ? (
                        <FormField
                          control={form.control}
                          name={`chapters.${chapterIndex}.episodes.${episodeIndex}.content.video`}
                          render={({ field }) => {
                            const videoUrl = field.value;
                            return (
                              <FormItem>
                                {typeof videoUrl === 'string' &&
                                videoUrl.trim() !== '' ? (
                                  <div>
                                    <video width="320" height="240" controls>
                                      <source src={videoUrl} type="video/mp4" />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  </div>
                                ) : (
                                  <VideoDropzone
                                    chapterIndex={chapterIndex}
                                    episodeIndex={episodeIndex}
                                    chapterId={chapter.id}
                                    episodeId={episode.id}
                                    onVideoUploadSuccess={() => {
                                      form.setValue(
                                        `chapters.${chapterIndex}.episodes.${episodeIndex}.content.video`,
                                        true
                                      );
                                      form.clearErrors(
                                        `chapters.${chapterIndex}.episodes.${episodeIndex}.content.video`
                                      );
                                    }}
                                  />
                                )}

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      ) : (
                        <FormField
                          control={form.control}
                          name={`chapters.${chapterIndex}.episodes.${episodeIndex}.content.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Text Content</FormLabel>
                              <Textarea
                                {...field}
                                className="min-h-[200px]"
                                placeholder="Enter content here."
                              />

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={() => {
                          const updatedItems = chapter.episodes.filter(
                            (e) => e.id !== episode.id
                          );
                          form.setValue(
                            `chapters.${chapterIndex}.episodes`,
                            updatedItems
                          );
                          dispatch(setDeleteEpisode(episode.id));
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Episode
                      </Button>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addEpisode(chapterIndex)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Episode
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Delete chapter</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will delete your
                            chapter.
                          </DialogDescription>
                          <div className="flex justify-end space-x-4 mt-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              variant="default"
                              onClick={() => {
                                removeChapter(chapter.id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          {/* <FormMessage />
              </FormItem>
            )}
          /> */}
        </Accordion>
        <Button
          className="rounded-none"
          type="button"
          size="lg"
          variant="outline"
          onClick={addChapter}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Chapter
        </Button>
      </CardContent>
    </Card>
  );
};

export default Curriculum;
