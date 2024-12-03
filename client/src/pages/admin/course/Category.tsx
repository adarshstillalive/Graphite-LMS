import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';
import { ICategory } from '@/services/admin/courseService';
import EditCategory from './EditCategory';

const Category = () => {
  const [activeTab, setActiveTab] = useState('categoryList');
  const [editDisabled, setEditDisabled] = useState(true);
  const [editCategory, setEditCategory] = useState<ICategory>();
  const handleInterfaceChange = (value: string) => {
    setEditDisabled(true);
    setActiveTab(value);
  };

  const enableEditTab = (category: ICategory) => {
    setEditCategory(category);
    setEditDisabled(false);
    setActiveTab('editCategory');
  };

  const handleAfterEdit = () => {
    setEditDisabled(true);
    setActiveTab('categoryList');
  };

  return (
    <Tabs
      value={activeTab}
      className="w-3/4 pt-4 mx-auto"
      onValueChange={handleInterfaceChange}
    >
      <TabsList className="grid w-full grid-cols-3">
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
        <TabsTrigger
          disabled={editDisabled}
          className=" data-[state=active]:bg-black data-[state=active]:text-white "
          value="editCategory"
        >
          Edit category
        </TabsTrigger>
      </TabsList>
      <TabsContent value="categoryList">
        {activeTab === 'categoryList' && (
          <CategoryList enableEditTab={enableEditTab} />
        )}
      </TabsContent>
      <TabsContent value="addCategory">
        <AddCategory />
      </TabsContent>
      <TabsContent value="editCategory">
        {editCategory && (
          <EditCategory categoryData={editCategory} click={handleAfterEdit} />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default Category;
