namespace Backend.Infrastructure.Helpers.Interface;

public interface IAuthHelper
{
    string GenerateJwtToken(int id, string documento);
    string GetSecretKey();
    int GetExpiresInSeconds();
}