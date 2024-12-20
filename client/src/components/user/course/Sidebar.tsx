import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ISubCategory } from '@/services/admin/courseService';

interface SidebarProps {
  subcategories: ISubCategory[];
  setQueryString: (queryString: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ subcategories, setQueryString }) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const languages = ['English', 'Malayalam', 'Hindi'];

  useEffect(() => {
    const queryParams: Record<string, string> = {};

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
    selectedSubcategories,
    selectedLevels,
    selectedLanguages,
    setQueryString,
  ]);

  return (
    <aside className="w-80 p-6 border-r">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="subcategory">
          <AccordionTrigger className="py-4 text-xl font-semibold">
            Subcategory
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {subcategories.map((scategory) => (
                <div
                  className="flex items-center space-x-2"
                  key={scategory._id}
                >
                  <Checkbox
                    id={scategory._id}
                    checked={selectedSubcategories.includes(
                      scategory._id || ''
                    )}
                    onCheckedChange={(checked) => {
                      const newSelected = checked
                        ? [...selectedSubcategories, scategory._id]
                        : selectedSubcategories.filter(
                            (id) => id !== scategory._id
                          );
                      setSelectedSubcategories(newSelected as string[]); // Ensure the array contains only strings
                    }}
                  />
                  <Label className="font-normal" htmlFor={scategory._id}>
                    {scategory.name}
                  </Label>
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

        <AccordionItem value="rating">
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
