// import { useState, useCallback } from 'react';
// import { cloudinarySignedVideoUploadUrl } from '@/services/instructor/courseService';
// import { useToast } from '@/hooks/use-toast';

// interface UploadItem {
//   file: File;
//   chapterIndex: number;
//   episodeIndex: number;
//   progress: number;
// }

// const VideoUploader = () => {
//   const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const { toast } = useToast();

//   const enqueueUpload = useCallback(
//     (file: File, chapterIndex: number, episodeIndex: number) => {
//       setUploadQueue((prevQueue) => [
//         ...prevQueue,
//         { file, chapterIndex, episodeIndex, progress: 0 },
//       ]);
//       processQueue();
//     },
//     []
//   );

//   const processQueue = useCallback(async () => {
//     if (isUploading || uploadQueue.length === 0) return;

//     setIsUploading(true);

//     const [currentUpload, ...remainingQueue] = uploadQueue;
//     const { file, chapterIndex, episodeIndex } = currentUpload;

//     const toastRef = toast({
//       title: `Uploading Video`,
//       description: `Chapter ${chapterIndex}, Episode ${episodeIndex}: Starting upload.`,
//       duration: 0,
//     });

//     try {
//       const {
//         data: { uploadURL },
//       } = await cloudinarySignedVideoUploadUrl();

//       const worker = new Worker(
//         new URL('../../../../workers/uploadWorker.ts', import.meta.url)
//       );
//       worker.postMessage({ file, uploadURL });

//       worker.onmessage = (event) => {
//         const { progress, success, url } = event.data;

//         if (progress !== undefined) {
//           // Update the toast description dynamically
//           currentUpload.progress = progress;
//           toast({
//             ...toastRef,
//             description: `Chapter ${chapterIndex}, Episode ${episodeIndex}: Uploading... ${progress}%`,
//           });
//         }

//         if (success) {
//           toast({
//             ...toastRef,
//             title: `Upload Complete`,
//             description: `Video uploaded successfully for Chapter ${chapterIndex}, Episode ${episodeIndex}.`,
//             duration: 3000,
//           });

//           console.log(`Uploaded video URL: ${url}`);

//           setUploadQueue(remainingQueue);
//           setIsUploading(false);
//           processQueue();
//         }
//       };

//       worker.onerror = () => {
//         toast({
//           ...toastRef,
//           title: `Upload Failed`,
//           description: `Error uploading video for Chapter ${chapterIndex}, Episode ${episodeIndex}.`,
//           variant: 'destructive',
//           duration: 3000,
//         });

//         setUploadQueue(remainingQueue);
//         setIsUploading(false);
//         processQueue();
//       };
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       toast({
//         ...toastRef,
//         title: `Upload Error`,
//         description: `Unable to start upload for Chapter ${chapterIndex}, Episode ${episodeIndex}.`,
//         variant: 'destructive',
//         duration: 3000,
//       });

//       setUploadQueue(remainingQueue);
//       setIsUploading(false);
//     }
//   }, [isUploading, uploadQueue, toast]);

//   const cancelUpload = useCallback(() => {
//     toast({
//       title: `Upload Canceled`,
//       description: `All uploads have been canceled.`,
//       variant: 'destructive',
//       duration: 3000,
//     });

//     setUploadQueue([]);
//     setIsUploading(false);
//   }, [toast]);

//   return { enqueueUpload, cancelUpload };
// };

// export default VideoUploader;
