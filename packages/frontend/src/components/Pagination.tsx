import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Calculate range of visible page numbers
  const createPageRange = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const range = [];
    
    // Add first page
    if (startPage > 1) {
      range.push(1);
      if (startPage > 2) range.push('ellipsis-start');
    }
    
    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    
    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) range.push('ellipsis-end');
      range.push(totalPages);
    }

    return range;
  };

  const pageRange = createPageRange();

  return (
    <div className={cn("flex items-center justify-center space-x-1", className)}>
      {/* Previous page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {pageRange.map((page, idx) => {
        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
          return (
            <div key={`${page}-${idx}`} className="flex items-center justify-center w-8 h-8">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          );
        }

        return (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            className={cn(
              "h-8 w-8 font-medium",
              currentPage === page && "bg-primary"
            )}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        );
      })}

      {/* Next page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
