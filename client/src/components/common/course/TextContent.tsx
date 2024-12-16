import { Button } from '@/components/ui/button';
import { IEpisode } from '@/interfaces/Course';
import React, { useState } from 'react';

interface TextContentProps {
  episode: IEpisode;
}

const TextContent: React.FC<TextContentProps> = ({ episode }) => {
  const textContent =
    typeof episode.content === 'string' ? episode.content : '';

  // Split the text into pages (customize page size as needed)
  const wordsPerPage = 200;
  const words = textContent.split(' ');
  const totalPages = Math.ceil(words.length / wordsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const getCurrentPageText = () => {
    const start = (currentPage - 1) * wordsPerPage;
    const end = start + wordsPerPage;
    return words.slice(start, end).join(' ');
  };

  return (
    <div className="h-[800px] w-full flex flex-col justify-between bg-gray-100 py-8 px-16 rounded-md">
      <div className="prose max-w-none">
        <h1 className="text-2xl font-bold mb-4">{episode.title}</h1>
        <p>{getCurrentPageText()}</p>
      </div>
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2"
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TextContent;
