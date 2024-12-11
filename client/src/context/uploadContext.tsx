import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cloudinarySignedVideoUploadUrl,
  uploadVideoUrlApi,
} from '@/services/instructor/courseService';
import { RootState } from '@/redux/store';
import {
  addToUploadQueue,
  removeFromUploadQueue,
  setIsUploading,
  setUploadFailed,
  setUploadSuccess,
  updateUploadProgress,
} from '@/redux/slices/instructor/uploadQueueSlice';
import {
  setAddUpload,
  setReset,
  setStatusFailed,
  setVideoUrl,
} from '@/redux/slices/instructor/courseCreationSlice';
import { useToast } from '@/hooks/use-toast';

type UploadContextType = {
  enqueueUpload: (
    file: File,
    chapterIndex: number,
    episodeIndex: number,
    chapterId: string,
    episodeId: string
  ) => void;
  cancelUpload: (chapterId: string, episodeId: string) => void;
};

interface UploadProviderProps {
  children: ReactNode;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

let progressPercentage = 0;

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};

export const UploadProvider: React.FC<UploadProviderProps> = ({ children }) => {
  const { isFormSubmitted, uploads, courseId } = useSelector(
    (state: RootState) => state.courseCreation
  );
  const { queue, isUploading } = useSelector(
    (state: RootState) => state.uploadQueue
  );
  const fileMapRef = useRef<Record<string, File>>({});
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Enqueue Upload
  const enqueueUpload = useCallback(
    (
      file: File,
      chapterIndex: number,
      episodeIndex: number,
      chapterId: string,
      episodeId: string
    ) => {
      const key = `${chapterId}-${episodeId}`;
      fileMapRef.current[key] = file;

      dispatch(
        addToUploadQueue({
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          chapterIndex,
          episodeIndex,
          chapterId,
          episodeId,
          progress: 0,
          status: 'pending',
        })
      );
    },
    [dispatch]
  );

  // Process Upload Queue
  const processQueue = useCallback(async () => {
    if (isUploading || queue.length === 0) return;
    dispatch(setIsUploading(true));

    const currentUpload = queue[0];
    const { chapterIndex, episodeIndex, chapterId, episodeId } = currentUpload;
    const file = fileMapRef.current[`${chapterId}-${episodeId}`];

    if (!file) {
      console.error('File not found in fileReference');
      return;
    }

    toast({
      title: `Uploading Video`,
      description: `Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}: ${progressPercentage}% complete`,
      duration: Infinity,
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
        progressPercentage = progress;
        console.log(progress);
        if (progress !== undefined) {
          dispatch(updateUploadProgress({ chapterId, episodeId, progress }));
        }

        if (success) {
          progressPercentage = 0;
          const videoUrl: string = url;
          dispatch(setUploadSuccess({ chapterId, episodeId, videoUrl }));
          dispatch(setVideoUrl({ chapterId, episodeId, videoUrl }));
          toast({
            title: `Upload Complete`,
            description: `Video uploaded successfully for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}.`,
            duration: 5000,
          });

          dispatch(removeFromUploadQueue({ chapterId, episodeId }));
          dispatch(setIsUploading(false));
        }
      };

      worker.onerror = () => {
        dispatch(setUploadFailed({ chapterId, episodeId }));
        dispatch(setStatusFailed({ chapterId, episodeId }));
        toast({
          title: `Upload Failed`,
          description: `Error uploading video for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}.`,
          variant: 'destructive',
          duration: 5000,
        });
        dispatch(setIsUploading(false));
        dispatch(removeFromUploadQueue({ chapterId, episodeId }));
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: `Upload Error`,
        description: `Unable to start upload for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}.`,
        variant: 'destructive',
        duration: 5000,
      });

      dispatch(removeFromUploadQueue({ chapterId, episodeId }));
      dispatch(setIsUploading(false));
    }
  }, [isUploading, queue, toast, dispatch]);

  useEffect(() => {
    const handleUploadCompletion = async () => {
      if (queue.length === 0 && isFormSubmitted && courseId) {
        console.log('Saving to MongoDB...');
        const response = await uploadVideoUrlApi(uploads, courseId);
        if (response.success) {
          dispatch(setReset());
        }
      }
    };

    handleUploadCompletion();

    if (queue.length > 0 && !isUploading) {
      processQueue();
    }
  }, [queue.length, isFormSubmitted, courseId, processQueue]);

  // Cancel Upload
  const cancelUpload = useCallback(
    (chapterId: string, episodeId: string) => {
      dispatch(removeFromUploadQueue({ chapterId, episodeId }));

      toast({
        title: `Upload Canceled`,
        description: `Upload for Chapter and Episode has been canceled.`,
        variant: 'destructive',
        duration: 5000,
      });
    },
    [dispatch, toast]
  );

  return (
    <UploadContext.Provider value={{ enqueueUpload, cancelUpload }}>
      {children}
    </UploadContext.Provider>
  );
};
