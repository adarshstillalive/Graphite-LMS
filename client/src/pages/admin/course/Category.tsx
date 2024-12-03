import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';

const Category = () => {
  const [activeTab, setActiveTab] = useState('categoryList');

  const handleInterfaceChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <Tabs
      defaultValue="categoryList"
      className="w-3/4 pt-4 mx-auto"
      onValueChange={handleInterfaceChange}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          className=" data-[state=active]:bg-black data-[state=active]:text-white "
          value="categoryList"
        >
          Categories
        </TabsTrigger>
        <TabsTrigger
          className=" data-[state=active]:bg-black data-[state=active]:text-white "
          value="addCategory"
        >
          Add category
        </TabsTrigger>
      </TabsList>
      <TabsContent value="categoryList">
        {activeTab === 'categoryList' && <CategoryList />}
      </TabsContent>
      <TabsContent value="addCategory">
        <AddCategory />
      </TabsContent>
    </Tabs>
  );
};

export default Category;
