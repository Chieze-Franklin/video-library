import { Request, Response } from 'express';
import { Video } from '../../../common';
import { loadVideosFromFile } from './utils';

export const getVideos = async (req: Request, res: Response) => {
    const videos: Video[] = await loadVideosFromFile();
    res.send(videos);
}
