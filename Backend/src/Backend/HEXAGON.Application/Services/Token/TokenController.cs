using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace HEXAGON.Application.Servicos.Token;

public class TokenController
{
    private readonly double _lifeTimeInMinutes;
    private readonly string _securityKey;
    private readonly string UserAlias = "user";

    public TokenController(double lifeTimeInMinutes, string securityKey)
    {
        _lifeTimeInMinutes = lifeTimeInMinutes;
        _securityKey = securityKey;
    }

    public string GenerateToken(string userName)
    {
        var claims = new List<Claim>
        {
            new Claim(UserAlias, userName),
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(_lifeTimeInMinutes),
            SigningCredentials = new SigningCredentials(SimetricKey(), SecurityAlgorithms.HmacSha256Signature)
        };

        var securityToken = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(securityToken);
    }

    public ClaimsPrincipal ValidatorToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        var validateParams = new TokenValidationParameters
        {
            RequireExpirationTime = true,
            IssuerSigningKey = SimetricKey(),
            ClockSkew = new TimeSpan(0),
            ValidateIssuer = false,
            ValidateAudience = false,
        };

        var claims = tokenHandler.ValidateToken(token, validateParams, out _);

        return claims;
    }

    public bool ValidUserName(string token)
    {
        var userName = RecoveryUser(token);

        return (userName == "hexagon");
    }

    public string RecoveryUser(string token)
    {
        var claims = ValidatorToken(token);

        return claims.FindFirst(UserAlias).Value;
    }


    private SymmetricSecurityKey SimetricKey()
    {
        var symmetricKey = Convert.FromBase64String(_securityKey);
        return new SymmetricSecurityKey(symmetricKey);
    }
}
