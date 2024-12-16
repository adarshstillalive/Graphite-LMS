import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { IChapter } from '@/interfaces/Course';

interface ChapterEpisodeSelectorProps {
  chapters: IChapter[];
  onSelect: (chapterId: string, episodeId: string) => void;
  selectedChapterId?: string;
  selectedEpisodeId?: string;
}

const ChapterEpisodeSelector: React.FC<ChapterEpisodeSelectorProps> = ({
  chapters,
  onSelect,
  // selectedChapterId,
  selectedEpisodeId,
}) => {
  if (chapters.length === 0) {
    return <div>No chapters available.</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {chapters.map((chapter) => (
        <AccordionItem key={chapter.id} value={chapter.id}>
          <AccordionTrigger className="py-6 text-lg font-normal">
            {chapter.title}
          </AccordionTrigger>
          <AccordionContent>
            {chapter.episodes.map((episode) => (
              <Button
                key={episode.id}
                variant={selectedEpisodeId === episode.id ? 'default' : 'ghost'}
                className="w-full justify-start text-left py-6 border-2 border-gray-800 font-normal"
                onClick={() => onSelect(chapter.id, episode.id)}
              >
                {episode.title}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ChapterEpisodeSelector;
