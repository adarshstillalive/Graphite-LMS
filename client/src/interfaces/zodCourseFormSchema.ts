import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_VIDEO_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-ms-wmv',
];

export const curriculumEpisodeSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  type: z.enum(['video', 'text']).default('video'),
  description: z.string().optional(),
  content: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('text'),
      content: z
        .string()
        .min(50, 'Text content must be at least 50 characters.'),
    }),

    z.object({
      type: z.literal('video'),
      file: z
        .any()
        .refine((files) => files?.length === 1, 'A video file is required')
        .refine(
          (files) => files?.[0]?.size <= MAX_VIDEO_FILE_SIZE,
          'Max video file size is 100MB.'
        )
        .refine(
          (files) => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
          'Only MP4, MPEG, QuickTime, AVI, and WMV video types are accepted.'
        ),
    }),
  ]),
});

export const chapterSchema = z.object({
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
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Price must be a valid non-negative number.',
  }),
  salesPitch: z
    .string()
    .min(100, 'Sales pitch must be at least 100 characters.'),
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  keywords: z.string().min(3, 'Please enter at least one keyword.'),
  chapters: z.array(chapterSchema).min(1, 'Please add at least one chapter.'),
});

export const languages = ['English', 'Malayalam', 'Hindi'];
export const levels = ['Beginner', 'Intermediate', 'Advanced'];
export const inputStyle =
  'rounded-none h-12 border-gray-300 focus:border-black';
export const gridStyle = 'grid grid-cols-1 md:grid-cols-2 gap-4';
