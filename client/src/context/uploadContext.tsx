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
import store, { RootState } from '@/redux/store';
import {
  addToUploadQueue,
  removeFromUploadQueue,
  setNotificationId,
  setUploadFailed,
  setUploadSuccess,
  updateUploadProgress,
} from '@/redux/slices/instructor/uploadQueueSlice';
import {
  setAddUpload,
  setRemoveUpload,
  setReset,
  setStatusFailed,
  setVideoUrl,
} from '@/redux/slices/instructor/courseCreationSlice';
import { useToast } from '@/hooks/use-toast';
import UploadStatus from '@/components/common/UploadStatus';
import { useNotification } from './notificationContext';

type UploadContextType = {
  enqueueUpload: (
    file: File,
    chapterIndex: number,
    episodeIndex: number,
    chapterId: string,
    episodeId: string,
    setProgress: (progress: number) => void
  ) => void;
  cancelUpload: (chapterId: string, episodeId: string) => void;
};

interface UploadProviderProps {
  children: ReactNode;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

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
  const { queue } = useSelector((state: RootState) => state.uploadQueue);
  const fileMapRef = useRef<Record<string, File>>({});
  const workersRef = useRef<Record<string, Worker>>({});
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { addNotification, removeNotification } = useNotification();

  // Enqueue Upload
  const enqueueUpload = useCallback(
    (
      file: File,
      chapterIndex: number,
      episodeIndex: number,
      chapterId: string,
      episodeId: string,
      setProgress: (progress: number) => void
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

      // Start the upload immediately
      processUpload(
        file,
        chapterIndex,
        episodeIndex,
        chapterId,
        episodeId,
        setProgress
      );
    },
    [dispatch]
  );

  const processUpload = useCallback(
    async (
      file: File,
      chapterIndex: number,
      episodeIndex: number,
      chapterId: string,
      episodeId: string,
      setProgress: (progress: number) => void
    ) => {
      const notificationId = addNotification(
        <UploadStatus {...{ chapterId, episodeId }} />
      );
      dispatch(setNotificationId({ chapterId, episodeId, notificationId }));
      try {
        const { data } = await cloudinarySignedVideoUploadUrl();
        const { uploadURL, uploadParams } = data;
        const worker = new Worker(
          new URL('../workers/uploadWorker.ts', import.meta.url)
        );

        worker.postMessage({ file, uploadURL, uploadParams });
        dispatch(setAddUpload({ chapterId, episodeId }));
        workersRef.current[`${chapterId}-${episodeId}`] = worker;

        worker.onmessage = (event) => {
          const { progress, success, url } = event.data;

          if (progress !== undefined) {
            setProgress(progress);
            dispatch(updateUploadProgress({ chapterId, episodeId, progress }));
          }

          if (success) {
            removeNotification(notificationId);
            const videoUrl: string = url;
            dispatch(setUploadSuccess({ chapterId, episodeId }));
            dispatch(setVideoUrl({ chapterId, episodeId, videoUrl }));
            toast({
              title: `Upload Complete`,
              description: `Video uploaded successfully for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}.`,
              duration: 5000,
            });

            delete workersRef.current[`${chapterId}-${episodeId}`];
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
          delete workersRef.current[`${chapterId}-${episodeId}`];
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast({
          title: `Upload Error`,
          description: `Unable to start upload for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}.`,
          variant: 'destructive',
          duration: 5000,
        });
      }
    },
    [dispatch, toast, addNotification, removeNotification]
  );

  useEffect(() => {
    const handleUploadCompletion = async () => {
      const completedUploads = uploads.filter(
        (file) => file.status === 'completed'
      );
      if (
        queue.length === completedUploads.length &&
        isFormSubmitted &&
        courseId
      ) {
        fileMapRef.current = {};

        console.log('Saving to MongoDB...');
        const response = await uploadVideoUrlApi(completedUploads, courseId);
        if (response.success) {
          dispatch(setReset());
        }
      }
    };

    handleUploadCompletion();
  }, [queue.length, isFormSubmitted, courseId]);

  // Cancel Upload
  const cancelUpload = useCallback(
    (chapterId: string, episodeId: string) => {
      const workerKey = `${chapterId}-${episodeId}`;
      const worker = workersRef.current[workerKey];
      if (worker) {
        worker.terminate();
        delete workersRef.current[workerKey];
      }
      const queue = store.getState().uploadQueue.queue;
      const item = queue.find(
        (item) => item.chapterId === chapterId && item.episodeId === episodeId
      );

      if (item && item.notificationId) {
        removeNotification(item.notificationId);
      }
      dispatch(removeFromUploadQueue({ chapterId, episodeId }));
      dispatch(setRemoveUpload({ chapterId, episodeId }));

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
