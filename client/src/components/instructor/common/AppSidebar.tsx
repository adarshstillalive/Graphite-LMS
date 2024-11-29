import { RootState } from '@/redux/store';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Calendar, Home, Inbox, Search, Settings, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const items = [
  {
    title: 'Home',
    url: '/instructor',
    icon: Home,
  },
  {
    title: 'Profile',
    url: '/instructor/profile',
    icon: User,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <Sidebar className="fixed left-0 top-16 bottom-0">
      <SidebarContent className="bg-gray-200">
        <SidebarGroup>
          <SidebarGroupLabel>
            {currentUser?.firstName?.toUpperCase() +
              ' ' +
              currentUser?.lastName?.toUpperCase()}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="h-12" key={item.title}>
                  <SidebarMenuButton
                    className="h-12 font-bold text-gray-800 hover:bg-gray-300"
                    asChild
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarSeparator className="bg-gray-300 " />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
