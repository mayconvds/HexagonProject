using HEXAGON.Application.Servicos.Token;
using Microsoft.AspNetCore.Http;

namespace HEXAGON.Application.UseCases.User.Login;
public class UserLogin : IUserLogin
{

    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly TokenController _tokenController;

    public UserLogin(IHttpContextAccessor httpContextAccessor, TokenController tokenController)
    {
        _httpContextAccessor = httpContextAccessor;
        _tokenController = tokenController;
    }
    public string RecoveryUser()
    {
        var authorization = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString();
        
        var token = authorization["Bearer".Length..].Trim();
        return _tokenController.RecoveryUser(token);
    }
}