import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { IChapter } from '@/interfaces/Course';
import { FileText, PlayCircle } from 'lucide-react';

interface ChapterEpisodeSelectorProps {
  chapters: IChapter[];
  onSelect: (chapterId: string, episodeId: string) => void;
  selectedChapterId?: string;
  selectedEpisodeId?: string;
}

const ChapterEpisodeSelector: React.FC<ChapterEpisodeSelectorProps> = ({
  chapters,
  onSelect,
  selectedEpisodeId,
}) => {
  if (chapters.length === 0) {
    return <div className="p-4 text-gray-500">No chapters available.</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {chapters.map((chapter, index) => (
        <AccordionItem key={chapter.id} value={chapter.id}>
          <AccordionTrigger className="px-4 py-3 text-base font-medium hover:bg-gray-50">
            <div className="flex items-center">
              <span className="mr-2">Section {index + 1}:</span>
              {chapter.title}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 p-1">
              {chapter.episodes.map((episode) => (
                <Button
                  key={episode.id}
                  variant={
                    selectedEpisodeId === episode.id ? 'secondary' : 'ghost'
                  }
                  className="w-full justify-start text-left py-3 px-4 text-sm font-normal"
                  onClick={() => onSelect(chapter.id, episode.id)}
                >
                  <span className="mr-3">
                    {episode.type === 'video' ? (
                      <PlayCircle className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </span>
                  {episode.title}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ChapterEpisodeSelector;
