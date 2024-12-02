import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InstructorRequests from './InstructorRequests';
import { useState } from 'react';
import InstructorList from './InstructorList';

const Instructor = () => {
  const [activeTab, setActiveTab] = useState('instructors');

  const handleInterfaceChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <>
      <Tabs
        defaultValue="instructors"
        className="w-full"
        onValueChange={handleInterfaceChange}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="instructors">
          {activeTab === 'instructors' && <InstructorList />}
        </TabsContent>
        <TabsContent value="requests">
          {activeTab === 'requests' && <InstructorRequests />}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Instructor;
