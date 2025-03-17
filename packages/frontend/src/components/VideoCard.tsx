import { formatDate, formatDuration, formatViewCount } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Video } from "../../../common";

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
  className?: string;
}

const VideoCard = ({ video, onClick, className }: VideoCardProps) => {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-350 hover:shadow-md hover:scale-[1.02] cursor-pointer",
        className
      )}
      onClick={() => onClick(video)}
    >
      <div className="aspect-video relative overflow-hidden rounded-t-xl">
        <img 
          src={video.thumbnail_url} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-450 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
          {formatDuration(video.duration)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-base leading-tight mb-1 line-clamp-2">{video.title}</h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(video.created_at)}</span>
          <span>{formatViewCount(video.views)}</span>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {video.tags.slice(0, 3).map((tag: string) => (
            <span 
              key={tag} 
              className="inline-flex items-center text-xs bg-secondary rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
          {video.tags.length > 3 && (
            <span className="inline-flex items-center text-xs bg-secondary rounded-full px-2 py-0.5">
              +{video.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
