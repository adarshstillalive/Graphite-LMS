import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
// import { IPopulatedCourse } from '@/interfaces/Course';
import RequestsPending from './RequestsPending';
import RejectedRequests from './RejectedRequests';

const Request = () => {
  const [activeTab, setActiveTab] = useState('requestsPending');
  // const [editDisabled, setEditDisabled] = useState(true);
  // const [editRequest, setEditRequest] = useState<IPopulatedCourse>();

  const handleInterfaceChange = (value: string) => {
    // setEditDisabled(true);
    setActiveTab(value);
  };

  // const enableEditTab = (course: IPopulatedCourse) => {
  //   setEditRequest(course);
  //   setEditDisabled(false);
  //   setActiveTab('editCategory');
  // };

  // const handleAfterEdit = () => {
  //   setEditDisabled(true);
  //   setActiveTab('categoryList');
  // };

  return (
    <Tabs
      value={activeTab}
      className="w-full pt-4 mx-auto"
      onValueChange={handleInterfaceChange}
    >
      <TabsList className="grid grid-cols-2 w-3/4 mx-auto">
        <TabsTrigger
          className=" data-[state=active]:bg-black data-[state=active]:text-white "
          value="requestsPending"
        >
          Requests Pending
        </TabsTrigger>
        <TabsTrigger
          className=" data-[state=active]:bg-black data-[state=active]:text-white "
          value="rejectedRequests"
        >
          Rejected Requests
        </TabsTrigger>
      </TabsList>
      <TabsContent value="requestsPending">
        {activeTab === 'requestsPending' && <RequestsPending />}
      </TabsContent>
      <TabsContent value="rejectedRequests">
        {activeTab === 'rejectedRequests' && <RejectedRequests />}
      </TabsContent>
    </Tabs>
  );
};

export default Request;
