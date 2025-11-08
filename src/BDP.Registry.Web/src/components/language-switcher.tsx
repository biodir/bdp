import { Languages } from "lucide-react";
import { useIntlayer, useLocale } from "react-intlayer";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locales } from "intlayer";

export function LanguageSwitcher() {
    const { setLocale } = useLocale();
    const { language } = useIntlayer("common");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">{language.select}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLocale(Locales.ENGLISH)}>
                    <span className="mr-2">🇬🇧</span>
                    {language.english}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale(Locales.GERMAN)}>
                    <span className="mr-2">🇩🇪</span>
                    {language.german}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale(Locales.CHINESE)}>
                    <span className="mr-2">🇨🇳</span>
                    {language.chinese}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale(Locales.JAPANESE)}>
                    <span className="mr-2">🇯🇵</span>
                    {language.japanese}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
