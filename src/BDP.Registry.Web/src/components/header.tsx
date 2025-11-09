import { Link } from "react-router";
import { useIntlayer } from "react-intlayer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Github } from "lucide-react";

export function Header() {
    const { appName } = useIntlayer("common");

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold hover:opacity-80">
                    {appName}
                </Link>

                <div className="flex items-center gap-2">
                    <a
                        href="https://github.com/biodir/bdp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity mr-1"
                        aria-label="View on GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <ModeToggle />
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
