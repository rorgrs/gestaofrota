using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Enum;

namespace Backend.Domain.Entities;

[Table("motorista")]
public class Motorista : BaseEntity
{
    [Column("id_escala_trabalho")]
    public int? IdEscalaTrabalho { get; set; }
    
    [Column("nome")]
    public required string Nome { get; set; }
    
    [Column("documento")]
    [MaxLength(20)]
    public string? Documento { get; set; }
    
    [Column("data_nascimento")]
    public DateTime? DataNascimento  { get; set; }
    
    [Column("celular")]
    [MaxLength(20)]
    public string? Celular { get; set; }
    
    [Column("email")]
    [MaxLength(20)]
    public string? Email { get; set; }
    
    [Column("status_treinamento")]
    public EStatusTreinamentoMotorista? StatusTreinamento { get; set; } 
    
    #region Propriedades de Navegacao
    
    public virtual MotoristaEscalaTrabalho? EscalaTrabalho { get; set; }
    
    public virtual ICollection<MotoristaFolga>? Folgas { get; set; }
    
    public virtual ICollection<MotoristaCarteira>? Carteiras { get; set; }
    
    #endregion
}
