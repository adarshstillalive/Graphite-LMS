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
import {
  Heart,
  Key,
  Library,
  Logs,
  MessageSquareText,
  ShoppingCart,
  User,
  Wallet,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const items = [
  {
    title: 'Profile',
    url: '/profile',
    icon: User,
  },
  {
    title: 'Courses',
    url: '/profile/courses',
    icon: Library,
  },
  {
    title: 'Orders',
    url: '/profile/orders',
    icon: Logs,
  },
  {
    title: 'Wishlist',
    url: '/profile/wishlist',
    icon: Heart,
  },
  {
    title: 'Cart',
    url: '/profile/cart',
    icon: ShoppingCart,
  },
  {
    title: 'Wallet',
    url: '/profile/wallet',
    icon: Wallet,
  },
  {
    title: 'Chat',
    url: '/profile/chat',
    icon: MessageSquareText,
  },
  {
    title: 'Change password',
    url: '/profile/changePassword',
    icon: Key,
  },
];

const AppSidebar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <Sidebar className="fixed left-0 top-16 bottom-0 ">
      <SidebarContent className="bg-gray-200 scrollbar-hide">
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
