import { useUpload } from '@/context/uploadContext';
import { useToast } from '@/hooks/use-toast';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
  chapterIndex: number;
  episodeIndex: number;
  chapterId: string;
  episodeId: string;
  onVideoUploadSuccess: () => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
  chapterIndex,
  episodeIndex,
  chapterId,
  episodeId,
  onVideoUploadSuccess,
}) => {
  const { toast } = useToast();
  const { enqueueUpload } = useUpload();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        toast({
          variant: 'destructive',
          description: 'Multiple videos not allowed',
        });
        return;
      }
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];
        enqueueUpload(file, chapterIndex, episodeIndex, chapterId, episodeId);
        onVideoUploadSuccess();
      }
    },
    [
      toast,
      enqueueUpload,
      chapterIndex,
      episodeIndex,
      chapterId,
      episodeId,
      onVideoUploadSuccess,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 cursor-pointer transition-all duration-200 
        ${isDragActive ? 'border-black bg-gray-300' : 'border-gray-300 bg-gray-50 hover:bg-gray-200'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-black font-semibold">Drop the video here...</p>
      ) : (
        <p className="text-gray-500">
          Drag & drop a video here, or{' '}
          <span className="text-black font-semibold">
            click to select a video
          </span>
        </p>
      )}
    </div>
  );
};

export default Dropzone;
