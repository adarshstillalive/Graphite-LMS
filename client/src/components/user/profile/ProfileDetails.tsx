import React from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { inputStyle } from '@/interfaces/zodCourseFormSchema';
import { IUser } from '@/interfaces/User';

// Zod Schema
const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
});

// TypeScript types
export type ProfileSchema = z.infer<typeof profileSchema>;

type ProfileDetailsProps = {
  currentUser: IUser;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (data: ProfileSchema) => void;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  currentUser,
  isEditing,
  onEdit,
  onUpdate,
}) => {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: currentUser!,
  });

  const onSubmit: SubmitHandler<ProfileSchema> = (data) => {
    onUpdate(data);
  };

  if (!isEditing) {
    return (
      <div className="space-y-6 w-full lg:w-2/3">
        <div>
          <h1 className="text-3xl font-bold">
            {currentUser.firstName + ' ' + currentUser.lastName}
          </h1>
          <p className="text-gray-600">{currentUser.email}</p>
        </div>

        <div className="mt-6">
          <Button onClick={onEdit}>Edit Profile</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full lg:w-2/3">
      <div>
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className={inputStyle} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className={inputStyle} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputStyle} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" onClick={onEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileDetails;
