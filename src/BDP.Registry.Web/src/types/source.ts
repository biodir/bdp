export interface Source {
    id: string;
    name: string;
    description: string;
    sourceVersion: string; // Original source version (e.g., "2024.01", "GRCh38.p14")
    bdpVersion: string; // BDP's own version (e.g., "1.0.0", "1.2.3")
    type: "genome" | "protein" | "variant" | "expression" | "other";
    links: {
        homepage?: string;
        documentation?: string;
        repository?: string;
    };
    lastUpdated: string;
    checksumStatus: "pending" | "verified" | "failed" | "not-checked";
    lastChecksumVerified?: string; // ISO date string
    maintainer: {
        name: string;
        organization: string;
        email?: string;
    };
    license: string;
    citation?: {
        text: string;
        bibtex?: string;
        doi?: string;
    };
    tags: string[];
    downloadStats: {
        total: number;
        lastMonth: number;
        history: Array<{
            date: string; // ISO date string
            count: number;
        }>;
    };
}
