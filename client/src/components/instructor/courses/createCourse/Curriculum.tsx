import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';

const Curriculum = () => {
  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="section-1">
          <AccordionTrigger>Section 1: Introduction</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <FormField
                name="section-title"
                render={() => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter section title" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="space-y-4 border p-4 rounded-md">
                <FormField
                  name="item-title"
                  render={() => (
                    <FormItem>
                      <FormLabel>Item Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter item title" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="item-type"
                  render={() => (
                    <FormItem>
                      <FormLabel>Item Type</FormLabel>
                      <Select>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select item type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  name="item-content"
                  render={() => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter content or URL" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="button" variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Item
                </Button>
              </div>
              <Button type="button" variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button type="button" variant="outline">
        <Plus className="w-4 h-4 mr-2" />
        Add Section
      </Button>
    </div>
  );
};

export default Curriculum;
