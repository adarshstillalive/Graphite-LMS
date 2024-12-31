import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  content: string;
  onEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ content, onEnd }) => {
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
        onEnded={onEnd}
      />
    </div>
  );
};

export default VideoPlayer;
