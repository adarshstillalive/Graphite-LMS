import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IChapter, IEpisode, IPopulatedCourse } from '@/interfaces/Course';

interface CourseDetailPageProps {
  course: IPopulatedCourse;
}

const EpisodeContent: React.FC<{ episode: IEpisode }> = ({ episode }) => {
  if (episode.type === 'video' && typeof episode.content === 'string') {
    return (
      <video controls className="w-full">
        <source src={episode.content} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else if (
    episode.type === 'text' &&
    typeof episode.content === 'object' &&
    episode.content !== null
  ) {
    return (
      <div dangerouslySetInnerHTML={{ __html: episode.content.content }} />
    );
  } else {
    return <p>Content not available</p>;
  }
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
}) => {
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{course.category.name}</Badge>
            <Badge variant="secondary">
              {course.category.subCategory.reduce((acc, curr) => {
                if (curr._id === course.subcategory) {
                  return curr.name;
                }
                return acc;
              }, 'Not found')}
            </Badge>
            <Badge variant="secondary">{course.level}</Badge>
            <Badge variant="secondary">{course.language}</Badge>
          </div>
          <p className="mb-4">{course.description}</p>
          <p className="font-semibold mb-2">Price: ₹{course.price}</p>
          {course.rating && <p className="mb-4">Rating: {course.rating}/5</p>}
          {course.welcomeMessage && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Welcome Message:</h3>
              <p>{course.welcomeMessage}</p>
            </div>
          )}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Course Content:</h3>
            <Accordion type="single" collapsible>
              {course.chapters?.map((chapter: IChapter) => (
                <AccordionItem key={chapter.id} value={chapter.id}>
                  <AccordionTrigger>{chapter.title}</AccordionTrigger>
                  <AccordionContent>
                    {chapter.description && (
                      <p className="mb-2">{chapter.description}</p>
                    )}
                    <ul>
                      {chapter.episodes.map((episode: IEpisode) => (
                        <li key={episode.id} className="mb-2">
                          <Button
                            variant="link"
                            onClick={() => setSelectedEpisode(episode)}
                          >
                            {episode.title}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {selectedEpisode && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                {selectedEpisode.title}
              </h3>
              {selectedEpisode.description && (
                <p className="mb-2">{selectedEpisode.description}</p>
              )}
              <EpisodeContent episode={selectedEpisode} />
            </div>
          )}
          {course.courseCompletionMessage && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                Course Completion Message:
              </h3>
              <p>{course.courseCompletionMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
