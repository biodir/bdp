import { t, type DeclarationContent } from "intlayer";

const homeContent = {
    key: "home",
    content: {
        hero: {
            title: t({
                en: "BDP Registry",
                de: "BDP-Register",
                zh: "BDP 注册表",
                ja: "BDP レジストリ",
            }),
            subtitle: t({
                en: "Bioinformatics Dependencies Platform",
                de: "Plattform für Bioinformatik-Abhängigkeiten",
                zh: "生物信息学依赖平台",
                ja: "バイオインフォマティクス依存関係プラットフォーム",
            }),
        },
        gettingStarted: {
            title: t({
                en: "Getting Started",
                de: "Erste Schritte",
                zh: "入门",
                ja: "はじめに",
            }),
            description: t({
                en: "Install the BDP Manager CLI and start managing bioinformatics sources easily.",
                de: "Installieren Sie das BDP-Manager-CLI und verwalten Sie Bioinformatikquellen einfach.",
                zh: "安装 BDP 管理 CLI，轻松管理生物信息学数据源。",
                ja: "BDP マネージャー CLI をインストールして、バイオインフォマティクスソースを簡単に管理しましょう。",
            }),
            unix: {
                label: t({
                    en: "Unix / macOS",
                    de: "Unix / macOS",
                    zh: "Unix / macOS",
                    ja: "Unix / macOS",
                }),
                install: "curl -fsSL https://get.bdp.sh | bash",
            },
            windows: {
                label: t({
                    en: "Windows",
                    de: "Windows",
                    zh: "Windows",
                    ja: "Windows",
                }),
                install: "iwr -useb https://get.bdp.sh | iex",
            },
            examples: [
                "bdp init",
                "bdp source add uniprot:P12345@1.2.0",
                "bdp install",
            ],
        },
        why: {
            title: t({
                en: "Why BDP?",
                de: "Warum BDP?",
                zh: "为什么选择 BDP？",
                ja: "なぜ BDP？",
            }),
            points: [
                t({
                    en: "Unified registry for bioinformatics tools and data sources.",
                    de: "Einheitliches Register für Bioinformatik-Tools und Datenquellen.",
                    zh: "统一的生物信息学工具和数据源注册表。",
                    ja: "バイオインフォマティクスツールとデータソースの統一レジストリ。",
                }),
                t({
                    en: "Reproducible workflows powered by dependency versioning.",
                    de: "Versionsverwaltung für reproduzierbare Workflows.",
                    zh: "通过依赖版本控制实现可重现的工作流程。",
                    ja: "依存関係のバージョン管理により再現可能なワークフロー。",
                }),
                t({
                    en: "Secure and verifiable source integrity checks.",
                    de: "Sichere und überprüfbare Quellintegritätsprüfungen.",
                    zh: "安全且可验证的数据源完整性检查。",
                    ja: "安全で検証可能なソース整合性チェック。",
                }),
            ],
        },
        search: {
            placeholder: t({
                en: "Search sources...",
                de: "Quellen suchen...",
                zh: "搜索数据源...",
                ja: "ソースを検索...",
            }),
            button: t({
                en: "Search",
                de: "Suchen",
                zh: "搜索",
                ja: "検索",
            }),
            filter: {
                label: t({
                    en: "Filter by type",
                    de: "Nach Typ filtern",
                    zh: "按类型筛选",
                    ja: "タイプでフィルター",
                }),
                all: t({
                    en: "All",
                    de: "Alle",
                    zh: "全部",
                    ja: "すべて",
                }),
                source: t({
                    en: "Source",
                    de: "Quelle",
                    zh: "数据源",
                    ja: "ソース",
                }),
                tool: t({
                    en: "Tool",
                    de: "Werkzeug",
                    zh: "工具",
                    ja: "ツール",
                }),
            },
        },
        health: {
            title: t({
                en: "System Health",
                de: "Systemstatus",
                zh: "系统健康状况",
                ja: "システムの健全性",
            }),
            api: {
                label: t({
                    en: "API Status",
                    de: "API-Status",
                    zh: "API 状态",
                    ja: "API ステータス",
                }),
                operational: t({
                    en: "Operational",
                    de: "Betriebsbereit",
                    zh: "运行正常",
                    ja: "稼働中",
                }),
                degraded: t({
                    en: "Degraded",
                    de: "Eingeschränkt",
                    zh: "性能下降",
                    ja: "低下",
                }),
                down: t({
                    en: "Down",
                    de: "Ausgefallen",
                    zh: "停机",
                    ja: "停止",
                }),
                latency: t({
                    en: "Latency",
                    de: "Latenz",
                    zh: "延迟",
                    ja: "レイテンシ",
                }),
            },
            jobs: {
                label: t({
                    en: "Background Jobs",
                    de: "Hintergrundjobs",
                    zh: "后台任务",
                    ja: "バックグラウンドジョブ",
                }),
                checksumVerification: t({
                    en: "Checksum Verification",
                    de: "Prüfsummenüberprüfung",
                    zh: "校验和验证",
                    ja: "チェックサム検証",
                }),
                sourceSync: t({
                    en: "Source Synchronization",
                    de: "Quellensynchronisierung",
                    zh: "数据源同步",
                    ja: "ソース同期",
                }),
                running: t({
                    en: "Running",
                    de: "Läuft",
                    zh: "运行中",
                    ja: "実行中",
                }),
                idle: t({
                    en: "Idle",
                    de: "Inaktiv",
                    zh: "空闲",
                    ja: "待機中",
                }),
                error: t({
                    en: "Error",
                    de: "Fehler",
                    zh: "错误",
                    ja: "エラー",
                }),
                lastRun: t({
                    en: "Last run",
                    de: "Letzter Lauf",
                    zh: "上次运行",
                    ja: "最終実行",
                }),
                nextRun: t({
                    en: "Next run",
                    de: "Nächster Lauf",
                    zh: "下次运行",
                    ja: "次回実行",
                }),
                progress: t({
                    en: "Progress",
                    de: "Fortschritt",
                    zh: "进度",
                    ja: "進行状況",
                }),
            },
        },
    },
} satisfies DeclarationContent;

export default homeContent;
