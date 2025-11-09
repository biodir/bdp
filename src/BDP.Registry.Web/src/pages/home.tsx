"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useIntlayer } from "react-intlayer";
import { Search, ChevronRight, Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import {
    mockGetSystemHealth,
    mockGetSearchSuggestions,
} from "@/data/mock-data";
import type { SystemHealth } from "@/types/system-health";
import { Route } from "../+types/root";

interface ExampleItem {
    value: string;
}

interface InstallCommand {
    value: string;
}

export async function clientLoader() {
    return { title: "Home" };
}

const Home: React.FC<Route.ComponentProps> = ({ loaderData }) => {
    void loaderData;

    const { hero, gettingStarted, why, search, health } = useIntlayer("home");

    const examples: ExampleItem[] = gettingStarted.examples as ExampleItem[];
    const unixInstall = gettingStarted.unix.install as InstallCommand;
    const windowsInstall = gettingStarted.windows.install as InstallCommand;

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterType, setFilterType] = useState<"all" | "source" | "tool">(
        "source",
    );
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
    const [platform, setPlatform] = useState<"unix" | "windows">("unix");
    const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        setSystemHealth(mockGetSystemHealth());
    }, []);

    useEffect(() => {
        if (searchQuery.length >= 2) {
            const results = mockGetSearchSuggestions(searchQuery);
            setSuggestions(results);
            setShowSuggestions(results.length > 0);
        } else {
            setShowSuggestions(false);
        }
    }, [searchQuery]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(
                `/search?q=${encodeURIComponent(searchQuery)}&type=${filterType}`,
            );
        }
    };

    const handleCopy = (cmd: string) => {
        navigator.clipboard.writeText(cmd);
        setCopiedCmd(cmd);
        setTimeout(() => setCopiedCmd(null), 1500);
    };

    const getColor = (status: string) => {
        switch (status) {
            case "operational":
            case "idle":
                return "bg-green-500";
            case "degraded":
            case "running":
                return "bg-yellow-500";
            case "down":
            case "error":
                return "bg-red-500";
            default:
                return "bg-gray-400";
        }
    };

    const currentInstallCommand =
        platform === "unix" ? unixInstall.value : windowsInstall.value;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-background to-muted/20">
            <section className="pt-32 pb-20 text-center w-full max-w-3xl mx-auto px-4 sm:px-6">
                <h1 className="text-5xl font-bold mb-2">{hero.title}</h1>
                <p className="text-muted-foreground mb-8 text-lg">
                    {hero.subtitle}
                </p>

                <form
                    onSubmit={handleSearch}
                    className="relative"
                    ref={formRef}
                >
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            placeholder={search.placeholder.value}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-44 h-14 text-base sm:text-lg shadow-sm rounded-2xl w-full"
                        />

                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 items-center">
                            <Select
                                defaultValue={filterType}
                                onValueChange={(v: string) =>
                                    setFilterType(
                                        v as "all" | "source" | "tool",
                                    )
                                }
                            >
                                <SelectTrigger className="w-[90px] sm:w-[110px] h-9 text-xs sm:text-sm bg-muted/70 rounded-md cursor-pointer">
                                    <SelectValue
                                        placeholder={search.filter.source}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="source">
                                        {search.filter.source}
                                    </SelectItem>
                                    <SelectItem value="tool">
                                        {search.filter.tool}
                                    </SelectItem>
                                    <SelectItem value="all">
                                        {search.filter.all}
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                type="submit"
                                size="sm"
                                className="h-9 px-3 sm:px-4 rounded-md text-xs sm:text-sm"
                            >
                                {search.button}
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {showSuggestions && (
                        <div className="absolute w-full mt-2 bg-background border rounded-md shadow-lg z-10">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setSearchQuery(s);
                                        setShowSuggestions(false);
                                        navigate(
                                            `/search?q=${encodeURIComponent(s)}&type=${filterType}`,
                                        );
                                    }}
                                    className="block w-full px-4 py-2 text-left hover:bg-accent transition"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </form>
            </section>

            <section className="w-full max-w-5xl text-center mb-24 px-4 sm:px-6">
                <h2 className="text-3xl font-semibold mb-4">
                    {gettingStarted.title}
                </h2>
                <p className="text-muted-foreground mb-8">
                    {gettingStarted.description}
                </p>

                <div className="max-w-2xl mx-auto rounded-xl overflow-hidden shadow-md text-left border bg-card">
                    <div className="flex items-center justify-between bg-muted px-3 py-2">
                        <Tabs
                            defaultValue="unix"
                            value={platform}
                            onValueChange={(v: string) =>
                                setPlatform(v as "unix" | "windows")
                            }
                        >
                            <TabsList className="bg-transparent space-x-2">
                                <TabsTrigger
                                    value="unix"
                                    className="cursor-pointer text-muted-foreground data-[state=active]:text-foreground"
                                >
                                    {gettingStarted.unix.label}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="windows"
                                    className="cursor-pointer text-muted-foreground data-[state=active]:text-foreground"
                                >
                                    {gettingStarted.windows.label}
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="px-4 py-3 font-mono text-sm transition-colors bg-muted/50 text-foreground">
                        <div className="flex items-center justify-between group">
                            <span>
                                ${" "}
                                {platform === "unix"
                                    ? unixInstall.value
                                    : windowsInstall.value}
                            </span>
                            <button
                                onClick={() =>
                                    handleCopy(currentInstallCommand)
                                }
                                className="opacity-0 group-hover:opacity-100 transition text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                {copiedCmd === currentInstallCommand ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </button>
                        </div>

                        <div className="mt-3 space-y-2">
                            {examples.map((item, i: number) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between group"
                                >
                                    <span>&gt; {item.value}</span>
                                    <button
                                        onClick={() => handleCopy(item.value)}
                                        className="opacity-0 group-hover:opacity-100 transition text-muted-foreground hover:text-foreground cursor-pointer"
                                    >
                                        {copiedCmd === item.value ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full max-w-6xl mb-24 text-center px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                    {why.title}
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg mb-12 max-w-3xl mx-auto">
                    {why.subtitle}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {why.useCases.map(
                        (
                            useCase: {
                                icon: string;
                                title: string;
                                description: string;
                            },
                            i: number,
                        ) => (
                            <Card
                                key={i}
                                className="p-5 sm:p-6 text-left hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="text-3xl sm:text-4xl mb-3">
                                    {useCase.icon}
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold mb-2">
                                    {useCase.title}
                                </h3>
                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                    {useCase.description}
                                </p>
                            </Card>
                        ),
                    )}
                </div>
            </section>

            {systemHealth && (
                <section className="w-full max-w-6xl pb-20 px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                            {health.title}
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg">
                            {health.subtitle}
                        </p>
                    </div>

                    {/* API Health */}
                    <Card className="p-4 sm:p-6 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-3 h-3 rounded-full ${getColor(systemHealth.api.status)}`}
                                />
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {health.api.label}
                                </h3>
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                                {health.uptime}
                            </div>
                        </div>
                        <div className="flex gap-1 mb-3 overflow-x-auto pb-2">
                            {systemHealth.api.uptime.map((point, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-8 sm:w-3 sm:h-10 rounded-sm ${getColor(point.status)} flex-shrink-0`}
                                    title={`${point.date}: ${point.status}`}
                                />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span>
                                {health.api.latency}: {systemHealth.api.latency}
                                ms
                            </span>
                            <span>•</span>
                            <span>
                                Last check:{" "}
                                {new Date(
                                    systemHealth.api.lastCheck,
                                ).toLocaleString("en-US", {
                                    timeZone:
                                        Intl.DateTimeFormat().resolvedOptions()
                                            .timeZone,
                                    dateStyle: "short",
                                    timeStyle: "short",
                                })}{" "}
                                {
                                    Intl.DateTimeFormat().resolvedOptions()
                                        .timeZone
                                }
                            </span>
                        </div>
                    </Card>

                    {/* Checksum Verification Job */}
                    <Card className="p-4 sm:p-6 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-3 h-3 rounded-full ${getColor(systemHealth.jobs.checksumVerification.status)}`}
                                />
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {health.jobs.checksumVerification}
                                </h3>
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                                {health.uptime}
                            </div>
                        </div>
                        <div className="flex gap-1 mb-3 overflow-x-auto pb-2">
                            {systemHealth.jobs.checksumVerification.uptime.map(
                                (point, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-8 sm:w-3 sm:h-10 rounded-sm ${getColor(point.status === "operational" ? "idle" : point.status)} flex-shrink-0`}
                                        title={`${point.date}: ${point.status}`}
                                    />
                                ),
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm text-muted-foreground">
                            <span>
                                {health.jobs.lastRun}:{" "}
                                {new Date(
                                    systemHealth.jobs.checksumVerification.lastRun,
                                ).toLocaleString("en-US", {
                                    timeZone:
                                        Intl.DateTimeFormat().resolvedOptions()
                                            .timeZone,
                                    dateStyle: "short",
                                    timeStyle: "short",
                                })}
                            </span>
                            <span>
                                {health.jobs.nextRun}:{" "}
                                {new Date(
                                    systemHealth.jobs.checksumVerification.nextRun,
                                ).toLocaleString("en-US", {
                                    timeZone:
                                        Intl.DateTimeFormat().resolvedOptions()
                                            .timeZone,
                                    dateStyle: "short",
                                    timeStyle: "short",
                                })}
                            </span>
                            <span>
                                {health.jobs.progress}:{" "}
                                {
                                    systemHealth.jobs.checksumVerification
                                        .processed
                                }
                                /{systemHealth.jobs.checksumVerification.total}
                            </span>
                            <span className="hidden sm:block">
                                {
                                    Intl.DateTimeFormat().resolvedOptions()
                                        .timeZone
                                }
                            </span>
                        </div>
                    </Card>

                    {/* Source Synchronization */}
                    <Card className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-3 h-3 rounded-full ${getColor(systemHealth.jobs.sourceSync.status)}`}
                                />
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {health.jobs.sourceSync.label}
                                </h3>
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                                {health.uptime}
                            </div>
                        </div>
                        <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
                            {systemHealth.jobs.sourceSync.uptime.map(
                                (point, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-8 sm:w-3 sm:h-10 rounded-sm ${getColor(point.status === "operational" ? "idle" : point.status)} flex-shrink-0`}
                                        title={`${point.date}: ${point.status}`}
                                    />
                                ),
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                            {Object.entries(
                                systemHealth.jobs.sourceSync.sources,
                            ).map(([key, source]) => (
                                <div
                                    key={key}
                                    className="border rounded-lg p-3 sm:p-4"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${getColor(source.status)}`}
                                        />
                                        <h4 className="font-medium text-sm sm:text-base">
                                            {
                                                health.jobs.sourceSync.sources[
                                                    key as keyof typeof health.jobs.sourceSync.sources
                                                ]
                                            }
                                        </h4>
                                    </div>
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        <p className="truncate">
                                            {health.jobs.lastRun}:{" "}
                                            {new Date(
                                                source.lastRun,
                                            ).toLocaleString("en-US", {
                                                timeZone:
                                                    Intl.DateTimeFormat().resolvedOptions()
                                                        .timeZone,
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <p className="truncate">
                                            {health.jobs.nextRun}:{" "}
                                            {new Date(
                                                source.nextRun,
                                            ).toLocaleString("en-US", {
                                                timeZone:
                                                    Intl.DateTimeFormat().resolvedOptions()
                                                        .timeZone,
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            )}
        </div>
    );
};

export default Home;
