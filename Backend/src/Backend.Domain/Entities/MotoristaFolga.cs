using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Enum;

namespace Backend.Domain.Entities;

[Table("motorista_folga")]
public class MotoristaFolga : BaseEntity
{
    [Column("id_motorista")]
    public required int IdMotorista { get; set; }
    
    [Column("data_inicio")]
    public required DateTime DataInicio { get; set; }
    
    [Column("data_fim")]
    public required DateTime DataFim { get; set; }
    
    #region Propriedades de Navegacao
    
    public virtual Motorista? Motorista { get; set; }
    
    #endregion
}
