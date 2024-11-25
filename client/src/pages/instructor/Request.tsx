import React, { useState } from 'react';
import axios from 'axios';

const Request = () => {
  const [formData, setFormData] = useState({
    expertise: [''],
    qualifications: [''],
    additionalInfo: [''],
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    index: number,
    field: keyof typeof formData,
    value: string
  ) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addField = (field: keyof typeof formData) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeField = (field: keyof typeof formData, index: number) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('/api/instructor-requests', formData);
      setSuccessMessage('Request submitted successfully!');
      setFormData({
        expertise: [''],
        qualifications: [''],
        additionalInfo: [''],
      });
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to submit the request'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl h-screen mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Instructor Request</h1>
      <form onSubmit={handleSubmit}>
        {/* Expertise Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Expertise</label>
          {formData.expertise.map((item, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleInputChange(index, 'expertise', e.target.value)
                }
                className="border rounded p-2 w-full"
                placeholder="Enter your area of expertise"
              />
              <button
                type="button"
                onClick={() => removeField('expertise', index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField('expertise')}
            className="text-blue-500 hover:underline"
          >
            Add Expertise
          </button>
        </div>

        {/* Qualifications Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Qualifications
          </label>
          {formData.qualifications.map((item, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleInputChange(index, 'qualifications', e.target.value)
                }
                className="border rounded p-2 w-full"
                placeholder="Enter a qualification"
              />
              <button
                type="button"
                onClick={() => removeField('qualifications', index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField('qualifications')}
            className="text-blue-500 hover:underline"
          >
            Add Qualification
          </button>
        </div>

        {/* Additional Information Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Additional Info
          </label>
          {formData.additionalInfo.map((item, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleInputChange(index, 'additionalInfo', e.target.value)
                }
                className="border rounded p-2 w-full"
                placeholder="Enter any additional information"
              />
              <button
                type="button"
                onClick={() => removeField('additionalInfo', index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField('additionalInfo')}
            className="text-blue-500 hover:underline"
          >
            Add Info
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      {/* Success or Error Messages */}
      {successMessage && (
        <p className="mt-4 text-green-500">{successMessage}</p>
      )}
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Request;
