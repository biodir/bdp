import { SearchResult } from "@/types/search";
import { Source } from "@/types/source";
import { SystemHealth } from "@/types/system-health";

// Helper to generate download history for last 30 days
const generateDownloadHistory = (baseCount: number, variance: number = 0.3) => {
    const history = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Generate somewhat realistic varying numbers
        const randomFactor = 1 + (Math.random() - 0.5) * variance;
        const trendFactor = 1 + (i / 30) * 0.2; // Slight upward trend
        const count = Math.floor(baseCount * randomFactor * trendFactor);

        history.push({
            date: date.toISOString().split("T")[0],
            count: count,
        });
    }

    return history;
};

// Mock sources data
export const mockSources: Source[] = [
    {
        id: "uniprot-2024.01",
        name: "UniProt",
        description:
            "Universal Protein Resource - comprehensive database of protein sequence and functional information",
        sourceVersion: "2024.01",
        bdpVersion: "1.0.0",
        type: "protein",
        links: {
            homepage: "https://www.uniprot.org",
            documentation: "https://www.uniprot.org/help",
            repository: "https://ftp.uniprot.org",
        },
        lastUpdated: "2024-01-15T10:30:00Z",
        checksumStatus: "verified",
        lastChecksumVerified: "2024-02-04T14:22:00Z",
        maintainer: {
            name: "UniProt Consortium",
            organization: "EMBL-EBI",
            email: "help@uniprot.org",
        },
        license: "CC BY 4.0",
        citation: {
            text: "The UniProt Consortium. UniProt: the Universal Protein Knowledgebase in 2024. Nucleic Acids Res. 2024.",
            doi: "10.1093/nar/gkad1234",
            bibtex: "@article{uniprot2024,\n  title={UniProt: the Universal Protein Knowledgebase in 2024},\n  author={The UniProt Consortium},\n  journal={Nucleic Acids Research},\n  year={2024}\n}",
        },
        tags: ["protein", "sequence", "annotation", "functional"],
        downloadStats: {
            total: 15420,
            lastMonth: 892,
            history: generateDownloadHistory(30, 0.4),
        },
    },
    {
        id: "grch38-p14",
        name: "Human Genome GRCh38.p14",
        description:
            "Genome Reference Consortium Human Build 38 patch release 14 - the latest human reference genome assembly",
        sourceVersion: "GRCh38.p14",
        bdpVersion: "1.0.2",
        type: "genome",
        links: {
            homepage: "https://www.ncbi.nlm.nih.gov/assembly/GCF_000001405.40",
            documentation: "https://www.ncbi.nlm.nih.gov/grc/human",
        },
        lastUpdated: "2023-11-20T14:15:00Z",
        checksumStatus: "verified",
        lastChecksumVerified: "2024-02-03T08:15:00Z",
        maintainer: {
            name: "Genome Reference Consortium",
            organization: "NCBI",
        },
        license: "Public Domain",
        citation: {
            text: "Genome Reference Consortium. GRCh38.p14 - Genome Reference Consortium Human Build 38. 2023.",
        },
        tags: ["genome", "human", "reference", "assembly"],
        downloadStats: {
            total: 8234,
            lastMonth: 445,
            history: generateDownloadHistory(15, 0.3),
        },
    },
    {
        id: "ensembl-111",
        name: "Ensembl Release 111",
        description:
            "Comprehensive genome annotation including genes, transcripts, and regulatory features across multiple species",
        sourceVersion: "111",
        bdpVersion: "1.1.0",
        type: "genome",
        links: {
            homepage: "https://www.ensembl.org",
            documentation: "https://www.ensembl.org/info/docs/",
            repository: "https://ftp.ensembl.org/pub/release-111/",
        },
        lastUpdated: "2024-01-10T08:00:00Z",
        checksumStatus: "pending",
        maintainer: {
            name: "Ensembl Team",
            organization: "EMBL-EBI",
            email: "helpdesk@ensembl.org",
        },
        license: "Apache 2.0",
        citation: {
            text: "Cunningham F, et al. Ensembl 2024. Nucleic Acids Res. 2024.",
            doi: "10.1093/nar/gkad1089",
        },
        tags: ["genome", "annotation", "multi-species", "genes"],
        downloadStats: {
            total: 12567,
            lastMonth: 678,
            history: generateDownloadHistory(23, 0.35),
        },
    },
    {
        id: "clinvar-2024.02",
        name: "ClinVar",
        description:
            "Public archive of reports of relationships among human variations and phenotypes with supporting evidence",
        sourceVersion: "2024.02",
        bdpVersion: "1.0.1",
        type: "variant",
        links: {
            homepage: "https://www.ncbi.nlm.nih.gov/clinvar/",
            documentation: "https://www.ncbi.nlm.nih.gov/clinvar/docs/",
        },
        lastUpdated: "2024-02-01T12:00:00Z",
        checksumStatus: "not-checked",
        maintainer: {
            name: "ClinVar Team",
            organization: "NCBI",
        },
        license: "Public Domain",
        citation: {
            text: "Landrum MJ, et al. ClinVar: improvements to accessing data. Nucleic Acids Res. 2024.",
            doi: "10.1093/nar/gkz1031",
        },
        tags: ["variant", "clinical", "phenotype", "disease"],
        downloadStats: {
            total: 6789,
            lastMonth: 412,
            history: generateDownloadHistory(14, 0.4),
        },
    },
    {
        id: "gtex-v8",
        name: "GTEx V8",
        description:
            "Genotype-Tissue Expression project - comprehensive resource for studying tissue-specific gene expression and regulation",
        sourceVersion: "v8",
        bdpVersion: "1.0.0",
        type: "expression",
        links: {
            homepage: "https://gtexportal.org",
            documentation: "https://gtexportal.org/home/documentationPage",
        },
        lastUpdated: "2023-09-15T16:45:00Z",
        checksumStatus: "failed",
        lastChecksumVerified: "2024-02-01T09:30:00Z",
        maintainer: {
            name: "GTEx Consortium",
            organization: "Broad Institute",
        },
        license: "dbGaP Authorized Access",
        citation: {
            text: "The GTEx Consortium. The GTEx Consortium atlas of genetic regulatory effects across human tissues. Science. 2020.",
            doi: "10.1126/science.aaz1776",
        },
        tags: ["expression", "tissue", "regulation", "eQTL"],
        downloadStats: {
            total: 4532,
            lastMonth: 234,
            history: generateDownloadHistory(8, 0.5),
        },
    },
    {
        id: "pfam-35.0",
        name: "Pfam",
        description:
            "Database of protein families represented by multiple sequence alignments and hidden Markov models",
        sourceVersion: "35.0",
        bdpVersion: "1.0.0",
        type: "protein",
        links: {
            homepage: "https://pfam.xfam.org",
            documentation: "https://pfam-docs.readthedocs.io",
        },
        lastUpdated: "2023-10-30T09:20:00Z",
        checksumStatus: "verified",
        lastChecksumVerified: "2024-02-05T11:45:00Z",
        maintainer: {
            name: "Pfam Team",
            organization: "EMBL-EBI",
        },
        license: "CC0 1.0",
        citation: {
            text: "Mistry J, et al. Pfam: The protein families database in 2021. Nucleic Acids Res. 2021.",
            doi: "10.1093/nar/gkaa913",
        },
        tags: ["protein", "families", "domains", "hmm"],
        downloadStats: {
            total: 9876,
            lastMonth: 523,
            history: generateDownloadHistory(18, 0.3),
        },
    },
];

// Mock system health
export const mockSystemHealth: SystemHealth = {
    api: {
        status: "operational",
        latency: 45,
        lastCheck: new Date().toISOString(),
    },
    jobs: {
        checksumVerification: {
            status: "running",
            lastRun: "2024-02-05T08:30:00Z",
            nextRun: "2024-02-05T20:30:00Z",
            processed: 145,
            total: 200,
        },
        sourceSync: {
            status: "idle",
            lastRun: "2024-02-05T06:00:00Z",
            nextRun: "2024-02-06T06:00:00Z",
        },
    },
};

// Mock API functions
export const mockSearchSources = (
    query: string,
    page: number = 1,
    pageSize: number = 10,
): SearchResult => {
    const filteredSources = query
        ? mockSources.filter(
              (source) =>
                  source.name.toLowerCase().includes(query.toLowerCase()) ||
                  source.description
                      .toLowerCase()
                      .includes(query.toLowerCase()) ||
                  source.tags.some((tag) =>
                      tag.toLowerCase().includes(query.toLowerCase()),
                  ),
          )
        : mockSources;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedSources = filteredSources.slice(start, end);

    return {
        sources: paginatedSources,
        total: filteredSources.length,
        page,
        pageSize,
    };
};

export const mockGetSource = (id: string): Source | undefined => {
    return mockSources.find((source) => source.id === id);
};

export const mockGetSystemHealth = (): SystemHealth => {
    return mockSystemHealth;
};

export const mockGetSearchSuggestions = (query: string): string[] => {
    if (!query || query.length < 2) return [];

    const suggestions = new Set<string>();

    mockSources.forEach((source) => {
        if (source.name.toLowerCase().includes(query.toLowerCase())) {
            suggestions.add(source.name);
        }
        source.tags.forEach((tag) => {
            if (tag.toLowerCase().includes(query.toLowerCase())) {
                suggestions.add(tag);
            }
        });
    });

    return Array.from(suggestions).slice(0, 5);
};
