import { Link } from "react-router";
import { useIntlayer } from "react-intlayer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
    const { appName } = useIntlayer("common");

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold hover:opacity-80">
                    {appName}
                </Link>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
