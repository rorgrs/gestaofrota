using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

[Table("motorista_carteira")]
public class MotoristaCarteira : BaseEntity
{
    [Column("id_motorista")]
    public required int IdMotorista { get; set; }
    
    [Column("cnh")]
    [MaxLength(50)]
    public required string Cnh { get; set; }
    
    [Column("data_vencimento")]
    public required DateTime DataVencimento { get; set; }
    
    #region Propriedades de Navegacao
    
    public virtual Motorista? Motorista { get; set; }
    
    #endregion
}
