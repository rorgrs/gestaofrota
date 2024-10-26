using System;

namespace Backend.Domain.Entities;

public class Usuario : BaseEntity
{
    public required string Nome { get; set; }
    public required string Login { get; set; }
    public required string Documento { get; set; }
    public required string Senha { get; set; }
    public string? Email { get; set; }
    public string? Telefone { get; set; }
}
