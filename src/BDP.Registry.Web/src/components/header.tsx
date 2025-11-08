import { Link } from "react-router";
import { useIntlayer } from "react-intlayer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
    const { appName, nav } = useIntlayer("common");

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold hover:opacity-80">
                    {appName}
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="hover:underline">
                        {nav.home}
                    </Link>
                    <Link to="/packages" className="hover:underline">
                        {nav.packages}
                    </Link>
                    <Link to="/about" className="hover:underline">
                        {nav.about}
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
