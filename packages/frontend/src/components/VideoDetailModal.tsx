import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatDate, formatDuration, formatViewCount } from "@/lib/utils";
import { X } from "lucide-react";
import { Video } from "../../../common";

interface VideoDetailModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoDetailModal = ({ video, isOpen, onClose }: VideoDetailModalProps) => {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col">
          <div className="relative aspect-video w-full">
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 left-0 p-6">
                <DialogTitle className="text-white text-2xl font-medium mb-2">
                  {video.title}
                </DialogTitle>
                <DialogDescription className="text-white/80">
                  {formatViewCount(video.views)} • {formatDate(video.created_at)}
                </DialogDescription>
              </div>
              <div className="absolute bottom-6 right-6 bg-black/70 text-white px-2 py-1 rounded-md backdrop-blur-sm">
                {formatDuration(video.duration)}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {video.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-secondary text-sm rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-sm max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc,
                vitae aliquam nisl nunc vitae nisl. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl
                nunc vitae nisl.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDetailModal;
