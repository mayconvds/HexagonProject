using HEXAGON.Application.Servicos.Token;
using HEXAGON.Application.UseCases.User.Delete;
using HEXAGON.Application.UseCases.User.Login;
using HEXAGON.Application.UseCases.User.Register;
using HEXAGON.Application.UseCases.User.Update;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HEXAGON.Application;

public static class Bootstrapper
{
    public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IRegisterUserUseCase, RegisterUserUseCase>()
            .AddScoped<IUpdateUserUseCase, UpdateUserUseCase>()
            .AddScoped<IDeleteUserUseCase, DeleteUserCase>();

        AddUserLogin(services);
        AddTokenJWT(services, configuration);
    }

    private static void AddUserLogin(IServiceCollection services)
    {
        services.AddScoped<IUserLogin, UserLogin>();
    }

    private static void AddTokenJWT(IServiceCollection services, IConfiguration configuration)
    {
        var sectionTempoDeVida = configuration.GetRequiredSection("Configs:LifeTime");
        var sectionKey = configuration.GetRequiredSection("Configs:TokenKey");

        services.AddScoped(option => new TokenController(int.Parse(sectionTempoDeVida.Value), sectionKey.Value));
    }
}