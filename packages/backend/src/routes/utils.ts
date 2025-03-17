import fs from 'fs/promises';
import { dirname, join } from 'path';

export const loadVideosFromFile = async () => {
  const data = await fs.readFile(join(__dirname, '../../public/videos.json'), 'utf-8');
  return JSON.parse(data).videos;
};
