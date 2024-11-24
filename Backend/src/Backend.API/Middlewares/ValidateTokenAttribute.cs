using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using Backend.Infrastructure.Helpers;
using Backend.Infrastructure.Helpers.Interface;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Backend.API.Middlewares;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class ValidateTokenAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var userContext = context.HttpContext.RequestServices.GetRequiredService<IUserContext>();
        var authHelper = context.HttpContext.RequestServices.GetRequiredService<IAuthHelper>();
        var token = context.HttpContext.Request.Headers.Authorization.FirstOrDefault()?.Split(" ").Last();

        if (string.IsNullOrEmpty(token))
        {
            context.Result = new Microsoft.AspNetCore.Mvc.UnauthorizedResult();
            return;
        }

        try
        {
            var key = Encoding.UTF8.GetBytes(authHelper.GetSecretKey());
            var tokenHandler = new JwtSecurityTokenHandler();
            var claimsPrincipal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out var validatedToken);

            if (validatedToken is JwtSecurityToken jwtToken)
            {
                var id = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
                if (id == null || !int.TryParse(id, out _))
                {
                    context.Result = new Microsoft.AspNetCore.Mvc.UnauthorizedResult();
                    return;
                }
                userContext.Id = int.Parse(id);
                userContext.Documento = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "documento")?.Value;
            }
        }
        catch
        {
            context.Result = new Microsoft.AspNetCore.Mvc.UnauthorizedResult();
        }
    }
}