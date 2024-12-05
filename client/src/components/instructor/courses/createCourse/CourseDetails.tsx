import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const CourseDetails = () => {
  return (
    <div className="space-y-4">
      <FormField
        name="description"
        render={() => (
          <FormItem>
            <FormLabel>Course Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter course description"
                className="min-h-[200px]"
              />
            </FormControl>
            <FormDescription>
              Provide a detailed description of the course, outlining the
              learning objectives, target audience, and what learners will gain.
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        name="price"
        render={() => (
          <FormItem>
            <FormLabel>Course Price</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter course price" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="currency"
        render={() => (
          <FormItem>
            <FormLabel>Currency</FormLabel>
            <Select>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseDetails;
