import React from 'react';

interface VideoPlayerProps {
  content: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ content }) => {
  const videoUrl = content;

  return (
    <div className="w-full relative" style={{ paddingTop: '56.25%' }}>
      <iframe
        src={videoUrl}
        title="Course Video"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default VideoPlayer;
