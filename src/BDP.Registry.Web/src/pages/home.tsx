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
                            onValueChange={(v: string) => setPlatform(v as "unix" | "windows")}
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

            <section className="w-full max-w-5xl mb-24 text-center px-4 sm:px-6">
                <h2 className="text-3xl font-semibold mb-6">{why.title}</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {why.points.map((p: string, i: number) => (
                        <Card key={i} className="p-6">
                            <p className="text-muted-foreground">{p}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {systemHealth && (
                <section className="w-full max-w-4xl pb-20 text-center px-4 sm:px-6">
                    <h2 className="text-3xl font-semibold mb-6">
                        {health.title}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 justify-center">
                        {[
                            {
                                label: health.api.label,
                                status: systemHealth.api.status,
                            },
                            {
                                label: health.jobs.checksumVerification,
                                status: systemHealth.jobs.checksumVerification
                                    .status,
                            },
                            {
                                label: health.jobs.sourceSync,
                                status: systemHealth.jobs.sourceSync.status,
                            },
                        ].map((item, i) => (
                            <Card
                                key={i}
                                className="p-4 flex flex-col items-center"
                            >
                                <div
                                    className={`w-6 h-6 rounded-sm ${getColor(item.status)}`}
                                />
                                <p className="mt-2 text-sm font-medium">
                                    {item.label}
                                </p>
                            </Card>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
