using HEXAGON.Application.Servicos.Token;
using HEXAGON.Communication.Request;
using Microsoft.AspNetCore.Mvc;

namespace HEXAGON.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost]
    public IActionResult Login([FromBody] RequestLoginUserJson request, [FromServices]TokenController tokenController)
    {
        if (request.user != "hexagon" || request.password != "hexagon")
        {
            return new ObjectResult(new { Message = "Login não autorizado." })
            {
                StatusCode = 401
            };
        }

        var token = tokenController.GenerateToken(request.user);

        if (string.IsNullOrEmpty(token))
        {
            return new ObjectResult(new { Message = "Erro ao gerar token." })
            {
                StatusCode = 401
            };
        }

        return new ObjectResult(new { Message = token })
        {
            StatusCode = 201
        }; ;
    }
}