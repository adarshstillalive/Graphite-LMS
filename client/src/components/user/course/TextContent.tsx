import { Button } from '@/components/ui/button';
import { IEpisode } from '@/interfaces/Course';
import React, { useState } from 'react';

interface TextContentProps {
  episode: IEpisode;
}

const TextContent: React.FC<TextContentProps> = ({ episode }) => {
  const textContent =
    typeof episode.content === 'string' ? episode.content : '';
  const wordsPerPage = 200;
  const words = textContent.split(' ');
  const totalPages = Math.ceil(words.length / wordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const getCurrentPageText = () => {
    const start = (currentPage - 1) * wordsPerPage;
    return words.slice(start, start + wordsPerPage).join(' ');
  };

  return (
    <div className="min-h-[800px] w-full flex flex-col justify-between bg-white p-8 rounded-md">
      <div className="prose max-w-none">
        <h1 className="text-2xl font-bold mb-4">{episode.title}</h1>
        <p className="text-gray-700">{getCurrentPageText()}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TextContent;
