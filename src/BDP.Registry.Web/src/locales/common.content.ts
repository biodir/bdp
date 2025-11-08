import { t, type DeclarationContent } from "intlayer";

const commonContent = {
    key: "common",
    content: {
        // App info
        appName: t({
            en: "BDP",
            de: "BDP",
            zh: "BDP",
            ja: "BDP",
        }),
        appFullName: t({
            en: "Bioinformatics Dependencies Platform",
            de: "Bioinformatik-Abhängigkeitsplattform",
            zh: "生物信息学依赖平台",
            ja: "バイオインフォマティクス依存関係プラットフォーム",
        }),

        // Navigation
        nav: {
            home: t({
                en: "Home",
                de: "Startseite",
                zh: "主页",
                ja: "ホーム",
            }),
            about: t({
                en: "About",
                de: "Über uns",
                zh: "关于",
                ja: "について",
            }),
            packages: t({
                en: "Packages",
                de: "Pakete",
                zh: "软件包",
                ja: "パッケージ",
            }),
        },

        // Theme
        theme: {
            toggle: t({
                en: "Toggle theme",
                de: "Design wechseln",
                zh: "切换主题",
                ja: "テーマを切り替え",
            }),
            light: t({
                en: "Light",
                de: "Hell",
                zh: "浅色",
                ja: "ライト",
            }),
            dark: t({
                en: "Dark",
                de: "Dunkel",
                zh: "深色",
                ja: "ダーク",
            }),
            system: t({
                en: "System",
                de: "System",
                zh: "系统",
                ja: "システム",
            }),
        },

        // Language
        language: {
            select: t({
                en: "Select language",
                de: "Sprache wählen",
                zh: "选择语言",
                ja: "言語を選択",
            }),
            english: t({
                en: "English",
                de: "Englisch",
                zh: "英语",
                ja: "英語",
            }),
            german: t({
                en: "German",
                de: "Deutsch",
                zh: "德语",
                ja: "ドイツ語",
            }),
            chinese: t({
                en: "Chinese",
                de: "Chinesisch",
                zh: "中文",
                ja: "中国語",
            }),
            japanese: t({
                en: "Japanese",
                de: "Japanisch",
                zh: "日语",
                ja: "日本語",
            }),
        },

        // Footer
        footer: {
            copyright: t({
                en: "© 2025 Bio Directory. All rights reserved.",
                de: "© 2025 Bio Directory. Alle Rechte vorbehalten.",
                zh: "© 2025 Bio Directory。保留所有权利。",
                ja: "© 2025 Bio Directory。全著作権所有。",
            }),
            madeWith: t({
                en: "Made with",
                de: "Erstellt mit",
                zh: "使用以下工具制作",
                ja: "で作成",
            }),
        },
    },
} satisfies DeclarationContent;

export default commonContent;
