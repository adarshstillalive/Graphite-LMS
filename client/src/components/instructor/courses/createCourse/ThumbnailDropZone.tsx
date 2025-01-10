import { useToast } from '@/hooks/use-toast';
import { uploadCourseThumbnail } from '@/services/instructor/courseService';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
  onImageUploadSuccess: (thumbnailUrl: string) => void;
}

const ThumbnailDropZone: React.FC<DropzoneProps> = ({
  onImageUploadSuccess,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        toast({
          variant: 'destructive',
          description: 'Multiple images not allowed',
        });
        return;
      }
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpeg'];
      const file = acceptedFiles[0];
      if (!file || !validImageTypes.includes(file.type)) {
        toast({
          variant: 'destructive',
          description: 'Please select a valid image file (JPEG, PNG or JPG).',
        });
        return;
      }
      const uploadThumbnail = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
          setIsUploading(true);
          const response = await uploadCourseThumbnail(formData);
          const thumbnailUrl = response.data;

          onImageUploadSuccess(thumbnailUrl);
        } catch (error) {
          console.log(error);
          toast({
            variant: 'destructive',
            description: 'Upload failed, try again.',
          });
        } finally {
          setIsUploading(false);
        }
      };
      uploadThumbnail();
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    disabled: isUploading,
  });
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 cursor-pointer transition-all duration-200 
          ${isDragActive ? 'border-black bg-gray-300' : 'border-gray-300 bg-gray-50 hover:bg-gray-200'}
          ${isUploading ? 'pointer-events-none' : ''}`}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <p className="text-black font-semibold">Uploading...</p>
      ) : isDragActive ? (
        <p className="text-black font-semibold">Drop the image here...</p>
      ) : (
        <p className="text-gray-500">
          Drag & drop image here, or{' '}
          <span className="text-black font-semibold">
            click to select an image
          </span>
        </p>
      )}
    </div>
  );
};

export default ThumbnailDropZone;
