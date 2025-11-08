import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockSearchSources } from "@/data/mock-data";
import type { SearchResult } from "@/types/search";

export default function SearchPage() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "source";
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10;

    const [searchResults, setSearchResults] = useState<SearchResult | null>(
        null,
    );

    useEffect(() => {
        // Mock API call
        const results = mockSearchSources(query, currentPage, pageSize);
        setSearchResults(results);
    }, [query, currentPage]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
        }).format(date);
    };

    const totalPages = searchResults
        ? Math.ceil(searchResults.total / pageSize)
        : 0;

    const getPaginationUrl = (page: number) => {
        return `/search?q=${encodeURIComponent(query)}&type=${type}&page=${page}`;
    };

    if (!searchResults) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Search Results</h1>
                    <p className="text-muted-foreground">
                        {searchResults.total} results for &quot;{query}&quot;
                    </p>
                </div>

                {/* Results */}
                {searchResults.sources.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">
                            No sources found matching your search
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {searchResults.sources.map((source) => (
                            <Link
                                key={source.id}
                                to={`/source/${source.id}`}
                                className="block border rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="space-y-3">
                                    {/* Title and Version */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl font-semibold hover:text-primary transition-colors">
                                                {source.name}
                                            </h2>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                                <span>
                                                    Version: {source.bdpVersion}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    Last updated:{" "}
                                                    {formatDate(
                                                        source.lastUpdated,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="capitalize"
                                        >
                                            {source.type}
                                        </Badge>
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground line-clamp-2">
                                        {source.description}
                                    </p>

                                    {/* Tags */}
                                    {source.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {source.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t pt-6">
                        <div className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage <= 1}
                                asChild
                            >
                                <Link to={getPaginationUrl(currentPage - 1)}>
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Previous
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage >= totalPages}
                                asChild
                            >
                                <Link to={getPaginationUrl(currentPage + 1)}>
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
