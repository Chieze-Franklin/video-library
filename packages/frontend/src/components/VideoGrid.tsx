import { cn } from "@/lib/utils";
import VideoCard from "./VideoCard";
import { motion } from "framer-motion";
import { Video } from "../../../common";

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
  className?: string;
  isLoading?: boolean;
}

const VideoGrid = ({
  videos,
  onVideoClick,
  className,
  isLoading = false,
}: VideoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className
      )}
    >
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <VideoSkeleton key={index} index={index} />
          ))
        : videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.05 * (Number(video.id.replace('v', '')) % 12),
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <VideoCard video={video} onClick={onVideoClick} />
            </motion.div>
          ))}
    </div>
  );
};

const VideoSkeleton = ({ index }: { index: number }) => (
  <div
    className={cn(
      "rounded-xl bg-card border border-border/50 shadow-sm overflow-hidden",
      "animate-pulse-subtle"
    )}
    style={{
      animationDelay: `${index * 100}ms`,
    }}
  >
    <div className="aspect-video bg-muted" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-muted rounded-md w-3/4" />
      <div className="h-4 bg-muted rounded-md w-1/2" />
      <div className="pt-2 flex gap-1">
        <div className="h-5 bg-muted rounded-full w-16" />
        <div className="h-5 bg-muted rounded-full w-14" />
      </div>
    </div>
  </div>
);

export default VideoGrid;
