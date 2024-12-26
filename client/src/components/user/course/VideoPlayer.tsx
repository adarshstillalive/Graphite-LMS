import React, { useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  content: string;
  updateProgress: (progress: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  content,
  updateProgress,
}) => {
  const [progress, setProgress] = useState(0);

  const handleProgress = (state: { played: number }) => {
    const playedPercentage = state.played * 100; // Convert to percentage
    setProgress(playedPercentage);
    // console.log(`Progress: ${playedPercentage.toFixed(2)}%`);
    updateProgress(playedPercentage);
  };

  return (
    <div
      className="player-wrapper"
      style={{ position: 'relative', paddingTop: '56.25%' }}
    >
      <ReactPlayer
        url={content}
        className="react-player"
        style={{ position: 'absolute', top: 0, left: 0 }}
        width="100%"
        height="100%"
        controls
        onProgress={handleProgress}
      />
      <p>Progress: {progress.toFixed(2)}%</p>
    </div>
  );
};

export default VideoPlayer;
