import BasicInfo from '@/components/instructor/courses/createCourse/BasicInfo';
import CourseDetails from '@/components/instructor/courses/createCourse/CourseDetails';
import Curriculum from '@/components/instructor/courses/createCourse/Curriculum';
import Marketing from '@/components/instructor/courses/createCourse/Marketing';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const CreateCourse = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/instructor/courses"> Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create course</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="basicInfo" className="">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basicInfo">Basic Info</TabsTrigger>
          <TabsTrigger value="courseDetails">Course Details</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>
        <TabsContent value="basicInfo">
          <BasicInfo />
        </TabsContent>
        <TabsContent value="courseDetails">
          <CourseDetails />
        </TabsContent>
        <TabsContent value="curriculum">
          <Curriculum />
        </TabsContent>
        <TabsContent value="marketing">
          <Marketing />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateCourse;
