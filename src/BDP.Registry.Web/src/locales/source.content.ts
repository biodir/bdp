import { t, type DeclarationContent } from "intlayer";

const sourceContent = {
    key: "source",
    content: {
        notFound: t({
            en: "Source not found",
            de: "Quelle nicht gefunden",
            zh: "未找到数据源",
            ja: "ソースが見つかりません",
        }),
        backToSearch: t({
            en: "Back to search",
            de: "Zurück zur Suche",
            zh: "返回搜索",
            ja: "検索に戻る",
        }),
        overview: {
            title: t({
                en: "Overview",
                de: "Überblick",
                zh: "概述",
                ja: "概要",
            }),
        },
        installation: {
            title: t({
                en: "Installation",
                de: "Installation",
                zh: "安装",
                ja: "インストール",
            }),
            command: t({
                en: "Command",
                de: "Befehl",
                zh: "命令",
                ja: "コマンド",
            }),
            copy: t({
                en: "Copy",
                de: "Kopieren",
                zh: "复制",
                ja: "コピー",
            }),
            copied: t({
                en: "Copied!",
                de: "Kopiert!",
                zh: "已复制！",
                ja: "コピーしました！",
            }),
            note: t({
                en: "Note: @latest is not supported. Always specify a version.",
                de: "Hinweis: @latest wird nicht unterstützt. Geben Sie immer eine Version an.",
                zh: "注意：不支持 @latest。请始终指定版本。",
                ja: "注意: @latest はサポートされていません。常にバージョンを指定してください。",
            }),
        },
        details: {
            title: t({
                en: "Quick Info",
                de: "Kurzinfo",
                zh: "快速信息",
                ja: "クイック情報",
            }),
            sourceVersion: t({
                en: "Source Version",
                de: "Quellversion",
                zh: "源版本",
                ja: "ソースバージョン",
            }),
            bdpVersion: t({
                en: "BDP Version",
                de: "BDP-Version",
                zh: "BDP 版本",
                ja: "BDP バージョン",
            }),
            type: t({
                en: "Type",
                de: "Typ",
                zh: "类型",
                ja: "タイプ",
            }),
            license: t({
                en: "License",
                de: "Lizenz",
                zh: "许可证",
                ja: "ライセンス",
            }),
            lastUpdated: t({
                en: "Last Updated",
                de: "Zuletzt aktualisiert",
                zh: "最后更新",
                ja: "最終更新",
            }),
            checksumStatus: t({
                en: "Checksum",
                de: "Prüfsumme",
                zh: "校验和",
                ja: "チェックサム",
            }),
            lastVerified: t({
                en: "Last Verified",
                de: "Zuletzt überprüft",
                zh: "上次验证",
                ja: "最終確認",
            }),
            versionMapping: t({
                en: "Maps to",
                de: "Entspricht",
                zh: "映射到",
                ja: "マップ先",
            }),
        },
        checksum: {
            verified: t({
                en: "Verified",
                de: "Verifiziert",
                zh: "已验证",
                ja: "検証済み",
            }),
            pending: t({
                en: "Pending",
                de: "Ausstehend",
                zh: "待处理",
                ja: "保留中",
            }),
            failed: t({
                en: "Failed",
                de: "Fehlgeschlagen",
                zh: "失败",
                ja: "失敗",
            }),
            notChecked: t({
                en: "Not Checked",
                de: "Nicht überprüft",
                zh: "未检查",
                ja: "未確認",
            }),
            tooltip: t({
                en: "Checksums are periodically verified to ensure the source file integrity matches the expected hash for this version. This helps detect corruption or tampering.",
                de: "Prüfsummen werden regelmäßig überprüft, um sicherzustellen, dass die Integrität der Quelldatei mit dem erwarteten Hash für diese Version übereinstimmt. Dies hilft, Beschädigungen oder Manipulationen zu erkennen.",
                zh: "定期验证校验和以确保源文件完整性与此版本的预期哈希匹配。这有助于检测损坏或篡改。",
                ja: "チェックサムは定期的に検証され、ソースファイルの整合性がこのバージョンの期待されるハッシュと一致することを確認します。これは破損や改ざんの検出に役立ちます。",
            }),
        },
        maintainer: {
            title: t({
                en: "Maintainer",
                de: "Betreuer",
                zh: "维护者",
                ja: "メンテナー",
            }),
        },
        links: {
            title: t({
                en: "Links",
                de: "Links",
                zh: "链接",
                ja: "リンク",
            }),
            homepage: t({
                en: "Homepage",
                de: "Startseite",
                zh: "主页",
                ja: "ホームページ",
            }),
            documentation: t({
                en: "Documentation",
                de: "Dokumentation",
                zh: "文档",
                ja: "ドキュメント",
            }),
            repository: t({
                en: "Repository",
                de: "Repository",
                zh: "仓库",
                ja: "リポジトリ",
            }),
        },
        stats: {
            title: t({
                en: "Downloads",
                de: "Downloads",
                zh: "下载量",
                ja: "ダウンロード",
            }),
            total: t({
                en: "Total",
                de: "Gesamt",
                zh: "总计",
                ja: "合計",
            }),
            lastMonth: t({
                en: "Last Month",
                de: "Letzter Monat",
                zh: "上个月",
                ja: "先月",
            }),
            downloads: t({
                en: "downloads",
                de: "Downloads",
                zh: "次下载",
                ja: "ダウンロード",
            }),
            trend: t({
                en: "Last 30 Days",
                de: "Letzte 30 Tage",
                zh: "过去30天",
                ja: "過去30日間",
            }),
        },
        citation: {
            title: t({
                en: "Citation",
                de: "Zitat",
                zh: "引用",
                ja: "引用",
            }),
            bibtex: t({
                en: "BibTeX",
                de: "BibTeX",
                zh: "BibTeX",
                ja: "BibTeX",
            }),
            doi: t({
                en: "DOI",
                de: "DOI",
                zh: "DOI",
                ja: "DOI",
            }),
        },
        tags: {
            title: t({
                en: "Tags",
                de: "Schlagwörter",
                zh: "标签",
                ja: "タグ",
            }),
        },
    },
} satisfies DeclarationContent;

export default sourceContent;
