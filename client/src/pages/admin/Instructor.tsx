// Instructor.tsx
import { useState } from 'react';
import { FaCheck, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';

interface InstructorRequest {
  id: string;
  name: string;
  email: string;
  expertise: string[];
  experience: number;
  requestDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  qualifications: string[];
  profileImage: string;
}

const Instructor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('all');

  const [requests] = useState<InstructorRequest[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      expertise: ['React', 'JavaScript', 'Node.js'],
      experience: 5,
      requestDate: new Date('2024-01-15'),
      status: 'pending',
      qualifications: ['Masters in Computer Science', 'AWS Certified'],
      profileImage: '/api/placeholder/64/64',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      expertise: ['Python', 'Machine Learning', 'Data Science'],
      experience: 7,
      requestDate: new Date('2024-01-18'),
      status: 'pending',
      qualifications: ['PhD in Data Science', 'Google ML Expert'],
      profileImage: '/api/placeholder/64/64',
    },
  ]);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise =
      filterExpertise === 'all' || request.expertise.includes(filterExpertise);
    return matchesSearch && matchesExpertise;
  });

  const expertiseAreas = Array.from(
    new Set(requests.flatMap((request) => request.expertise))
  );

  const handleApprove = (id: string) => {
    console.log('Approved request:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejected request:', id);
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="lg:ml-64 xl:ml-80 w-full p-6 transition-all duration-300 ease-in-out">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Instructor Requests
          </h1>
          <p className="text-gray-600">
            Manage pending instructor applications
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              value={filterExpertise}
              onChange={(e) => setFilterExpertise(e.target.value)}
            >
              <option value="all">All Expertise</option>
              {expertiseAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={request.profileImage}
                    alt={request.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {request.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{request.email}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {request.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Qualifications
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {request.qualifications.map((qual) => (
                      <li key={qual}>{qual}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Additional Info
                  </h4>
                  <div className="text-sm text-gray-600">
                    <p>Experience: {request.experience} years</p>
                    <p>Request Date:</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <FaCheck size={16} />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <FaTimes size={16} />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No pending requests found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructor;
