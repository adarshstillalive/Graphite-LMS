import React from 'react';

export interface RequestDetailsProps {
  expertise: string[];
  qualifications: string[];
  additionalInfo: string[];
  isApproved: boolean | null;
  isRejected: boolean | null;
  rejectedReason?: string;
  createdAt: string;
}

const RequestDetails: React.FC<RequestDetailsProps> = ({
  expertise,
  qualifications,
  additionalInfo,
  isApproved,
  isRejected,
  rejectedReason,
  createdAt,
}) => {
  return (
    <div className="h-screen ">
      <div className="max-w-xl mx-auto p-4 bg-gray-100 rounded shadow-md">
        <h1 className="text-xl font-bold mb-3 text-gray-800">
          Request Details
        </h1>
        <div className="space-y-3">
          <div>
            <h2 className="font-semibold text-gray-700">Expertise</h2>
            {expertise.length > 0 ? (
              <ul className="list-disc pl-4 text-sm text-gray-600">
                {expertise.slice(0, 2).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                {expertise.length > 2 && (
                  <li className="text-gray-500">
                    +{expertise.length - 2} more
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-gray-500 italic text-sm">No expertise</p>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Qualifications</h2>
            {qualifications.length > 0 ? (
              <ul className="list-disc pl-4 text-sm text-gray-600">
                {qualifications.slice(0, 2).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                {qualifications.length > 2 && (
                  <li className="text-gray-500">
                    +{qualifications.length - 2} more
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-gray-500 italic text-sm">No Qualifications</p>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Additional info</h2>
            {additionalInfo.length > 0 ? (
              <ul className="list-disc pl-4 text-sm text-gray-600">
                {additionalInfo.slice(0, 2).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                {additionalInfo.length > 2 && (
                  <li className="text-gray-500">
                    +{additionalInfo.length - 2} more
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-gray-500 italic text-sm">No additional info</p>
            )}
          </div>

          <div>
            <h2 className="font-semibold text-gray-700">Status</h2>
            <p className="text-sm text-gray-600">
              {isApproved ? 'Approved' : isRejected ? 'Rejected' : 'Pending'}
            </p>
          </div>

          {isRejected && rejectedReason && (
            <div>
              <h2 className="font-semibold text-gray-700">Rejection Reason</h2>
              <p className="text-sm text-gray-600">{rejectedReason}</p>
            </div>
          )}

          <div>
            <h2 className="font-semibold text-gray-700">Created</h2>
            <p className="text-sm text-gray-600">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
