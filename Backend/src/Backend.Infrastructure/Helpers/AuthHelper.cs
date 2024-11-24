using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Infrastructure.Helpers.Interface;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Infrastructure.Helpers;

public class AuthHelper : IAuthHelper
{
    public const string SecretKey = "chave_ultra_secreta_infinity_master_evolutions";
    public const int ExpiresInSeconds = 3600;

    public string GetSecretKey()
    {
        return SecretKey;
    }
    
    public int GetExpiresInSeconds()
    {
        return ExpiresInSeconds;
    }
    
    public string GenerateJwtToken(int id, string documento)
    {
        // Chave secreta (substitua por uma chave segura em produção)
        string secretKey = SecretKey; // Deve ser armazenada em local seguro.
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        // Credenciais de assinatura
        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Claims (informações adicionais no token)
        var claims = new[]
        {
            new Claim("id", id.ToString()), // ID do usuário
            new Claim("documento", documento), // Documento
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // ID único para o token
        };

        // Configuração do token
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddSeconds(ExpiresInSeconds), // Validade de 1 hora
            SigningCredentials = signingCredentials
        };

        // Gerador de tokens
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        // Retorna o token como string
        return tokenHandler.WriteToken(token);
    }
}