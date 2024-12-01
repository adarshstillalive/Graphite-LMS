import { Loader2 } from 'lucide-react';

const AvatarSpinner = ({ size = 40, className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="animate-spin text-gray-500" size={size} />
    </div>
  );
};

export default AvatarSpinner;
