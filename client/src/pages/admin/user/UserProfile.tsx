import { useLocation } from 'react-router-dom';
import BreadCrumbs from '@/components/common/BreadCrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserProfile = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col gap-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          <div className="space-y-6 w-full lg:w-2/3">
            <div>
              <h1 className="text-3xl font-bold">
                {user.firstName + ' ' + user.lastName}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-64 h-64 border-gray-800 border-8">
                <AvatarImage src={user.profilePicture} alt={user.firstName} />
                <AvatarFallback>{user.firstName[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
