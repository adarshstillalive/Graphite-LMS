import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Courses = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="rounded-none">
          <Link to="/instructor/createCourse"> Create Course</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>View courses</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Courses;
