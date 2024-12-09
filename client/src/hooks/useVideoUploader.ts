import { useCallback, useEffect, useRef } from 'react';
import {
  cloudinarySignedVideoUploadUrl,
  uploadVideoUrlApi,
} from '@/services/instructor/courseService';
import { useToast } from './use-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAddUpload,
  setReset,
  setStatusFailed,
  setVideoUrl,
} from '@/redux/slices/instructor/courseCreationSlice';
import { RootState } from '@/redux/store';
import {
  addToUploadQueue,
  removeFromUploadQueue,
  setIsUploading,
  setResetQueue,
  setUploadFailed,
  setUploadSuccess,
  updateUploadProgress,
} from '@/redux/slices/instructor/uploadQueueSlice';

export const useVideoUploader = () => {
  const { isFormSubmitted, uploads, courseId } = useSelector(
    (state: RootState) => state.courseCreation
  );
  const { queue, isUploading } = useSelector(
    (state: RootState) => state.uploadQueue
  );
  const fileMapRef = useRef<Record<string, File>>({});
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

  const processQueue = useCallback(async () => {
    dispatch(setReset());
    dispatch(setResetQueue());
    if (isUploading || queue.length === 0) return;

    dispatch(setIsUploading(true));

    const currentUpload = queue[0];
    const { chapterIndex, episodeIndex, chapterId, episodeId, progress } =
      currentUpload;
    console.log('for checking', chapterId, episodeId, fileMapRef);

    const file = fileMapRef.current[`${chapterId}-${episodeId}`];

    if (!file) {
      console.error('File not found in fileReference');
      return;
    }

    toast({
      title: `Uploading Video`,
      description: `Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}: ${progress}% complete`,
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

        if (progress !== undefined) {
          dispatch(
            updateUploadProgress({
              chapterId,
              episodeId,
              progress,
            })
          );

          // toast({
          //   title: `Uploading Video`,
          //   description: `Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}: ${progress}% complete`,
          //   duration: 3000,
          // });
        }

        if (success) {
          const videoUrl: string = url;
          dispatch(setUploadSuccess({ chapterId, episodeId, videoUrl }));
          dispatch(setVideoUrl({ chapterId, episodeId, videoUrl }));
          toast({
            title: `Upload Complete`,
            description: `Video uploaded successfully for Chapter ${chapterIndex + 1}, Episode ${episodeIndex + 1}.`,
            duration: 5000,
          });

          console.log(`Uploaded video URL: ${url}`);
          // Here you would typically update your form state with the new URL

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

        dispatch(removeFromUploadQueue({ chapterId, episodeId }));
        dispatch(setIsUploading(false));
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
    const uploadVideoUrl = async () => {
      if (!courseId) {
        return;
      }
      console.log('preparing to upload url');

      const response = await uploadVideoUrlApi(uploads, courseId);
      console.log(response);

      if (response.success) {
        dispatch(setReset());
      }
    };
    if (queue.length === 0 && isFormSubmitted) {
      // save to mongoDB
      uploadVideoUrl();
    }
    if (queue.length > 0 && !isUploading) {
      processQueue();
    }
  }, [
    processQueue,
    queue,
    isFormSubmitted,
    courseId,
    dispatch,
    uploads,
    isUploading,
  ]);

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

  return { enqueueUpload, cancelUpload };
};
