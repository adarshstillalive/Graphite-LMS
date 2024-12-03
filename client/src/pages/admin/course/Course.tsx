import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import CourseList from './CourseList';
import Category from './Category';

const Course = () => {
  const [activeTab, setActiveTab] = useState('courseList');

  const handleInterfaceChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <Tabs
      defaultValue="courseList"
      className="w-full"
      onValueChange={handleInterfaceChange}
    >
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="courseList">Courses</TabsTrigger>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="language">Language</TabsTrigger>
        <TabsTrigger value="level">Level</TabsTrigger>
        <TabsTrigger value="currency">Currency</TabsTrigger>
      </TabsList>
      <TabsContent value="courseList">
        {activeTab === 'courseList' && <CourseList />}
      </TabsContent>
      <TabsContent value="category">
        {activeTab === 'category' && <Category />}
      </TabsContent>
      <TabsContent value="language"></TabsContent>
      <TabsContent value="level"></TabsContent>
      <TabsContent value="currency"></TabsContent>
    </Tabs>
  );
};

export default Course;
