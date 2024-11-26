import React, { useEffect, useState } from 'react';
import {
  fetchRequest,
  sendRequest,
} from '../../services/instructor/commonService';

import RequestDetails, {
  RequestDetailsProps,
} from '../../components/instructor/RequestDetails';
import RequestFormSection from '../../components/instructor/RequestForm';
import RequestFieldList from '../../components/instructor/RequestFieldList';

const Request: React.FC = () => {
  const [expertise, setExpertise] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<string[]>([]);

  const [newExpertise, setNewExpertise] = useState('');
  const [newQualification, setNewQualification] = useState('');
  const [newAdditionalInfo, setNewAdditionalInfo] = useState('');
  const [showRequest, setShowRequest] = useState(false);
  const [requestObj, setRequestObj] = useState<RequestDetailsProps>({
    expertise: [],
    qualifications: [],
    additionalInfo: [],
    isApproved: null,
    isRejected: null,
    rejectedReason: '',
    createdAt: '',
  });

  const addField = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    currentArray: string[]
  ) => {
    if (value.trim() && !currentArray.includes(value.trim())) {
      setter([...currentArray, value.trim()]);
    }
  };

  const removeField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    currentArray: string[]
  ) => {
    setter(currentArray.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = { expertise, qualifications, additionalInfo };
      const response = await sendRequest(data);

      if (response.success) {
        alert('Instructor request submitted successfully!');
        setExpertise([]);
        setQualifications([]);
        setAdditionalInfo([]);
      } else {
        alert('Failed to submit instructor request.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting the request.');
    }
  };

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
        setRequestObj({
          expertise: expertise,
          qualifications: qualifications,
          additionalInfo: additionalInfo,
          isApproved: isApproved,
          isRejected: isRejected,
          rejectedReason: rejectedReason,
          createdAt: createdAt,
        });

        setShowRequest(true);
      }
    };

    fetchRequestApi();
  }, []); // Removed incorrect dependencies like `dispatch` or `isInstructor`

  return !showRequest ? (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
            Instructor Request
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <RequestFormSection
              label="Expertise"
              value={newExpertise}
              onValueChange={setNewExpertise}
              onAddField={() => {
                addField(newExpertise, setExpertise, expertise);
                setNewExpertise('');
              }}
            />
            <RequestFormSection
              label="Qualifications"
              value={newQualification}
              onValueChange={setNewQualification}
              onAddField={() => {
                addField(newQualification, setQualifications, qualifications);
                setNewQualification('');
              }}
            />
            <RequestFormSection
              label="Additional Info"
              value={newAdditionalInfo}
              onValueChange={setNewAdditionalInfo}
              onAddField={() => {
                addField(newAdditionalInfo, setAdditionalInfo, additionalInfo);
                setNewAdditionalInfo('');
              }}
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Instructor Request
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Data Display */}
      <div className="w-1/2 bg-white p-8 overflow-y-auto">
        <RequestFieldList
          title="Expertise"
          items={expertise}
          onRemoveItem={(index) => removeField(index, setExpertise, expertise)}
        />
        <RequestFieldList
          title="Qualifications"
          items={qualifications}
          onRemoveItem={(index) =>
            removeField(index, setQualifications, qualifications)
          }
        />
        <RequestFieldList
          title="Additional Info"
          items={additionalInfo}
          onRemoveItem={(index) =>
            removeField(index, setAdditionalInfo, additionalInfo)
          }
        />
      </div>
    </div>
  ) : (
    <RequestDetails {...requestObj} />
  );
};

export default Request;
