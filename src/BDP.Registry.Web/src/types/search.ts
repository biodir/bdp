import { Source } from "./source";

export interface SearchFilters {
    type: "all" | "source" | "tool";
    query: string;
}

export interface SearchResult {
    sources: Source[];
    total: number;
    page: number;
    pageSize: number;
}
