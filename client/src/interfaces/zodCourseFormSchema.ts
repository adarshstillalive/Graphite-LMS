import { z } from 'zod';

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
// const MAX_VIDEO_FILE_SIZE = 100 * 1024 * 1024; // 100MB
// const ACCEPTED_VIDEO_TYPES = [
//   'video/mp4',
//   'video/mpeg',
//   'video/quicktime',
//   'video/x-msvideo',
//   'video/x-ms-wmv',
// ];

export const curriculumEpisodeSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  type: z.enum(['video', 'text']).default('video'),
  description: z.string().optional(),
  content: z.union([
    z.object({
      content: z
        .string()
        .min(50, 'Text content must be at least 50 characters.'),
    }),
    z.object({
      video: z
        .union([z.boolean(), z.string()])
        .refine(
          (selected) =>
            selected === true ||
            (typeof selected === 'string' && selected.trim() !== ''),
          {
            message: 'Please select a video for this episode.',
          }
        ),
    }),
  ]),
});

export const chapterSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Chapter title must be at least 2 characters.'),
  description: z.string().optional(),
  episodes: z
    .array(curriculumEpisodeSchema)
    .min(1, 'Please add at least one episode to the chapter.'),
});

export const courseSchema = z.object({
  title: z.string().min(2, 'Course title must be at least 2 characters.'),
  subtitle: z.string().min(10, 'Subtitle must be at least 10 characters.'),
  category: z.string().min(1, 'Please select a category.'),
  subcategory: z.string().min(1, 'Please select a subcategory.'),
  language: z.string().min(1, 'Please select a language.'),
  level: z.string().min(1, 'Please select a level.'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters.'),
  price: z.string().min(1, 'Please enter a valid price'),
  welcomeMessage: z.string().optional(),
  courseCompletionMessage: z.string().optional(),
  thumbnail: z.string().url('Add one thumbnail for the course'),
  chapters: z.array(chapterSchema).min(1, 'Please add at least one chapter.'),
});

export const languages = ['English', 'Malayalam', 'Hindi'];
export const levels = ['Beginner', 'Intermediate', 'Advanced'];
export const inputStyle =
  'rounded-none h-12 border-gray-300 focus:border-black';
export const gridStyle = 'grid grid-cols-1 md:grid-cols-2 gap-4';
