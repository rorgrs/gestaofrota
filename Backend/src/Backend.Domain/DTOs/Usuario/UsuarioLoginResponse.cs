using System;

namespace Backend.Domain.DTOs.Usuario;

public class UsuarioLoginResponse
{
    public required int Id { get; set; }
    public required string Nome { get; set; }
    public required string Login { get; set; }
    public required string Documento { get; set; }
    public required string Token { get; set; }
    public required int ExpiresIn { get; set; }
}
