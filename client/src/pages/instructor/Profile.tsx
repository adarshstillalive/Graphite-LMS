import { User, Mail, Pencil, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { changeProfilePicture } from '@/services/instructor/profileService';
import { setCurrentInstructor } from '@/redux/slices/instructor/instructorSlice';
// import { useState } from 'react';

// interface SocialLink {
//   id: string;
//   platform: string;
//   url: string;
// }

// interface InstructorData {
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
//   bio: string;
//   avatarUrl: string;
//   socialLinks: SocialLink[];
// }

// // Mock data for the instructor
// const instructorData: InstructorData = {
//   name: 'Jane Doe',
//   email: 'jane.doe@example.com',
//   phone: '+1 (555) 123-4567',
//   location: 'New York, NY',
//   bio: 'Experienced instructor with a passion for teaching web development and computer science.',
//   avatarUrl: 'https://example.com/jane-doe-avatar.jpg',
//   socialLinks: [
//     { id: '1', platform: 'GitHub', url: 'https://github.com/janedoe' },
//     { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
//   ],
// };

const Profile = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const { currentInstructor } = useSelector(
    (state: RootState) => state.instructor
  );

  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // setIsLoading(true);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpeg'];
    const file = e.target.files?.[0];
    if (!file || !validImageTypes.includes(file.type)) {
      toast({
        variant: 'destructive',
        description: 'Please select a valid image file (JPEG, PNG or JPG).',
      });
      // setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await changeProfilePicture(formData);
      if (!response.success) {
        throw new Error('Failed, Try again');
      }
      const instructorData = response.data;
      dispatch(setCurrentInstructor(instructorData));
      toast({
        variant: 'default',
        description: 'Profile picture updated',
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Failed! Try again',
      });
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="p-6 flex-1 overflow-auto">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Instructor Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 rounded-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className="rounded-none"
                    id="name"
                    value={currentUser?.firstName + ' ' + currentUser?.lastName}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="rounded-none"
                    id="email"
                    value={currentUser?.email}
                    readOnly
                  />
                </div>
              </div>
              {/* <div className="flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={instructorData.location}
                    readOnly
                  />
                </div>
              </div> */}
              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] px-3 py-2 text-sm border rounded-sm"
                  value={''}
                  readOnly
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-sm">
            <CardContent className="pt-6">
              <div className="relative w-48 h-48 mx-auto">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={currentInstructor?.profilePicture}
                    alt={'Profile picture'}
                  />
                  <AvatarFallback>
                    {currentUser?.firstName + ' ' + currentUser?.lastName}
                  </AvatarFallback>
                </Avatar>
                <Button
                  onClick={() => document.getElementById('file-input')?.click()}
                  type="button"
                  size="icon"
                  className="absolute bottom-2 right-2 rounded-full"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <input
                  id="file-input"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 overflow-hidden">
                {/* {instructorData.socialLinks.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between"
                  >
                    <span>{link.platform}</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link.url}
                    </a>
                  </div>
                ))} */}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Social Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
