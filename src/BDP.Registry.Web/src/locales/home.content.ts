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
            subtitle: t({
                en: "Solving bioinformatician pain points with modern dependency management",
                de: "Lösung der Probleme von Bioinformatikern mit moderner Abhängigkeitsverwaltung",
                zh: "通过现代依赖管理解决生物信息学家的痛点",
                ja: "最新の依存関係管理でバイオインフォマティシャンの課題を解決",
            }),
            useCases: [
                {
                    title: t({
                        en: "Complete Reproducibility",
                        de: "Vollständige Reproduzierbarkeit",
                        zh: "完全可重现性",
                        ja: "完全な再現性",
                    }),
                    description: t({
                        en: "Lock files for data, not just code. Version everything from reference genomes to annotation databases.",
                        de: "Lock-Dateien für Daten, nicht nur Code. Versionieren Sie alles von Referenzgenomen bis zu Annotationsdatenbanken.",
                        zh: "数据锁定文件，不仅仅是代码。版本控制从参考基因组到注释数据库的所有内容。",
                        ja: "コードだけでなくデータのロックファイル。参照ゲノムからアノテーションデータベースまですべてをバージョン管理。",
                    }),
                    icon: "🔒",
                },
                {
                    title: t({
                        en: "Seamless Collaboration",
                        de: "Nahtlose Zusammenarbeit",
                        zh: "无缝协作",
                        ja: "シームレスなコラボレーション",
                    }),
                    description: t({
                        en: "Share exact analysis environments across teams. No more 'works on my machine' moments.",
                        de: "Teilen Sie exakte Analyseumgebungen im Team. Keine 'funktioniert auf meiner Maschine' Momente mehr.",
                        zh: '在团队间共享精确的分析环境。不再出现"在我的机器上能运行"的问题。',
                        ja: "チーム全体で正確な分析環境を共有。「私のマシンでは動く」問題がなくなります。",
                    }),
                    icon: "🤝",
                },
                {
                    title: t({
                        en: "Smart Resource Management",
                        de: "Intelligente Ressourcenverwaltung",
                        zh: "智能资源管理",
                        ja: "スマートリソース管理",
                    }),
                    description: t({
                        en: "Shared cache between team members. Download once, use everywhere. Save bandwidth and storage.",
                        de: "Gemeinsamer Cache zwischen Teammitgliedern. Einmal herunterladen, überall verwenden. Sparen Sie Bandbreite und Speicherplatz.",
                        zh: "团队成员之间的共享缓存。下载一次，随处使用。节省带宽和存储空间。",
                        ja: "チームメンバー間で共有キャッシュ。一度ダウンロードすればどこでも使用可能。帯域幅とストレージを節約。",
                    }),
                    icon: "💾",
                },
                {
                    title: t({
                        en: "Automated Citation",
                        de: "Automatisierte Zitation",
                        zh: "自动引用",
                        ja: "自動引用",
                    }),
                    description: t({
                        en: "Generate proper citations for every data source. Never miss a reference in your publications.",
                        de: "Erstellen Sie korrekte Zitate für jede Datenquelle. Verpassen Sie keine Referenz in Ihren Publikationen.",
                        zh: "为每个数据源生成正确的引用。永远不会在出版物中遗漏参考文献。",
                        ja: "すべてのデータソースに対して適切な引用を生成。論文で参考文献を見逃すことがありません。",
                    }),
                    icon: "📚",
                },
                {
                    title: t({
                        en: "Integrity Verification",
                        de: "Integritätsüberprüfung",
                        zh: "完整性验证",
                        ja: "整合性検証",
                    }),
                    description: t({
                        en: "Automatic checksum validation detects tampering and corruption. Audit trails for compliance.",
                        de: "Automatische Prüfsummenvalidierung erkennt Manipulationen und Beschädigungen. Audit-Trails für Compliance.",
                        zh: "自动校验和验证检测篡改和损坏。合规性审计跟踪。",
                        ja: "自動チェックサム検証で改ざんや破損を検出。コンプライアンスのための監査証跡。",
                    }),
                    icon: "🛡️",
                },
                {
                    title: t({
                        en: "Unified Discovery",
                        de: "Einheitliche Entdeckung",
                        zh: "统一发现",
                        ja: "統一された検索",
                    }),
                    description: t({
                        en: "Search across all bioinformatics resources in one place. Find what you need instantly.",
                        de: "Durchsuchen Sie alle Bioinformatik-Ressourcen an einem Ort. Finden Sie sofort, was Sie brauchen.",
                        zh: "在一个地方搜索所有生物信息学资源。即时找到所需内容。",
                        ja: "すべてのバイオインフォマティクスリソースを一か所で検索。必要なものをすぐに見つけます。",
                    }),
                    icon: "🔍",
                },
                {
                    title: t({
                        en: "Workflow Integration",
                        de: "Workflow-Integration",
                        zh: "工作流集成",
                        ja: "ワークフロー統合",
                    }),
                    description: t({
                        en: "Native support for Nextflow, Snakemake, and CWL. Plug into your existing pipelines effortlessly.",
                        de: "Native Unterstützung für Nextflow, Snakemake und CWL. Integrieren Sie sich mühelos in Ihre bestehenden Pipelines.",
                        zh: "原生支持 Nextflow、Snakemake 和 CWL。轻松插入现有管道。",
                        ja: "Nextflow、Snakemake、CWLのネイティブサポート。既存のパイプラインに簡単に統合。",
                    }),
                    icon: "⚡",
                },
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
            subtitle: t({
                en: "Real-time monitoring of all BDP services",
                de: "Echtzeitüberwachung aller BDP-Dienste",
                zh: "实时监控所有 BDP 服务",
                ja: "すべてのBDPサービスのリアルタイム監視",
            }),
            uptime: t({
                en: "Last 90 days",
                de: "Letzte 90 Tage",
                zh: "过去 90 天",
                ja: "過去90日間",
            }),
            api: {
                label: t({
                    en: "API Service",
                    de: "API-Dienst",
                    zh: "API 服务",
                    ja: "APIサービス",
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
                sourceSync: {
                    label: t({
                        en: "Source Synchronization",
                        de: "Quellensynchronisierung",
                        zh: "数据源同步",
                        ja: "ソース同期",
                    }),
                    sources: {
                        uniprot: t({
                            en: "UniProt Sync",
                            de: "UniProt-Sync",
                            zh: "UniProt 同步",
                            ja: "UniProt同期",
                        }),
                        ensembl: t({
                            en: "Ensembl Sync",
                            de: "Ensembl-Sync",
                            zh: "Ensembl 同步",
                            ja: "Ensembl同期",
                        }),
                        ncbi: t({
                            en: "NCBI Sync",
                            de: "NCBI-Sync",
                            zh: "NCBI 同步",
                            ja: "NCBI同期",
                        }),
                        gencode: t({
                            en: "GENCODE Sync",
                            de: "GENCODE-Sync",
                            zh: "GENCODE 同步",
                            ja: "GENCODE同期",
                        }),
                    },
                },
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
