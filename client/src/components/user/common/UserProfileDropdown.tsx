import { FaUserLarge } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { setLogout } from '@/redux/slices/user/userSlice';
import { setLogoutInstructor } from '@/redux/slices/instructor/instructorSlice';

const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogoutInstructor());
    dispatch(setLogout());
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full bg-gray-200 hover:bg-gray-300 p-5"
          variant="default"
        >
          <FaUserLarge className="text-xl text-gray-800" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-none">
        <DropdownMenuLabel className="text-lg">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-lg font-light cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg font-light cursor-pointer">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg font-light cursor-pointer">
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span className="text-lg font-light cursor-pointer">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
