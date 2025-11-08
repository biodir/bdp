export type HealthStatus = "operational" | "degraded" | "down";
export type JobStatus = "running" | "idle" | "error";

export interface UptimeDataPoint {
    date: string; // ISO date string
    status: HealthStatus;
}

export interface SourceSyncJob {
    name: string;
    status: JobStatus;
    lastRun: string; // ISO datetime with timezone
    nextRun: string; // ISO datetime with timezone
}

export interface SystemHealth {
    api: {
        status: HealthStatus;
        latency: number;
        lastCheck: string; // ISO datetime with timezone
        uptime: UptimeDataPoint[]; // Last 90 days
    };
    jobs: {
        checksumVerification: {
            status: JobStatus;
            lastRun: string; // ISO datetime with timezone
            nextRun: string; // ISO datetime with timezone
            processed: number;
            total: number;
            uptime: UptimeDataPoint[]; // Last 90 days
        };
        sourceSync: {
            status: JobStatus;
            lastRun: string; // ISO datetime with timezone
            nextRun: string; // ISO datetime with timezone
            uptime: UptimeDataPoint[]; // Last 90 days
            sources: {
                uniprot: SourceSyncJob;
                ensembl: SourceSyncJob;
                ncbi: SourceSyncJob;
                gencode: SourceSyncJob;
            };
        };
    };
}
