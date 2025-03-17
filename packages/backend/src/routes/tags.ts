import { Request, Response } from 'express';
import { Video } from '../../../common';
import { loadVideosFromFile } from './utils';

export const getTags = async (req: Request, res: Response) => {
  try {
    const videos: Video[] = await loadVideosFromFile();
    const tags = [...new Set(videos.flatMap(v => v.tags))];
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: (error as unknown as any).message });
  }
}
