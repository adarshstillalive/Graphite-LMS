import { IEpisode } from '@/interfaces/Course';
import React from 'react';

interface EpisodeContentProps {
  episode: IEpisode;
  onClose: () => void;
}

const EpisodeContent: React.FC<EpisodeContentProps> = ({
  episode,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-sm p-4 max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{episode.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {episode.type === 'video' ? (
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <video
              src={typeof episode.content === 'string' ? episode?.content : ''}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="prose max-w-none">
            {typeof episode.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: episode.content }} />
            ) : (
              <p>No content available</p>
            )}
          </div>
        )}
        {episode.description && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{episode.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeContent;
