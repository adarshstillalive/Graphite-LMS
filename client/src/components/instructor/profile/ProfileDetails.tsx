import React from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IInstructorPopulated } from '@/interfaces/Instructor';

// Zod Schema
const profileSchema = z.object({
  userId: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
  }),
  bio: z.string().optional(),
  expertise: z.array(z.string().min(1, 'Expertise cannot be empty')).optional(),
  qualifications: z
    .array(z.string().min(1, 'Qualification cannot be empty'))
    .optional(),
  socialAccounts: z
    .array(
      z.object({
        provider: z.string().min(1, 'Provider name cannot be empty'),
        link: z.string().url('Invalid URL format'),
      })
    )
    .optional(),
});

// TypeScript types
export type ProfileSchema = z.infer<typeof profileSchema>;

type ProfileDetailsProps = {
  instructorData: IInstructorPopulated;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (data: ProfileSchema) => void;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  instructorData,
  isEditing,
  onEdit,
  onUpdate,
}) => {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: instructorData,
  });

  const addItem = (
    field: keyof Pick<
      ProfileSchema,
      'expertise' | 'qualifications' | 'socialAccounts'
    >
  ) => {
    const current = form.getValues(field) || [];
    const newItem =
      field === 'socialAccounts' ? { provider: '', link: '' } : '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.setValue(field, [...current, newItem] as any);
  };

  const removeItem = (
    field: keyof Pick<
      ProfileSchema,
      'expertise' | 'qualifications' | 'socialAccounts'
    >,
    index: number
  ) => {
    const current = form.getValues(field) || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.setValue(field, current.filter((_, i) => i !== index) as any);
  };

  const onSubmit: SubmitHandler<ProfileSchema> = (data) => {
    onUpdate(data);
  };

  if (!isEditing) {
    return (
      <Card className="w-full max-w-3xl mx-auto rounded-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {instructorData.userId.firstName +
              ' ' +
              instructorData.userId.lastName}
          </CardTitle>
          <p className="text-gray-600">{instructorData.userId.email}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="text-gray-700">{instructorData.bio || 'Empty'}</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-xl font-semibold mb-2">Expertise</h3>
            <ul className="list-disc list-inside text-gray-700">
              {instructorData.expertise?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <ul className="list-disc list-inside text-gray-700">
              {instructorData.qualifications?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="text-xl font-semibold mb-2">Social Links</h3>
            <ul className="space-y-2">
              {instructorData.socialAccounts?.map((account, index) => (
                <li key={index}>
                  <a
                    href={account.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <span className="font-medium mr-2">
                      {account.provider}:
                    </span>
                    {account.link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Button onClick={onEdit}>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="userId.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="userId.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Expertise Section */}
            <div>
              <FormLabel>Expertise</FormLabel>
              {form.watch('expertise')?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <FormField
                    control={form.control}
                    name={`expertise.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeItem('expertise', index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem('expertise')}
              >
                Add Expertise
              </Button>
            </div>

            {/* Qualifications Section */}
            <div>
              <FormLabel>Education</FormLabel>
              {form.watch('qualifications')?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <FormField
                    control={form.control}
                    name={`qualifications.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeItem('qualifications', index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem('qualifications')}
              >
                Add Education
              </Button>
            </div>

            {/* Social Links Section */}
            <div>
              <FormLabel>Social Links</FormLabel>
              {form.watch('socialAccounts')?.map((account, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <FormField
                    control={form.control}
                    name={`socialAccounts.${index}.provider`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input {...field} placeholder="Provider" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`socialAccounts.${index}.link`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input {...field} placeholder="Link" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeItem('socialAccounts', index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem('socialAccounts')}
              >
                Add Social Link
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" onClick={onEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;