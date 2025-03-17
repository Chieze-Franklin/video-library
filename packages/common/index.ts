import { z } from 'zod';

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  duration: number;
  views: number;
  tags: string[];
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'newest' | 'oldest' | 'az' | 'za';
  tags?: string[];
  startDate?: string;
  endDate?: string;
}

export const QuerySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('12'),
  search: z.string().optional(),
  sortBy: z.enum(['newest', 'oldest', 'az', 'za']).default('newest'),
  tags: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
