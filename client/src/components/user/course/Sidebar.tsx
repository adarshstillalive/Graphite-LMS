import React, { useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ICategory } from '@/services/admin/courseService';

interface SidebarProps {
  categories: ICategory[];
  setQueryString: (queryString: string) => void;
  categoryId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  setQueryString,
  categoryId,
}) => {
  const [categorySubcategories, setCategorySubcategories] = useState<{
    [key: string]: string[];
  }>({});
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const languages = ['English', 'Malayalam', 'Hindi'];

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat._id === categoryId),
    [categories, categoryId]
  );

  useEffect(() => {
    if (categoryId && selectedCategory) {
      setCategorySubcategories((prev) => {
        const updated = { ...prev };
        updated[categoryId] = selectedCategory.subCategory.map(
          (sub) => sub._id!
        );
        return updated;
      });
    }
  }, [categoryId, selectedCategory]);

  useEffect(() => {
    const queryParams: Record<string, string> = {};

    const selectedSubcategories = Object.values(categorySubcategories).flat();
    if (selectedSubcategories.length > 0) {
      queryParams.subcategories = selectedSubcategories.join(',');
    }

    if (selectedLevels.length > 0) {
      queryParams.level = selectedLevels.join(',');
    }

    if (selectedLanguages.length > 0) {
      queryParams.language = selectedLanguages.join(',');
    }

    const queryString = new URLSearchParams(queryParams).toString();
    setQueryString(queryString);
  }, [
    categorySubcategories,
    selectedLevels,
    selectedLanguages,
    setQueryString,
  ]);

  const handleCategorySelection = (category: ICategory, isChecked: boolean) => {
    setCategorySubcategories((prev) => {
      const updated = { ...prev };
      if (isChecked) {
        updated[category._id!] = category.subCategory.map((sub) => sub._id!);
      } else {
        delete updated[category._id!];
      }
      return updated;
    });
  };

  const handleSubcategorySelection = (
    categoryId: string,
    subcategoryId: string,
    isChecked: boolean
  ) => {
    setCategorySubcategories((prev) => {
      const updated = { ...prev };
      if (isChecked) {
        updated[categoryId] = [...(updated[categoryId] || []), subcategoryId];
      } else {
        updated[categoryId] = (updated[categoryId] || []).filter(
          (id) => id !== subcategoryId
        );
      }
      return updated;
    });
  };

  return (
    <aside className="bg-white p-6">
      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="category">
          <AccordionTrigger className="text-lg font-semibold">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {categories.map((category) => (
                <div key={category._id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category._id}
                      checked={!!categorySubcategories[category._id!]}
                      onCheckedChange={(checked) =>
                        handleCategorySelection(category, checked as boolean)
                      }
                    />
                    <Label className="font-normal" htmlFor={category._id}>
                      {category.name}
                    </Label>
                  </div>

                  {category._id && category._id in categorySubcategories && (
                    <div className="ml-6 space-y-2">
                      {category.subCategory.map((subcategory) => (
                        <div
                          key={subcategory._id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={subcategory._id}
                            checked={categorySubcategories[
                              category._id!
                            ]?.includes(subcategory._id!)}
                            onCheckedChange={(checked) =>
                              handleSubcategorySelection(
                                category._id!,
                                subcategory._id!,
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            className="font-normal"
                            htmlFor={subcategory._id}
                          >
                            {subcategory.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level">
          <AccordionTrigger className="py-4 text-xl font-semibold">
            Level
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {levels.map((level) => (
                <div className="flex items-center space-x-2" key={level}>
                  <Checkbox
                    id={level}
                    checked={selectedLevels.includes(level)}
                    onCheckedChange={(checked) => {
                      const newSelected = checked
                        ? [...selectedLevels, level]
                        : selectedLevels.filter((lvl) => lvl !== level);
                      setSelectedLevels(newSelected);
                    }}
                  />
                  <Label className="font-normal" htmlFor={level}>
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="language">
          <AccordionTrigger className="py-4 text-xl font-semibold">
            Language
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {languages.map((language) => (
                <div className="flex items-center space-x-2" key={language}>
                  <Checkbox
                    id={language}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) => {
                      const newSelected = checked
                        ? [...selectedLanguages, language]
                        : selectedLanguages.filter((lang) => lang !== language);
                      setSelectedLanguages(newSelected);
                    }}
                  />
                  <Label className="font-normal" htmlFor={language}>
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default Sidebar;
