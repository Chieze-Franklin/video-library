import { Request, Response } from 'express';
import { QuerySchema, Video } from '../../../common';
import { loadVideosFromFile } from './utils';

export const getVideos = async (req: Request, res: Response) => {
    try {
        const {
            page,
            limit,
            search,
            sortBy,
            tags,
            startDate,
            endDate
        } = QuerySchema.parse(req.query);
    
        let videos: Video[] = await loadVideosFromFile();
    
        // Apply filters
        if (search) {
          videos = videos.filter(v =>
            v.title.toLowerCase().includes(search.toLowerCase())
          );
        }
    
        if (tags) {
          const tagList = tags.split(',');
          videos = videos.filter(v =>
            tagList.some(tag => v.tags.includes(tag))
          );
        }
    
        if (startDate) {
          videos = videos.filter(v =>
            new Date(v.created_at) >= new Date(startDate)
          );
        }
    
        if (endDate) {
          videos = videos.filter(v =>
            new Date(v.created_at) <= new Date(endDate)
          );
        }
    
        // Apply sorting
        switch (sortBy) {
          case 'newest':
            videos.sort((a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            break;
          case 'oldest':
            videos.sort((a, b) =>
              new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
            break;
          case 'az':
            videos.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'za':
            videos.sort((a, b) => b.title.localeCompare(a.title));
            break;
        }
    
        // Calculate pagination values
        const total = videos.length;
        const totalPages = Math.ceil(total / limit);
    
        // Apply pagination
        const start = (page - 1) * limit;
        const paginatedVideos = videos.slice(start, start + limit);
    
        res.send({
            data: paginatedVideos,
            pagination: {
              total,
              page,
              limit,
              totalPages
            }
        });
    } catch (error) {
        res.status(500).json({ error: (error as unknown as any).message });
    }
}

export const getVideo = async (req: Request, res: Response) => {
    try {
        const videos = await loadVideosFromFile();
        const video = videos.find((v: Video) => v.id === req.params.id);

        if (!video) {
          return res.status(404).json({ error: 'Video not found' });
        }

        res.json(video);
    } catch (error) {
        res.status(500).json({ error: (error as unknown as any).message });
    }
}
