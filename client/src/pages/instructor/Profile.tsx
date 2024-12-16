import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToast } from '@/hooks/use-toast';
import {
  changeProfilePicture,
  updateProfileData,
} from '@/services/instructor/profileService';
import { setCurrentInstructor } from '@/redux/slices/instructor/instructorSlice';
import ProfilePicture from '@/components/common/ProfilePicture';
import ProfileDetails, {
  ProfileSchema,
} from '@/components/instructor/profile/ProfileDetails';
import { useState } from 'react';

const Profile = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
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
    }
  };

  const handleUpdateProfile = async (formData: ProfileSchema) => {
    try {
      const response = await updateProfileData(formData);
      const instructorData = response.data;
      dispatch(setCurrentInstructor(instructorData));
      toast({
        variant: 'default',
        description: 'Profile updated',
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Failed! Try again',
      });
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
        {currentInstructor && (
          <ProfileDetails
            instructorData={currentInstructor}
            isEditing={isEditing}
            onEdit={() => setIsEditing(!isEditing)}
            onUpdate={handleUpdateProfile}
          />
        )}
        {currentUser && currentInstructor && (
          <ProfilePicture
            name={currentUser?.firstName ? currentUser.firstName : ''}
            profilePicture={currentInstructor?.profilePicture}
            onProfilePictureChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
