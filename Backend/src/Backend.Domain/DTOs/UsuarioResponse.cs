using System;

namespace Backend.Domain.DTOs;

public class UsuarioResponse
{
    public required int Id { get; set; }
    public required string Nome { get; set; }
    public required string Login { get; set; }
    public required string Documento { get; set; }
    public required string Email { get; set; }
    public DateTime? DataCadastro { get; set; }
}
