import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Marketing = () => {
  return (
    <div className="space-y-4">
      <FormField
        name="salesPitch"
        render={() => (
          <FormItem>
            <FormLabel>Sales Pitch</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter your course sales pitch"
                className="min-h-[200px]"
              />
            </FormControl>
            <FormDescription>
              Write a compelling sales pitch for your course. This will be
              displayed on the course sales page.
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        name="image"
        render={() => (
          <FormItem>
            <FormLabel>Course Image</FormLabel>
            <FormControl>
              <Input type="file" accept="image/*" />
            </FormControl>
            <FormDescription>
              Upload a visually appealing image to represent your course.
              Recommended size: 1280x720 pixels.
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        name="keywords"
        render={() => (
          <FormItem>
            <FormLabel>Keywords</FormLabel>
            <FormControl>
              <Input placeholder="Enter keywords separated by commas" />
            </FormControl>
            <FormDescription>
              Enter keywords that describe your course. These will help with
              search engine optimization.
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default Marketing;
