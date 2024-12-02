import { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';
import {
  approveRequest,
  fetchRequests,
} from '../../services/admin/instructorService';
import { IUser } from '../../interfaces/User';

export interface InstructorRequest {
  _id: string;
  userId: IUser;
  expertise: string[];
  qualifications: string[];
  additionalInfo: string[];
  isApproved: boolean | null;
  isRejected: boolean | null;
  rejectedReason?: string;
  createdAt: string;
}

const Instructor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('all');
  const [requests, setRequests] = useState<InstructorRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.userId?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.userId?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase() || '');

    const matchesExpertise =
      filterExpertise === 'all' || request.expertise?.includes(filterExpertise);

    return matchesSearch && matchesExpertise;
  });

  const expertiseAreas = Array.from(
    new Set(requests.flatMap((request) => request.expertise || []))
  );

  const handleApprove = async (id: string, userId: string | undefined) => {
    if (id && userId) {
      const response = await approveRequest(id, userId);
      const filteredList = response.data.filter(
        (req: InstructorRequest) => !req.isApproved && !req.isRejected
      );
      setRequests(filteredList || []);
    }
  };

  const handleReject = () => {};

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetchRequests();
        const filteredList = response.data.filter(
          (req: InstructorRequest) => !req.isApproved && !req.isRejected
        );
        setRequests(filteredList || []);
      } catch (error) {
        console.error('Failed to fetch instructor requests', error);
        setRequests([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequest();
  }, []);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Instructor Requests
        </h1>
        <p className="text-gray-600">Manage pending instructor applications</p>
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

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading requests...</p>
        </div>
      )}

      {/* No Requests State */}
      {!isLoading && requests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No instructor requests available
          </p>
        </div>
      )}

      {/* Requests Grid */}
      {!isLoading && requests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {request.userId?.firstName || 'Unknown'}{' '}
                      {request.userId?.lastName || ''}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {request.userId?.email || 'No email'}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {request.expertise?.map((skill) => (
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
                    {request.qualifications?.map((qual) => (
                      <li key={qual}>{qual}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Additional Info
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {request.additionalInfo?.map((info) => (
                      <li key={info}>{info}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    Request Date:{' '}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() =>
                      handleApprove(request._id, request.userId._id)
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white transition-colors"
                  >
                    <FaCheck size={16} />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 hover:bg-gray-200 text-black  transition-colors"
                  >
                    <FaTimes size={16} />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Instructor;
