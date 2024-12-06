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

interface CurriculumProps {
  form: UseFormReturn<CourseFormValues>;
}

const Curriculum = ({ form }: CurriculumProps) => {
  const chapters = form.watch('chapters') || [];

  const addChapter = () => {
    form.setValue('chapters', [
      ...chapters,
      { title: '', episodes: [{ title: '', type: 'video', content: '' }] },
    ]);
  };

  const removeChapter = (chapterIndex: number) => {
    const updatedChapters = chapters.filter(
      (_, index) => index !== chapterIndex
    );
    form.setValue('chapters', updatedChapters);
  };

  const addEpisode = (chapterIndex: number) => {
    const episodes = form.getValues(`chapters.${chapterIndex}.episodes`);
    form.setValue(`chapters.${chapterIndex}.episodes`, [
      ...episodes,
      { title: '', type: 'video', content: '' },
    ]);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Curriculum</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="multiple">
          {chapters.map((chapter, chapterIndex) => (
            <AccordionItem key={chapterIndex} value={`section-${chapterIndex}`}>
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
                        <FormLabel>Chapter Title</FormLabel>
                        <Input
                          {...field}
                          placeholder="Enter chapter title"
                          className={inputStyle}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {chapter.episodes.map((episode, episodeIndex) => (
                    <div
                      key={episodeIndex}
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
                              placeholder="Enter item title"
                              className={inputStyle}
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
                              onValueChange={field.onChange}
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
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={() => {
                          const updatedItems = chapter.episodes.filter(
                            (_, i) => i !== episodeIndex
                          );
                          form.setValue(
                            `chapters.${chapterIndex}.episodes`,
                            updatedItems
                          );
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
                                removeChapter(chapterIndex);
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
