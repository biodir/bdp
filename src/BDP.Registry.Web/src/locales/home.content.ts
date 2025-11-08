import { t, type DeclarationContent } from "intlayer";

const homeContent = {
    key: "home",
    content: {
        search: {
            placeholder: t({
                en: "Search packages...",
                de: "Pakete suchen...",
                zh: "搜索软件包...",
                ja: "パッケージを検索...",
            }),
            button: t({
                en: "Search",
                de: "Suchen",
                zh: "搜索",
                ja: "検索",
            }),
        },
    },
} satisfies DeclarationContent;

export default homeContent;
