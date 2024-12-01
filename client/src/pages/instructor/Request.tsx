import RequestDetails, {
  InstructorRequest,
} from '@/components/instructor/request/RequestDetails';
import RequestForm from '@/components/instructor/request/RequestForm';
import { fetchRequest } from '@/services/instructor/commonService';
import { useEffect, useState } from 'react';

const Request = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [requestDetails, setRequestDetails] = useState<InstructorRequest>();

  useEffect(() => {
    const fetchRequestApi = async () => {
      const response = await fetchRequest();

      if (response) {
        const {
          expertise,
          qualifications,
          additionalInfo,
          isApproved,
          isRejected,
          rejectedReason,
          createdAt,
        } = response.data;
        setRequestDetails({
          expertise: expertise,
          qualifications: qualifications,
          additionalInfo: additionalInfo,
          isApproved: isApproved,
          isRejected: isRejected,
          rejectedReason: rejectedReason,
          createdAt: createdAt,
        });

        setShowRequestDetails(true);
      } else {
        setShowRequestForm(true);
      }
    };

    fetchRequestApi();
  }, []);

  return (
    <div className="pt-16">
      {showRequestForm && <RequestForm />}
      {showRequestDetails && requestDetails && (
        <RequestDetails {...requestDetails} />
      )}
    </div>
  );
};

export default Request;
