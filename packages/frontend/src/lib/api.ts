import axios from 'axios';
import { Video, ApiResponse, ApiFilters } from '../../../common';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const getVideos = async (filters: ApiFilters = {}): Promise<ApiResponse<Video[]>> => {
  const params = new URLSearchParams();

  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.search) params.append('search', filters.search);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.tags?.length) params.append('tags', filters.tags.join(','));
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);

  const { data } = await api.get<ApiResponse<Video[]>>('/videos', { params });
  return data;
};

export const getVideo = async (id: string): Promise<Video> => {
  const { data } = await api.get<Video>(`/videos/${id}`);
  return data;
};

export const getTags = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/tags');
  return data;
};
