import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useIntlayer } from "react-intlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    ArrowLeft,
    Copy,
    Check,
    ExternalLink,
    Download,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Info,
    TrendingUp,
} from "lucide-react";
import { mockGetSource } from "@/data/mock-data";
import type { Source } from "@/types/source";
import { Area, AreaChart } from "recharts";

const chartConfig = {
    count: {
        label: "Downloads",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function SourceDetailPage() {
    const { id } = useParams();
    const content = useIntlayer("source");

    const [source, setSource] = useState<Source | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (id) {
            const foundSource = mockGetSource(id);
            setSource(foundSource || null);
        }
    }, [id]);

    const handleCopyCommand = () => {
        if (source) {
            const command = `bdp source add ${source.id}`;
            navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
        }).format(date);
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat("en-US").format(num);
    };

    const getTypeColor = (type: string) => {
        const colors = {
            genome: "bg-blue-100 text-blue-800 border-blue-200",
            protein: "bg-purple-100 text-purple-800 border-purple-200",
            variant: "bg-green-100 text-green-800 border-green-200",
            expression: "bg-orange-100 text-orange-800 border-orange-200",
            other: "bg-gray-100 text-gray-800 border-gray-200",
        };
        return colors[type as keyof typeof colors] || colors.other;
    };

    const getChecksumColor = (status: string) => {
        const colors = {
            verified: "bg-green-100 text-green-800 border-green-200",
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            failed: "bg-red-100 text-red-800 border-red-200",
            "not-checked": "bg-gray-100 text-gray-800 border-gray-200",
        };
        return colors[status as keyof typeof colors] || colors["not-checked"];
    };

    const getChecksumIcon = (status: string) => {
        switch (status) {
            case "verified":
                return <CheckCircle className="w-4 h-4" />;
            case "pending":
                return <Clock className="w-4 h-4" />;
            case "failed":
                return <XCircle className="w-4 h-4" />;
            case "not-checked":
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    if (!source) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <h1 className="text-2xl font-bold">{content.notFound}</h1>
                    <Button asChild>
                        <Link to="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {content.backToSearch}
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <TooltipProvider>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Button variant="ghost" asChild className="mb-6">
                        <Link to="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {content.backToSearch}
                        </Link>
                    </Button>

                    {/* Main Layout - Two Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h1 className="text-4xl font-bold mb-2">
                                            {source.name}
                                        </h1>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge
                                                variant="outline"
                                                className={`capitalize ${getTypeColor(source.type)}`}
                                            >
                                                {source.type}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">
                                                v{source.sourceVersion}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                •
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                BDP v{source.bdpVersion}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-lg text-muted-foreground leading-relaxed">
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

                            {/* Installation */}
                            <div className="border rounded-lg p-6 space-y-4">
                                <h2 className="text-2xl font-semibold">
                                    {content.installation.title}
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 bg-muted px-4 py-3 rounded-md font-mono text-sm">
                                            bdp source add {source.id}
                                        </code>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleCopyCommand}
                                        >
                                            {copied ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                    {copied && (
                                        <p className="text-sm text-green-600">
                                            {content.installation.copied}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground italic">
                                        {content.installation.note}
                                    </p>
                                </div>
                            </div>

                            {/* Citation */}
                            {source.citation && (
                                <div className="border rounded-lg p-6 space-y-4">
                                    <h2 className="text-2xl font-semibold">
                                        {content.citation.title}
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="bg-muted p-4 rounded-md">
                                            <p className="text-sm">
                                                {source.citation.text}
                                            </p>
                                        </div>
                                        {source.citation.doi && (
                                            <div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    {content.citation.doi}:{" "}
                                                </span>
                                                <a
                                                    href={`https://doi.org/${source.citation.doi}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-primary hover:underline"
                                                >
                                                    {source.citation.doi}
                                                </a>
                                            </div>
                                        )}
                                        {source.citation.bibtex && (
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                                    {content.citation.bibtex}
                                                </p>
                                                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                                                    <code>
                                                        {source.citation.bibtex}
                                                    </code>
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sticky Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 space-y-4">
                                {/* Download Stats with Graph */}
                                <div className="border rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold flex items-center gap-2">
                                            <Download className="w-4 h-4" />
                                            {content.stats.title}
                                        </h3>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-2xl font-bold">
                                                {formatNumber(
                                                    source.downloadStats.total,
                                                )}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {content.stats.total}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                {formatNumber(
                                                    source.downloadStats
                                                        .lastMonth,
                                                )}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {content.stats.lastMonth}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Download History Graph */}
                                    <div className="h-24 mt-2">
                                        <ChartContainer
                                            config={chartConfig}
                                            className="h-full w-full"
                                        >
                                            <AreaChart
                                                data={
                                                    source.downloadStats.history
                                                }
                                                margin={{
                                                    top: 0,
                                                    right: 0,
                                                    left: 0,
                                                    bottom: 0,
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient
                                                        id="fillCount"
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="1"
                                                    >
                                                        <stop
                                                            offset="5%"
                                                            stopColor="var(--color-count)"
                                                            stopOpacity={0.8}
                                                        />
                                                        <stop
                                                            offset="95%"
                                                            stopColor="var(--color-count)"
                                                            stopOpacity={0.1}
                                                        />
                                                    </linearGradient>
                                                </defs>
                                                <ChartTooltip
                                                    content={
                                                        <ChartTooltipContent
                                                            labelFormatter={(
                                                                value,
                                                            ) => {
                                                                return new Date(
                                                                    value,
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                    },
                                                                );
                                                            }}
                                                        />
                                                    }
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="count"
                                                    stroke="var(--color-count)"
                                                    strokeWidth={2}
                                                    fill="url(#fillCount)"
                                                />
                                            </AreaChart>
                                        </ChartContainer>
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center">
                                        {content.stats.trend}
                                    </p>
                                </div>

                                {/* Quick Info */}
                                <div className="border rounded-lg p-4 space-y-3">
                                    <h3 className="text-sm font-semibold">
                                        {content.details.title}
                                    </h3>
                                    <dl className="space-y-3 text-sm">
                                        <div>
                                            <dt className="text-xs text-muted-foreground mb-1">
                                                {content.details.bdpVersion}
                                            </dt>
                                            <dd className="font-mono font-semibold">
                                                {source.bdpVersion}
                                            </dd>
                                            <dd className="text-xs text-muted-foreground mt-0.5">
                                                {content.details.versionMapping}{" "}
                                                {source.sourceVersion}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs text-muted-foreground mb-1">
                                                {content.details.license}
                                            </dt>
                                            <dd className="font-medium">
                                                {source.license}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs text-muted-foreground mb-1">
                                                {content.details.lastUpdated}
                                            </dt>
                                            <dd className="text-xs">
                                                {formatDate(source.lastUpdated)}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                                {content.details.checksumStatus}
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="w-3 h-3 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="max-w-xs">
                                                        <p className="text-xs">
                                                            {
                                                                content.checksum
                                                                    .tooltip
                                                            }
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </dt>
                                            <dd>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${getChecksumColor(source.checksumStatus)}`}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        {getChecksumIcon(
                                                            source.checksumStatus,
                                                        )}
                                                        {
                                                            content.checksum[
                                                                source
                                                                    .checksumStatus
                                                            ]
                                                        }
                                                    </span>
                                                </Badge>
                                                {source.lastChecksumVerified && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {
                                                            content.details
                                                                .lastVerified
                                                        }
                                                        :{" "}
                                                        {formatDateTime(
                                                            source.lastChecksumVerified,
                                                        )}
                                                    </p>
                                                )}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Maintainer */}
                                <div className="border rounded-lg p-4 space-y-3">
                                    <h3 className="text-sm font-semibold">
                                        {content.maintainer.title}
                                    </h3>
                                    <div className="text-sm space-y-1">
                                        <p className="font-medium">
                                            {source.maintainer.name}
                                        </p>
                                        <p className="text-muted-foreground">
                                            {source.maintainer.organization}
                                        </p>
                                        {source.maintainer.email && (
                                            <p className="text-xs text-muted-foreground">
                                                {source.maintainer.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Links */}
                                {(source.links.homepage ||
                                    source.links.documentation ||
                                    source.links.repository) && (
                                    <div className="border rounded-lg p-4 space-y-3">
                                        <h3 className="text-sm font-semibold">
                                            {content.links.title}
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                            {source.links.homepage && (
                                                <a
                                                    href={source.links.homepage}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-primary hover:underline"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    {content.links.homepage}
                                                </a>
                                            )}
                                            {source.links.documentation && (
                                                <a
                                                    href={
                                                        source.links
                                                            .documentation
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-primary hover:underline"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    {
                                                        content.links
                                                            .documentation
                                                    }
                                                </a>
                                            )}
                                            {source.links.repository && (
                                                <a
                                                    href={
                                                        source.links.repository
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-primary hover:underline"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    {content.links.repository}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}
