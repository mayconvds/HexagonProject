using FluentMigrator.Runner;
using HEXAGON.Domain.Extension;
using HEXAGON.Domain.Repositories;
using LATAM.Infrastructure.RepositoryAccess;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace HEXAGON.Infrastructure;

public static class Bootstrapper
{
    public static void AddRepository(this IServiceCollection services, IConfiguration configurationManager)
    {
        AddFluentMigrator(services, configurationManager);
        AddRepositories(services);
        AddContext(services, configurationManager);
        AddWorkUnity(services);
    }

    private static void AddContext(IServiceCollection services, IConfiguration configurationManager)
    {
        var connectionString = configurationManager.GetConnect();
        services.AddDbContext<LATAMContext>(dbContextOptions =>
        {
            dbContextOptions.UseSqlServer(connectionString);
        });
    }
    
    private static void AddWorkUnity(IServiceCollection services)
    {
        services.AddScoped<IWorkUnity, WorkUnity>();
    }

    private static void AddRepositories(IServiceCollection services)
    {
        services.AddScoped<IUserWriteOnlyRepository, UserRepository>()
            .AddScoped<IUserReadOnlyRepository, UserRepository>()
            .AddScoped<IUserReadListRepository, UserRepository>()
            .AddScoped<IUserFindByIdRepository, UserRepository>()
            .AddScoped<IUserUpdateRepository, UserRepository>()
            .AddScoped<IUserDeleteRepository, UserRepository>();
    }

    private static void AddFluentMigrator(IServiceCollection services, IConfiguration configurationManager)
    {
        services.AddFluentMigratorCore().ConfigureRunner(c => 
        c.AddMySql5()
        .WithGlobalConnectionString(configurationManager.GetConnect()).ScanIn(Assembly.Load("HEXAGON.Infrastructure")).For.All());
    }
}
