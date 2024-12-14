import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { IChapter, IEpisode } from '@/interfaces/Course';
import React from 'react';
import { FaPlay } from 'react-icons/fa6';
import { IoDocumentTextSharp } from 'react-icons/io5';

interface CourseContentProps {
  chapters: IChapter[];
  onSelectEpisode: (episode: IEpisode) => void;
}

const CourseContent: React.FC<CourseContentProps> = ({
  chapters,
  onSelectEpisode,
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Chapter(s)</h2>
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <Accordion
            key={chapter.id}
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h3 className="text-xl font-semibold mb-2 cursor-pointer">
                  {chapter.title}
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div key={chapter.id} className="border rounded-lg p-4">
                  <p className="text-gray-600 mb-2">{chapter.description}</p>
                  <ul className="space-y-2">
                    {chapter.episodes.map((episode) => (
                      <li
                        key={episode.id}
                        className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={() => onSelectEpisode(episode)}
                      >
                        {episode.type === 'video' ? (
                          <FaPlay className="w-5 h-5 mr-2" />
                        ) : (
                          <IoDocumentTextSharp className="w-5 h-5 mr-2" />
                        )}
                        <span>{episode.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default CourseContent;
