import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface FieldListProps {
  title: string;
  items: string[];
  onRemoveItem: (index: number) => void;
}

const RequestFieldList: React.FC<FieldListProps> = ({
  title,
  items,
  onRemoveItem,
}) =>
  items.length > 0 && (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">{title}</h3>
      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index} className="mb-1 text-gray-600 flex items-center">
            {item}
            <button
              type="button"
              onClick={() => onRemoveItem(index)}
              className="ml-4 text-red-500"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

export default RequestFieldList;
