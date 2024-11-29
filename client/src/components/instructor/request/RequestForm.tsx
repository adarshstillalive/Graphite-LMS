import React from 'react';

interface FormSectionProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  onAddField: () => void;
}

const RequestFormSection: React.FC<FormSectionProps> = ({
  label,
  value,
  onValueChange,
  onAddField,
}) => (
  <div className="mb-4">
    <label className="block mb-2 font-medium text-gray-700">{label}</label>
    <div className="flex mb-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="flex-grow mr-2 p-2 border"
      />
      <button
        type="button"
        onClick={onAddField}
        className="px-4 py-2 bg-black text-white hover:bg-gray-800"
      >
        Add
      </button>
    </div>
  </div>
);

export default RequestFormSection;
