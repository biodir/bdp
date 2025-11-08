export interface SystemHealth {
    api: {
        status: "operational" | "degraded" | "down";
        latency: number;
        lastCheck: string;
    };
    jobs: {
        checksumVerification: {
            status: "running" | "idle" | "error";
            lastRun: string;
            nextRun: string;
            processed: number;
            total: number;
        };
        sourceSync: {
            status: "running" | "idle" | "error";
            lastRun: string;
            nextRun: string;
        };
    };
}
