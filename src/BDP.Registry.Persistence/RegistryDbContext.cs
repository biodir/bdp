using BDP.Registry.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace BDP.Registry.Persistence;
public class RegistryDbContext : DbContext
{
    public RegistryDbContext(DbContextOptions<RegistryDbContext> options) : base(options)
    {
    }

    public DbSet<Organization> Organizations => Set<Organization>();
    public DbSet<SourceEntry> SourceEntries => Set<SourceEntry>();
    public DbSet<SourceVersion> SourceVersions => Set<SourceVersion>();
    public DbSet<Download> Downloads => Set<Download>();
    public DbSet<Citation> Citations => Set<Citation>();
    public DbSet<Author> Authors => Set<Author>();
    public DbSet<CitationAuthor> CitationAuthors => Set<CitationAuthor>();
    public DbSet<Tag> Tags => Set<Tag>();
    public DbSet<SourceVersionTag> SourceVersionTags => Set<SourceVersionTag>();
    public DbSet<Species> Species => Set<Species>();
    public DbSet<Journal> Journals => Set<Journal>();
    public DbSet<CitationType> CitationTypes => Set<CitationType>();
    public DbSet<SourceVersionStatistic> SourceVersionStatistics => Set<SourceVersionStatistic>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ArgumentNullException.ThrowIfNull(modelBuilder);

        base.OnModelCreating(modelBuilder);

        modelBuilder.HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<Organization>(entity =>
        {
            entity.HasKey(o => o.Id);
            entity.Property(o => o.Name).HasMaxLength(256).IsRequired();
            entity.Property(o => o.Website).HasMaxLength(512);
            entity.Property(o => o.Description).HasMaxLength(1024);
        });

        modelBuilder.Entity<SourceEntry>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.ExternalId, e.OrganizationId }).IsUnique();
            entity.Property(e => e.ExternalId).HasMaxLength(128).IsRequired();
            entity.Property(e => e.Description).HasMaxLength(4096).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired();

            entity.HasOne(e => e.Organization)
                .WithMany(o => o.SourceEntries)
                .HasForeignKey(e => e.OrganizationId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<SourceVersion>(entity =>
        {
            entity.HasKey(v => v.Id);
            entity.HasIndex(v => new { v.SourceEntryId, v.Version }).IsUnique();

            entity.Property(v => v.ExternalVersion).HasMaxLength(64);
            entity.Property(v => v.AdditionalMetadata).HasColumnType("jsonb");

            entity.HasOne(v => v.SourceEntry)
                .WithMany(e => e.Versions)
                .HasForeignKey(v => v.SourceEntryId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(v => v.Species)
                .WithMany()
                .HasForeignKey(v => v.SpeciesId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Download>(entity =>
        {
            entity.HasKey(d => d.Id);
            entity.Property(d => d.Protocol).HasMaxLength(64).IsRequired();
            entity.Property(d => d.Url).HasMaxLength(2048).IsRequired();
            entity.Property(d => d.Format).HasMaxLength(64);
            entity.Property(d => d.Notes).HasMaxLength(512);

            entity.HasOne(d => d.SourceVersion)
                .WithMany(v => v.Downloads)
                .HasForeignKey(d => d.SourceVersionId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Citation>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Title).HasMaxLength(1024).IsRequired();
            entity.Property(c => c.DOI).HasMaxLength(256);
            entity.Property(c => c.Url).HasMaxLength(2048);

            entity.HasOne(c => c.SourceVersion)
                .WithMany(v => v.Citations)
                .HasForeignKey(c => c.SourceVersionId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(c => c.CitationType)
                .WithMany()
                .HasForeignKey(c => c.CitationTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(c => c.Journal)
                .WithMany()
                .HasForeignKey(c => c.JournalId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(a => a.Id);
            entity.Property(a => a.Name).HasMaxLength(256).IsRequired();
        });

        modelBuilder.Entity<CitationAuthor>(entity =>
        {
            entity.HasKey(ca => new { ca.CitationId, ca.AuthorId });

            entity.HasOne(ca => ca.Citation)
                .WithMany(c => c.Authors)
                .HasForeignKey(ca => ca.CitationId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(ca => ca.Author)
                .WithMany(a => a.Citations)
                .HasForeignKey(ca => ca.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Name).HasMaxLength(128).IsRequired();
        });

        modelBuilder.Entity<SourceVersionTag>(entity =>
        {
            entity.HasKey(st => new { st.SourceVersionId, st.TagId });

            entity.HasOne(st => st.SourceVersion)
                .WithMany(v => v.Tags)
                .HasForeignKey(st => st.SourceVersionId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(st => st.Tag)
                .WithMany(t => t.SourceVersions)
                .HasForeignKey(st => st.TagId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<SourceVersionStatistic>(entity =>
        {
            entity.HasKey(s => s.Id);
            entity.Property(s => s.DownloadCount).IsRequired();
            entity.Property(s => s.Date).IsRequired();

            entity.HasOne(s => s.SourceVersion)
                .WithMany(v => v.Statistics)
                .HasForeignKey(s => s.SourceVersionId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Species>(entity =>
        {
            entity.HasKey(s => s.Id);
            entity.Property(s => s.Name).HasMaxLength(256).IsRequired();
        });

        modelBuilder.Entity<Journal>(entity =>
        {
            entity.HasKey(j => j.Id);
            entity.Property(j => j.Name).HasMaxLength(512).IsRequired();
        });

        modelBuilder.Entity<CitationType>(entity =>
        {
            entity.HasKey(ct => ct.Id);
            entity.Property(ct => ct.Name).HasMaxLength(128).IsRequired();
        });
    }
}
