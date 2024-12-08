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

interface CurriculumProps {
  form: UseFormReturn<CourseFormValues>;
}

const Marketing = ({ form }: CurriculumProps) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Marketing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
