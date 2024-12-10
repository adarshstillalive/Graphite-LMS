import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import CourseList from './CourseList';
import Category from './Category';
import Requests from './Request';
import { IPopulatedCourse } from '@/interfaces/Course';

const Course = () => {
  const [activeTab, setActiveTab] = useState('courseList');

  const handleInterfaceChange = (value: string) => {
    setActiveTab(value);
  };
  const enableEditTab = (course: IPopulatedCourse) => {
    console.log(course);

    // setEditCategory(course);
    // setEditDisabled(false);
    // setActiveTab('editCategory');
  };
  return (
    <Tabs
      defaultValue="courseList"
      className="w-full"
      onValueChange={handleInterfaceChange}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="courseList">Courses</TabsTrigger>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="request">Requests</TabsTrigger>
      </TabsList>
      <TabsContent value="courseList">
        {activeTab === 'courseList' && (
          <CourseList enableEditTab={enableEditTab} />
        )}
      </TabsContent>
      <TabsContent value="category">
        {activeTab === 'category' && <Category />}
      </TabsContent>
      <TabsContent value="request">
        {activeTab === 'request' && <Requests />}
      </TabsContent>
    </Tabs>
  );
};

export default Course;
