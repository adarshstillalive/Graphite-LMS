import { User, Mail, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToast } from '@/hooks/use-toast';
import { changeProfilePicture } from '@/services/instructor/profileService';
import { setCurrentInstructor } from '@/redux/slices/instructor/instructorSlice';
import ProfilePicture from '@/components/common/ProfilePicture';
import ProfileDetails from '@/components/instructor/profile/ProfileDetails';

const Profile = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const { currentInstructor } = useSelector(
    (state: RootState) => state.instructor
  );

  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleFileChange = async (file: File) => {
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
    <div className="flex flex-col gap-6">
      <div className="">
        {currentUser && currentInstructor && (
          <ProfilePicture
            name={currentUser?.firstName ? currentUser.firstName : ''}
            profilePicture={currentInstructor?.profilePicture}
            onProfilePictureChange={handleFileChange}
          />
        )}
      </div>
      <div className="lg:w-3/4">
        <ProfileDetails
          instructorData={currentInstructor}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onUpdate={handleUpdateProfile}
        />
      </div>
    </div>
  );
};

export default Profile;
