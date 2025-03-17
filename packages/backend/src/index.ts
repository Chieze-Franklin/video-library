import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getTags, getVideos } from "./routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/tags', getTags);
app.get('/api/videos', getVideos);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
