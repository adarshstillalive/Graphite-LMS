import { useState, useCallback, useEffect } from 'react';
import { cloudinarySignedVideoUploadUrl } from '@/services/instructor/courseService';
import { useToast } from './use-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAddUpload,
  setStatusFailed,
  setVideoUrl,
} from '@/redux/slices/instructor/courseCreationSlice';
import { RootState } from '@/redux/store';

interface UploadItem {
  file: File;
  chapterIndex: number;
  episodeIndex: number;
  chapterId: string;
  episodeId: string;
  progress: number;
}

export const useVideoUploader = () => {
  const { isFormSubmitted } = useSelector(
    (state: RootState) => state.courseCreation
  );
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const enqueueUpload = useCallback(
    (
      file: File,
      chapterIndex: number,
      episodeIndex: number,
      chapterId: string,
      episodeId: string
    ) => {
      setUploadQueue((prevQueue) => [
        ...prevQueue,
        { file, chapterIndex, episodeIndex, chapterId, episodeId, progress: 0 },
      ]);
    },
    []
  );

  const processQueue = useCallback(async () => {
    if (isUploading || uploadQueue.length === 0) return;

    setIsUploading(true);

    const [currentUpload, ...remainingQueue] = uploadQueue;
    const { file, chapterIndex, episodeIndex, chapterId, episodeId } =
      currentUpload;

    toast({
      title: `Uploading Video`,
      description: `Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}: Starting upload.`,
      duration: 5000,
    });

    try {
      const { data } = await cloudinarySignedVideoUploadUrl();
      const { uploadURL, uploadParams } = data;

      const worker = new Worker(
        new URL('../workers/uploadWorker.ts', import.meta.url)
      );
      worker.postMessage({ file, uploadURL, uploadParams });
      dispatch(setAddUpload({ chapterId, episodeId }));

      worker.onmessage = (event) => {
        const { progress, success, url } = event.data;

        if (progress !== undefined) {
          setUploadQueue((prevQueue) =>
            prevQueue.map((item, index) =>
              index === 0 ? { ...item, progress } : item
            )
          );
          toast({
            title: `Uploading Video`,
            description: `Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}: ${progress}% complete`,
            duration: 3000,
          });
        }

        if (success) {
          const videoUrl: string = url;
          dispatch(setVideoUrl({ chapterId, episodeId, videoUrl }));
          toast({
            title: `Upload Complete`,
            description: `Video uploaded successfully for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}.`,
            duration: 5000,
          });

          console.log(`Uploaded video URL: ${url}`);
          // Here you would typically update your form state with the new URL

          setUploadQueue(remainingQueue);
          setIsUploading(false);
        }
      };

      worker.onerror = () => {
        dispatch(setStatusFailed({ chapterId, episodeId }));
        toast({
          title: `Upload Failed`,
          description: `Error uploading video for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}.`,
          variant: 'destructive',
          duration: 5000,
        });

        setUploadQueue(remainingQueue);
        setIsUploading(false);
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: `Upload Error`,
        description: `Unable to start upload for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}.`,
        variant: 'destructive',
        duration: 5000,
      });

      setUploadQueue(remainingQueue);
      setIsUploading(false);
    }
  }, [isUploading, uploadQueue, toast]);

  useEffect(() => {
    if (uploadQueue.length === 0 && isFormSubmitted) {
      // save to mongoDB
    } else {
      processQueue();
    }
  }, [processQueue, uploadQueue, isFormSubmitted]);

  const cancelUpload = useCallback(
    (chapterIndex: number, episodeIndex: number) => {
      setUploadQueue((prevQueue) =>
        prevQueue.filter(
          (item) =>
            item.chapterIndex !== chapterIndex ||
            item.episodeIndex !== episodeIndex
        )
      );

      toast({
        title: `Upload Canceled`,
        description: `Upload for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1} has been canceled.`,
        variant: 'destructive',
        duration: 5000,
      });
    },
    [toast]
  );

  return { enqueueUpload, cancelUpload, uploadQueue };
};
