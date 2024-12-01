import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { sendRequest } from '@/services/instructor/commonService';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface FormEntry {
  id: number;
  value: string;
}

interface FormData {
  expertise: FormEntry[];
  qualifications: FormEntry[];
  additionalInfo: FormEntry[];
}

const RequestForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    expertise: [],
    qualifications: [],
    additionalInfo: [],
  });
  const [currentInputs, setCurrentInputs] = useState({
    expertise: '',
    qualifications: '',
    additionalInfo: '',
  });

  const handleInputChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCurrentInputs((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleAddEntry = (field: keyof FormData) => () => {
    if (currentInputs[field].trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [
          ...prev[field],
          { id: Date.now(), value: currentInputs[field].trim() },
        ],
      }));
      setCurrentInputs((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleRemoveEntry = (field: keyof FormData, id: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((entry) => entry.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      expertise: formData.expertise.map((entry) => entry.value),
      qualifications: formData.qualifications.map((entry) => entry.value),
      additionalInfo: formData.additionalInfo.map((entry) => entry.value),
    };
    try {
      const response = await sendRequest(updatedFormData);
      if (response?.success) {
        toast({
          variant: 'default',
          description: 'Request submitted successfully',
        });
        setFormData({ expertise: [], qualifications: [], additionalInfo: [] });
        setCurrentInputs({
          expertise: '',
          qualifications: '',
          additionalInfo: '',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Problem is submission, Try again',
      });
    }
  };

  const isFormValid =
    formData.expertise.length > 0 &&
    formData.qualifications.length > 0 &&
    formData.additionalInfo.length > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <Toaster />
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Instructor Request Form</CardTitle>
          <CardDescription>
            Please fill out the form to request instructor status
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {(['expertise', 'qualifications', 'additionalInfo'] as const).map(
              (field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <div className="flex space-x-2">
                    {field === 'additionalInfo' ? (
                      <Textarea
                        id={field}
                        value={currentInputs[field]}
                        onChange={handleInputChange(field)}
                        placeholder={`Enter ${field}`}
                      />
                    ) : (
                      <Input
                        className="rounded-none"
                        id={field}
                        value={currentInputs[field]}
                        onChange={handleInputChange(field)}
                        placeholder={`Enter ${field}`}
                      />
                    )}
                    <Button
                      className="rounded-none"
                      type="button"
                      onClick={handleAddEntry(field)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="rounded-none"
              type="submit"
              disabled={!isFormValid}
            >
              Submit Request
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            Review your information before submitting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(['expertise', 'qualifications', 'additionalInfo'] as const).map(
            (field) => (
              <div key={field}>
                <h3 className="font-semibold mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </h3>
                <ScrollArea className="h-[100px] w-full border rounded-md p-4">
                  <ul className="space-y-2">
                    {formData[field].map((entry) => (
                      <li
                        key={entry.id}
                        className="flex justify-between items-center"
                      >
                        <span>{entry.value}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveEntry(field, entry.id)}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestForm;
