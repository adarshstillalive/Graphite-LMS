import { useSelector } from 'react-redux';
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

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleFileChange = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await changeProfilePicture(formData);
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
      await updateProfileData(formData);

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
