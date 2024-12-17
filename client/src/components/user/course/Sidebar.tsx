import React from 'react';
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
}

const level = ['Beginner', 'Intermediate', 'Advanced'];
const language = ['English', 'Malayalam', 'Hindi'];

const Sidebar: React.FC<SidebarProps> = ({ subcategories }) => {
  console.log(subcategories);

  return (
    <aside className="w-80 p-6 border-r">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="topic">
          <AccordionTrigger className="py-4 text-xl font-semibold">
            Subcategory
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {subcategories.length > 0 &&
                subcategories.map((scategory: ISubCategory) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox className="rounded-full" id={scategory._id} />
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
              {level.map((l: string) => (
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" id={l} />
                  <Label className="font-normal" htmlFor={l}>
                    {l}
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
              {language.map((l: string) => (
                <div className="flex items-center space-x-2">
                  <Checkbox className="rounded-full" id={l} />
                  <Label className="font-normal" htmlFor={l}>
                    {l}
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
