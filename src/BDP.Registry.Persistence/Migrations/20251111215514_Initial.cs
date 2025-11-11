using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDP.Registry.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:uuid-ossp", ",,");

            migrationBuilder.CreateTable(
                name: "authors",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_authors", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "citation_types",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_citation_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "journals",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_journals", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "organizations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    website = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true),
                    description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_organizations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "species",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_species", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tags",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_tags", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "source_entries",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    organization_id = table.Column<Guid>(type: "uuid", nullable: false),
                    external_id = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    description = table.Column<string>(type: "character varying(4096)", maxLength: 4096, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_source_entries", x => x.id);
                    table.ForeignKey(
                        name: "fk_source_entries_organizations_organization_id",
                        column: x => x.organization_id,
                        principalTable: "organizations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "source_versions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    source_entry_id = table.Column<Guid>(type: "uuid", nullable: false),
                    external_version = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: true),
                    version = table.Column<int>(type: "integer", nullable: false),
                    species_id = table.Column<Guid>(type: "uuid", nullable: true),
                    last_updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    additional_metadata = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_source_versions", x => x.id);
                    table.ForeignKey(
                        name: "fk_source_versions_source_entries_source_entry_id",
                        column: x => x.source_entry_id,
                        principalTable: "source_entries",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_source_versions_species_species_id",
                        column: x => x.species_id,
                        principalTable: "species",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "citations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    source_version_id = table.Column<Guid>(type: "uuid", nullable: false),
                    citation_type_id = table.Column<Guid>(type: "uuid", nullable: false),
                    journal_id = table.Column<Guid>(type: "uuid", nullable: true),
                    title = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    year = table.Column<int>(type: "integer", nullable: true),
                    doi = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    url = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_citations", x => x.id);
                    table.ForeignKey(
                        name: "fk_citations_citation_types_citation_type_id",
                        column: x => x.citation_type_id,
                        principalTable: "citation_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_citations_journals_journal_id",
                        column: x => x.journal_id,
                        principalTable: "journals",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "fk_citations_source_versions_source_version_id",
                        column: x => x.source_version_id,
                        principalTable: "source_versions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "downloads",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    source_version_id = table.Column<Guid>(type: "uuid", nullable: false),
                    protocol = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    url = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: false),
                    format = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: true),
                    notes = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_downloads", x => x.id);
                    table.ForeignKey(
                        name: "fk_downloads_source_versions_source_version_id",
                        column: x => x.source_version_id,
                        principalTable: "source_versions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "source_version_statistics",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    source_version_id = table.Column<Guid>(type: "uuid", nullable: false),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    download_count = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_source_version_statistics", x => x.id);
                    table.ForeignKey(
                        name: "fk_source_version_statistics_source_versions_source_version_id",
                        column: x => x.source_version_id,
                        principalTable: "source_versions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "source_version_tags",
                columns: table => new
                {
                    source_version_id = table.Column<Guid>(type: "uuid", nullable: false),
                    tag_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_source_version_tags", x => new { x.source_version_id, x.tag_id });
                    table.ForeignKey(
                        name: "fk_source_version_tags_source_versions_source_version_id",
                        column: x => x.source_version_id,
                        principalTable: "source_versions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_source_version_tags_tags_tag_id",
                        column: x => x.tag_id,
                        principalTable: "tags",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "citation_authors",
                columns: table => new
                {
                    citation_id = table.Column<Guid>(type: "uuid", nullable: false),
                    author_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_citation_authors", x => new { x.citation_id, x.author_id });
                    table.ForeignKey(
                        name: "fk_citation_authors_authors_author_id",
                        column: x => x.author_id,
                        principalTable: "authors",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_citation_authors_citations_citation_id",
                        column: x => x.citation_id,
                        principalTable: "citations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_citation_authors_author_id",
                table: "citation_authors",
                column: "author_id");

            migrationBuilder.CreateIndex(
                name: "ix_citations_citation_type_id",
                table: "citations",
                column: "citation_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_citations_journal_id",
                table: "citations",
                column: "journal_id");

            migrationBuilder.CreateIndex(
                name: "ix_citations_source_version_id",
                table: "citations",
                column: "source_version_id");

            migrationBuilder.CreateIndex(
                name: "ix_downloads_source_version_id",
                table: "downloads",
                column: "source_version_id");

            migrationBuilder.CreateIndex(
                name: "ix_source_entries_external_id_organization_id",
                table: "source_entries",
                columns: new[] { "external_id", "organization_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_source_entries_organization_id",
                table: "source_entries",
                column: "organization_id");

            migrationBuilder.CreateIndex(
                name: "ix_source_version_statistics_source_version_id",
                table: "source_version_statistics",
                column: "source_version_id");

            migrationBuilder.CreateIndex(
                name: "ix_source_version_tags_tag_id",
                table: "source_version_tags",
                column: "tag_id");

            migrationBuilder.CreateIndex(
                name: "ix_source_versions_source_entry_id_version",
                table: "source_versions",
                columns: new[] { "source_entry_id", "version" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_source_versions_species_id",
                table: "source_versions",
                column: "species_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "citation_authors");

            migrationBuilder.DropTable(
                name: "downloads");

            migrationBuilder.DropTable(
                name: "source_version_statistics");

            migrationBuilder.DropTable(
                name: "source_version_tags");

            migrationBuilder.DropTable(
                name: "authors");

            migrationBuilder.DropTable(
                name: "citations");

            migrationBuilder.DropTable(
                name: "tags");

            migrationBuilder.DropTable(
                name: "citation_types");

            migrationBuilder.DropTable(
                name: "journals");

            migrationBuilder.DropTable(
                name: "source_versions");

            migrationBuilder.DropTable(
                name: "source_entries");

            migrationBuilder.DropTable(
                name: "species");

            migrationBuilder.DropTable(
                name: "organizations");
        }
    }
}
