import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '../ui/button';
import { useUpload } from '@/context/uploadContext';
import { Progress } from '../ui/progress';

interface UploadStatusProps {
  chapterId: string;
  episodeId: string;
}

const UploadStatus = ({ chapterId, episodeId }: UploadStatusProps) => {
  const { cancelUpload } = useUpload();
  const queueItem = useSelector((state: RootState) =>
    state.uploadQueue.queue.find(
      (item) => item.chapterId === chapterId && item.episodeId === episodeId
    )
  );
  return (
    <>
      <p>
        Chapter {queueItem && queueItem.chapterIndex + 1}, Episode{' '}
        {queueItem && queueItem.episodeIndex + 1}
      </p>
      <p>{queueItem && queueItem.fileName}</p>
      <div className="flex justify-between items-center mt-2">
        <Progress
          value={queueItem && queueItem.progress}
          className="w-full text-black h-4 rounded-none"
        />
        <Button
          onClick={() => cancelUpload(chapterId, episodeId)}
          variant="default"
          size="sm"
          className="ml-2"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default UploadStatus;
