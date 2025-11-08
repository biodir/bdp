import { useIntlayer } from "react-intlayer";
import { Heart } from "lucide-react";

export function Footer() {
    const { footer } = useIntlayer("common");

    return (
        <footer className="border-t mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        {footer.copyright}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        {footer.madeWith}{" "}
                        <Heart className="h-4 w-4 text-red-500 fill-current" />{" "}
                        by BDP Team
                    </p>
                </div>
            </div>
        </footer>
    );
}
