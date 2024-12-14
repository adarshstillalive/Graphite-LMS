import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CourseFormValues } from '@/pages/instructor/courses/CreateCourse';
import { UseFormReturn } from 'react-hook-form';
import ThumbnailDropZone from './ThumbnailDropZone';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { removeCourseThumbnail } from '@/services/instructor/courseService';

interface CurriculumProps {
  form: UseFormReturn<CourseFormValues>;
}

const Marketing = ({ form }: CurriculumProps) => {
  const { toast } = useToast();

  const removeThumbnail = async (imageUrl: string) => {
    try {
      await removeCourseThumbnail(imageUrl);
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Removal failed',
      });
    }
  };
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Marketing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail image</FormLabel>
              {!field.value ? (
                <ThumbnailDropZone
                  onImageUploadSuccess={(thumbnailUrl) => {
                    form.setValue('thumbnail', thumbnailUrl);
                  }}
                />
              ) : (
                <div className="relative w-full h-48 flex items-center gap-4 border-2 border-gray-300 rounded-lg p-2">
                  <img
                    src={field.value}
                    alt="Uploaded thumbnail"
                    className="object-contain h-full rounded-lg"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      removeThumbnail(field.value);
                      form.setValue('thumbnail', '');
                    }}
                    className="self-start"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="welcomeMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Welcome Message (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Welcome Message" {...field} />
              </FormControl>
              <FormDescription>
                Enter welcome message for students which is striking and
                interesting
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseCompletionMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Congratulations Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter congratulating Message"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter congratulations message for course completion
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default Marketing;
