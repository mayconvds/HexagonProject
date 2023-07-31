using HEXAGON.Application.Servicos.Token;
using HEXAGON.Communication.Response;
using HEXAGON.Exceptions.ExeptionBase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;

namespace HEXAGON.Api.Filters;

public class UserAuthAttribute : AuthorizeAttribute, IAsyncAuthorizationFilter
{
    private readonly TokenController _tokenController;

    public UserAuthAttribute(TokenController tokenController)
    {
        _tokenController = tokenController;
    }
    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        try
        {
            var token = TokenRequest(context);
            var user = _tokenController.ValidUserName(token);

            if (!user)
            {
                throw new HEXAGONException(string.Empty);
            }

        } 
        catch (SecurityTokenExpiredException e)
        {
            TokenExpirate(context);
        }
        catch
        {
            Unauthozired(context);
        }
        

    }

    public string TokenRequest(AuthorizationFilterContext context)
    {
        var authorization = context.HttpContext.Request.Headers["Authorization"].ToString();

        if (string.IsNullOrWhiteSpace(authorization)) 
        {
            throw new System.Exception();
        }

        return authorization["Bearer".Length..].Trim();
    }

    private void TokenExpirate(AuthorizationFilterContext context)
    {
        context.Result = new UnauthorizedObjectResult(new ResponseErrorJson("Token Expirado"));
    }

    private static void Unauthozired(AuthorizationFilterContext context)
    {
        context.Result = new UnauthorizedObjectResult(new ResponseErrorJson("Usuário sem permissão"));
    }
}
