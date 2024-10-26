using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

[Table("usuario")]
public class Usuario : BaseEntity
{
    [Column("nome")]
    [MaxLength(200)]
    public required string Nome { get; set; }
    
    [Column("login")]
    [MaxLength(200)]
    public required string Login { get; set; }
    
    [Column("documento")]
    [MaxLength(20)]
    public required string Documento { get; set; }
    
    [Column("senha")]
    [MaxLength(200)]
    public required string Senha { get; set; }
    
    [Column("email")]
    [MaxLength(200)]
    public string? Email { get; set; }
    
    [Column("telefone")]
    [MaxLength(20)]
    public string? Telefone { get; set; }
}
