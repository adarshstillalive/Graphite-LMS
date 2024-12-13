import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileSidebarProps {
  name: string;
  profilePicture: string;

  onProfilePictureChange: (file: File) => void;
}

const ProfilePicture: React.FC<ProfileSidebarProps> = ({
  name,
  profilePicture,
  onProfilePictureChange,
}) => {
  const { toast } = useToast();
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpeg'];
    const file = e.target.files?.[0];
    if (!file || !validImageTypes.includes(file.type)) {
      toast({
        variant: 'destructive',
        description: 'Please select a valid image file (JPEG, PNG or JPG).',
      });
      return;
    }
    onProfilePictureChange(file);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-64 h-64 border-gray-800 border-8">
          <AvatarImage src={profilePicture} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <label
          htmlFor="profile-picture"
          className="absolute bottom-4 right-4 bg-gray-800 text-white hover:bg-gray-700 rounded-full p-2 cursor-pointer"
        >
          <Pen className="text-xl" />
          <input
            id="profile-picture"
            type="file"
            accept="'image/jpeg', 'image/png', 'image/jpeg'"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfilePicture;
