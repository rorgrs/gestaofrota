namespace Backend.Domain.DTOs;

public class UsuarioRequest
{
    public int? Id { get; set; }
    public required string Nome { get; set; }
    public required string Login { get; set; }
    public required string Documento { get; set; }
    
    public string? Senha { get; set; }
    public string? Email { get; set; }
}
