# Video Library

A simple full-stack application that allows users to browse and manage their video library.

![Screenshot 2025-03-17 at 13 45 46](https://github.com/user-attachments/assets/f0dfac26-f011-44cc-9770-24f045ea3ba2)

## Getting Started

The project is set up as a monorepo, with both the backend and frontend existing in the same repo.
We achieve this by taking advantage of Yarn's built-in support for monorepos.

To get started run the following commands in the root directory:

- `yarn install` to install all dependencies

## Running the Application

### Backend

To run the backend server:

- Run `yarn dev` in the _packages/backend/_ directory OR
- Run `yarn dev:backend` in the root directory

The backend server will be accessible at `localhost:3000`.

### Frontend

To run the frontend server:

- Run `yarn dev` in the _packages/frontend/_ directory OR
- Run `yarn dev:frontend` in the root directory

The backend server will be accessible at `localhost:8080`.

## Features

![Screenshot 2025-03-17 at 14 03 23](https://github.com/user-attachments/assets/17db0162-5c85-49ca-9505-13ec76502b28)

- **Responsive Dashboard**: Modern and elegant grid layout that works on all device sizes
- **Advanced Search & Filtering**:
  - Search by title
  - Filter by date range
  - Tag-based filtering
  - Sorting options (newest/oldest, alphabetical)
- **Video Details**: Rich detail view for each video with metadata and tags
- **Smooth Animations**: Subtle and pleasing animation effects for state transitions
- **Loading States**: Visual feedback during data loading
- **Error Handling**: Graceful error states and recovery

## API Documentation

### Video Object

```typescript
{
  id: string;              // Unique identifier
  title: string;           // Video title
  thumbnail_url: string;   // URL for thumbnail image
  created_at: string;      // ISO date string
  duration: number;        // Duration in seconds
  views: number;           // View count
  tags: string[];          // Array of tag strings
}
```

### API Endpoints

#### GET /api/videos

Returns a list of videos with optional filtering and pagination.

Query Parameters:

- `search` (string): Search term for video titles
- `startDate` (ISO date string): Filter videos created after this date
- `endDate` (ISO date string): Filter videos created before this date
- `tags` (array of strings): Filter videos that have these tags
- `sortBy` (enum: newest, oldest, az, za): Sort order for results
- `page` (number): Page number for pagination
- `limit` (number): Number of results per page

Response:

```json
{
  "data": [/* array of video objects */],
  "pagination": {
    "total": 50,          // Total number of videos matching filters
    "page": 1,            // Current page
    "limit": 12,          // Items per page
    "totalPages": 5       // Total number of pages
  }
}
```

#### GET /api/videos/:id

Returns detailed information for a specific video.

Response:

```json
{
  "id": "v1",
  "title": "Introduction to TypeScript",
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "created_at": "2023-04-15T14:30:00Z",
  "duration": 1845,
  "views": 12503,
  "tags": ["programming", "typescript", "tutorial"]
}
```

#### GET /api/tags

Returns a list of all unique tags in the video library.

Response:

```json
["programming", "typescript", "tutorial", "design", "css", /* etc */]
```

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query
- Framer Motion
