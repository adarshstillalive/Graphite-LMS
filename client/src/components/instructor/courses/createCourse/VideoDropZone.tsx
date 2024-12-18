import { useUpload } from '@/context/uploadContext';
import { useToast } from '@/hooks/use-toast';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface DropzoneProps {
  chapterIndex: number;
  episodeIndex: number;
  chapterId: string;
  episodeId: string;
  onVideoUploadSuccess: () => void;
}

const VideoDropzone: React.FC<DropzoneProps> = ({
  chapterIndex,
  episodeIndex,
  chapterId,
  episodeId,
  onVideoUploadSuccess,
}) => {
  const { toast } = useToast();
  const { enqueueUpload, cancelUpload } = useUpload();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { queue } = useSelector((state: RootState) => state.uploadQueue);

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
        setIsUploading(true);
        enqueueUpload(
          file,
          chapterIndex,
          episodeIndex,
          chapterId,
          episodeId,
          setProgress
        );
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
    disabled: isUploading,
  });

  const handleCancel = () => {
    cancelUpload(chapterId, episodeId);
  };

  useEffect(() => {
    const item = queue.find(
      (item) => item.chapterId === chapterId && item.episodeId === episodeId
    );
    if (!item && isUploading) {
      setIsUploading(false);
      setProgress(0);
    } else if (item) {
      setIsUploading(true);
      setProgress(item.progress);
    }
  }, [queue, chapterId, episodeId, isUploading]);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 cursor-pointer transition-all duration-200 
          ${isDragActive ? 'border-black bg-gray-300' : 'border-gray-300 bg-gray-50 hover:bg-gray-200'}
          ${isUploading ? 'pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        {isUploading && progress === 100 ? (
          <p className="text-black font-semibold">Upload complete</p>
        ) : isUploading ? (
          <p className="text-black font-semibold">Uploading...</p>
        ) : isDragActive ? (
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
      {isUploading && progress !== 100 && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{progress}% uploaded</span>
            <Button onClick={handleCancel} variant="destructive" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDropzone;
