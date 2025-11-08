import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { Package, Search, TrendingUp, Users } from "lucide-react";

export async function clientLoader({}: LoaderFunctionArgs) {
    return {
        title: "Home",
    };
}

export default function Component({}: {
    loaderData: Awaited<ReturnType<typeof clientLoader>>;
}) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="container mx-auto px-4">
            {/* Hero Section with Search */}
            <section className="py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Bioinformatics Dependencies Platform
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Discover, share, and manage bioinformatics tools and
                    dependencies for your research projects
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input
                                type="text"
                                placeholder="Search packages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-12 text-base"
                            />
                        </div>
                        <Button type="submit" size="lg" className="px-8">
                            Search
                        </Button>
                    </div>
                </form>
            </section>

            {/* Features Section */}
            <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                        <Package className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                        Curated Packages
                    </h3>
                    <p className="text-muted-foreground">
                        Access a comprehensive collection of bioinformatics
                        tools and libraries
                    </p>
                </div>

                <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                        Version Management
                    </h3>
                    <p className="text-muted-foreground">
                        Track dependencies and manage versions across your
                        research projects
                    </p>
                </div>

                <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                        <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                        Community Driven
                    </h3>
                    <p className="text-muted-foreground">
                        Built by researchers, for researchers. Share and
                        collaborate on tools
                    </p>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-16 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-primary mb-2">
                            1,234
                        </div>
                        <div className="text-muted-foreground">Packages</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-primary mb-2">
                            567
                        </div>
                        <div className="text-muted-foreground">
                            Contributors
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-primary mb-2">
                            89K
                        </div>
                        <div className="text-muted-foreground">Downloads</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
