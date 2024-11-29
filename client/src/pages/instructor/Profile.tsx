import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaPen } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="container w-full mx-auto p-6">
      {/* First Horizontal Div */}
      <div className="flex flex-col md:flex-row justify-between">
        {/* Left Vertical Div */}
        <div className="flex-1 bg-white shadow p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-gray-400"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-gray-400"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-gray-400"
                placeholder="Enter contact number"
              />
            </div>
          </form>
        </div>

        {/* Right Vertical Div */}
        <div className="w-full md:w-1/3 bg-white shadow p-6 rounded-md">
          <div className="mb-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <button className="absolute right-0 bottom-0 bg-gray-800 text-gray-200 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 z-10">
                  <FaPen className="text-sm" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <input
                  type="url"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-gray-400"
                  placeholder="Enter LinkedIn URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Twitter
                </label>
                <input
                  type="url"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-gray-400"
                  placeholder="Enter Twitter URL"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Second Horizontal Div */}
      <div className="mt-6 bg-white shadow p-6 rounded-md">
        <h2 className="text-xl font-semibold">Future Section</h2>
        <p className="text-sm text-gray-500">
          This section is reserved for future use.
        </p>
      </div>
    </div>
  );
};

export default Profile;
