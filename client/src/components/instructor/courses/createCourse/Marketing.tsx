import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Marketing = ({ form }) => {
  const { register } = form;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="courseImage">Course Image</Label>
          <Input id="courseImage" type="file" {...register('courseImage')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="promoVideo">Promotional Video</Label>
          <Input id="promoVideo" type="file" {...register('promoVideo')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="welcomeMessage">Welcome Message</Label>
          <Textarea
            id="welcomeMessage"
            {...register('welcomeMessage')}
            placeholder="Enter welcome message for students"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="congratsMessage">Congratulations Message</Label>
          <Textarea
            id="congratsMessage"
            {...register('congratsMessage')}
            placeholder="Enter congratulations message for course completion"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Marketing;
