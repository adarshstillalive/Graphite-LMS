import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToast } from '@/hooks/use-toast';
import ProfilePicture from '@/components/common/ProfilePicture';

import { useState } from 'react';
import ProfileDetails, {
  ProfileSchema,
} from '@/components/user/profile/ProfileDetails';
import {
  changeProfilePicture,
  updateProfileData,
} from '@/services/user/profileService';
import { setCurrentUser } from '@/redux/slices/user/userSlice';

const Profile = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleFileChange = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await changeProfilePicture(formData);
      if (!response.success) {
        throw new Error('Failed, Try again');
      }
      const userData = response.data;
      dispatch(setCurrentUser(userData));
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
      dispatch(setCurrentUser(response.data));
      if (response.success)
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
        {currentUser && (
          <ProfileDetails
            currentUser={currentUser}
            isEditing={isEditing}
            onEdit={() => setIsEditing(!isEditing)}
            onUpdate={handleUpdateProfile}
          />
        )}
        {currentUser && (
          <ProfilePicture
            name={currentUser?.firstName ? currentUser.firstName : ''}
            profilePicture={currentUser?.profilePicture}
            onProfilePictureChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
