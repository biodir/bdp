import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { Route } from "../+types/root";

export async function clientLoader() {
    return {
        title: "Home",
    };
}

export default function Component({ loaderData }: Route.ComponentProps) {
    void loaderData;

    const { search } = useIntlayer("home");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement search functionality
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearch}>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input
                                type="text"
                                placeholder={search.placeholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-12 text-base"
                            />
                        </div>
                        <Button type="submit" size="lg" className="px-8">
                            {search.button}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
