namespace Backend.Domain.DTOs.Usuario;

public class UsuarioRequest
{
    public required string Nome { get; set; }
    public required string Login { get; set; }
    public required string Documento { get; set; }
    public string? Senha { get; set; }
    public string? Email { get; set; }
}
