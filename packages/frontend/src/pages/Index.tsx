import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api";
import { Shell, ShellHeader, ShellTitle, ShellContent } from "@/components/Shell";
import VideoGrid from "@/components/VideoGrid";
import FilterBar from "@/components/FilterBar";
import VideoDetailModal from "@/components/VideoDetailModal";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import { SearchX } from "lucide-react";
import { ApiResponse, Video, ApiFilters } from "../../../common";

const ITEMS_PER_PAGE = 12;

const Index = () => {
  // State for filters
  const [filters, setFilters] = useState<ApiFilters>({
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  // State for the selected video
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch available tags
  const { data: tagsResponse } = useQuery<string[]>({
    queryKey: ["tags"],
    queryFn: () => api.getTags(),
  });

  // Fetch videos with filters
  const {
    data: videosResponse,
    isLoading,
    isFetching,
    error,
  } = useQuery<ApiResponse<Video[]>>({
    queryKey: ["videos", filters],
    queryFn: () => api.getVideos(filters),
    // keepPreviousData: true,
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: ApiFilters) => {
    // Reset to page 1 when filters change
    setFilters({ ...newFilters, page: 1, limit: ITEMS_PER_PAGE });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle video click
  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isFiltering = !!(
    filters.search ||
    filters.startDate ||
    filters.endDate ||
    (filters.tags && filters.tags.length > 0)
  );

  return (
    <Shell>
      <ShellHeader>
        <ShellTitle>Video Library</ShellTitle>
        <FilterBar
          onFilterChange={handleFilterChange}
          availableTags={tagsResponse || []}
          loading={isLoading}
        />
      </ShellHeader>

      <ShellContent>
        {error ? (
          <EmptyState
            title="Error loading videos"
            description="We couldn't load the videos. Please try again later."
            action={{
              label: "Try Again",
              onClick: () => window.location.reload(),
            }}
          />
        ) : videosResponse && videosResponse.data.length === 0 ? (
          <EmptyState
            icon={<SearchX className="h-10 w-10 text-muted-foreground" />}
            title={isFiltering ? "No videos match your filters" : "No videos found"}
            description={
              isFiltering
                ? "Try adjusting your search terms or filters."
                : "There are no videos in your library yet."
            }
            action={
              isFiltering
                ? {
                    label: "Clear Filters",
                    onClick: () =>
                      setFilters({ page: 1, limit: ITEMS_PER_PAGE }),
                  }
                : undefined
            }
          />
        ) : (
          <>
            <VideoGrid
              videos={videosResponse?.data || []}
              onVideoClick={handleVideoClick}
              isLoading={isLoading || isFetching}
            />

            {videosResponse && videosResponse.pagination && (
              <Pagination
                currentPage={videosResponse.pagination.page}
                totalPages={videosResponse.pagination.totalPages}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </>
        )}
      </ShellContent>

      <VideoDetailModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Shell>
  );
};

export default Index;
