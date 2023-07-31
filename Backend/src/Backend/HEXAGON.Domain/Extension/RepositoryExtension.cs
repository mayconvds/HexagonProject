using Microsoft.Extensions.Configuration;

namespace HEXAGON.Domain.Extension;
public static class RepositoryExtension
{
    public static string GetDatabaseName(this IConfiguration configuration)
    {
        var databaseName = configuration.GetConnectionString("databaseName"); ;
        return databaseName;
    }

    public static string GetConnectionString(this IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("connection");
        return connectionString;
    }

    public static string GetConnect(this IConfiguration configurationManager)
    {
        var databaseName = configurationManager.GetDatabaseName();
        var connectionString = configurationManager.GetConnectionString();

        return $"{connectionString}Database={databaseName}";
    }

}