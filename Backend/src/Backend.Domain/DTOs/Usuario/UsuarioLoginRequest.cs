namespace Backend.Domain.DTOs.Usuario;

public class UsuarioLoginRequest
{
    public required string Login { get; set; }
    public required string Senha { get; set; }
}
