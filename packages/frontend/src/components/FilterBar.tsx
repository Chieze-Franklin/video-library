import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar as CalendarIcon, X, Filter } from "lucide-react";
import { cn, debounce } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ApiFilters } from "../../../common";

interface FilterBarProps {
  onFilterChange: (filters: ApiFilters) => void;
  availableTags: string[];
  loading?: boolean;
}

export function FilterBar({
  onFilterChange,
  availableTags,
  loading = false,
}: FilterBarProps) {
  const isMobile = useIsMobile();
  
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az" | "za">("newest");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Debounced search handler
  const debouncedSearchHandler = debounce((value: string) => {
    setSearch(value);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchHandler(e.target.value);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setDateFrom(undefined);
    setDateTo(undefined);
    setSelectedTags([]);
    setSortBy("newest");
    
    // Reset the input value
    const searchInput = document.querySelector('input[name="search"]') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    
    onFilterChange({
      search: "",
      startDate: undefined,
      endDate: undefined,
      tags: [],
      sortBy: "newest",
    });
  };

  // Update filters when any filter changes
  useEffect(() => {
    onFilterChange({
      search,
      startDate: dateFrom?.toISOString(),
      endDate: dateTo?.toISOString(),
      tags: selectedTags,
      sortBy,
    });
  }, [search, dateFrom, dateTo, selectedTags, sortBy, onFilterChange]);

  const hasActiveFilters =
    search || dateFrom || dateTo || selectedTags.length > 0 || sortBy !== "newest";

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            name="search"
            placeholder="Search videos..."
            className="pl-10 bg-background h-10"
            onChange={handleSearchChange}
            disabled={loading}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex gap-2">
          {isMobile ? (
            <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 px-3 flex items-center gap-2"
                  disabled={loading}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      {(selectedTags.length > 0 ? 1 : 0) +
                        (dateFrom || dateTo ? 1 : 0) +
                        (sortBy !== "newest" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 p-4"
                align="end"
              >
                {renderFiltersContent()}
              </PopoverContent>
            </Popover>
          ) : (
            <>
              {/* Date filter - Desktop */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 px-3 flex items-center gap-2",
                      (dateFrom || dateTo) &&
                        "border-primary/50 bg-primary/5"
                    )}
                    disabled={loading}
                  >
                    <CalendarIcon className="h-4 w-4" />
                    <span>Date</span>
                    {(dateFrom || dateTo) && (
                      <Badge
                        variant="secondary"
                        className="ml-1 h-5 rounded-full"
                      >
                        {dateFrom && dateTo
                          ? "Range"
                          : dateFrom
                          ? "From"
                          : "To"}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 flex flex-col md:flex-row"
                  align="start"
                >
                  <div className="p-3 border-b md:border-b-0 md:border-r">
                    <div className="font-medium mb-2">From</div>
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      disabled={(date: Date) =>
                        dateTo ? date > dateTo : false
                      }
                    />
                  </div>
                  <div className="p-3">
                    <div className="font-medium mb-2">To</div>
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      disabled={(date: Date) =>
                        dateFrom ? date < dateFrom : false
                      }
                    />
                  </div>
                </PopoverContent>
              </Popover>

              {/* Tags filter - Desktop */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 px-3 flex items-center gap-2",
                      selectedTags.length > 0 &&
                        "border-primary/50 bg-primary/5"
                    )}
                    disabled={loading}
                  >
                    <span>Tags</span>
                    {selectedTags.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-1 h-5 rounded-full"
                      >
                        {selectedTags.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-72 p-4 max-h-80 overflow-auto"
                  align="start"
                >
                  <div className="space-y-2">
                    <h4 className="font-medium">Select Tags</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={
                            selectedTags.includes(tag)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Sort dropdown - Desktop */}
              <div className="flex items-center gap-2">
                <Select
                  value={sortBy}
                  onValueChange={(value: string) =>
                    setSortBy(value as "newest" | "oldest" | "az" | "za")
                  }
                  disabled={loading}
                >
                  <SelectTrigger className="h-10 w-[130px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Clear filters button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearFilters}
              className="h-10 w-10"
              disabled={loading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Selected tags display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );

  function renderFiltersContent() {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date-from">Date Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="date-from" className="text-xs">
                From
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-from"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    {dateFrom ? (
                      <span>
                        {dateFrom.toLocaleDateString()}
                      </span>
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    disabled={(date: Date) =>
                      dateTo ? date > dateTo : false
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="date-to" className="text-xs">
                To
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-to"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    {dateTo ? (
                      <span>
                        {dateTo.toLocaleDateString()}
                      </span>
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                    disabled={(date: Date) =>
                      dateFrom ? date < dateFrom : false
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={
                  selectedTags.includes(tag) ? "default" : "outline"
                }
                className="cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort-by">Sort by</Label>
          <Select
            value={sortBy}
            onValueChange={(value: string) =>
              setSortBy(value as "newest" | "oldest" | "az" | "za")
            }
          >
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2 flex justify-between">
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            size="sm"
          >
            Clear filters
          </Button>
          <Button
            onClick={() => setIsFiltersOpen(false)}
            size="sm"
          >
            Apply
          </Button>
        </div>
      </div>
    );
  }
}

export default FilterBar;
