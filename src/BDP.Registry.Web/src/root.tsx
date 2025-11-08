import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { IntlayerProvider } from "react-intlayer";
import { ThemeProvider } from "@/components/theme-provider";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>BDP - Bioinformatics Dependencies Platform</title>
                <Meta />
                <Links />
            </head>
            <body>
                <IntlayerProvider>
                    <ThemeProvider defaultTheme="system" storageKey="bdp-theme">
                        {children}
                    </ThemeProvider>
                </IntlayerProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function Root() {
    return <Outlet />;
}
