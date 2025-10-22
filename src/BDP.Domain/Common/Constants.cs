namespace BDP.Domain.Common;

public static class Constants
{
    // File names
    public const string ConfigFileName = "bdp.yml";
    public const string LockFileName = "bdp.lock";

    // Directories
    public const string BdpDirectory = ".bdp";
    public const string DefaultCachePath = ".bdp/cache";

    // Registry
    public static readonly Uri DefaultRegistryUrl = new("https://registry.bdp.bio");
    public const string DefaultRegistryPath = "./registry";

    // Versioning
    public const string LatestVersion = "latest";

    // Cache
    public const int DefaultCacheRetentionDays = 90;
    public const long MaxCacheSizeBytes = 100L * 1024 * 1024 * 1024; // 100 GB
}
