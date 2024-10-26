using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Enum;

namespace Backend.Domain.Entities;

[Table("veiculo_manutencao")]
public class VeiculoManutencao : BaseEntity
{
    [Column("id_veiculo")]
    public required int IdVeiculo { get; set; }
    
    [Column("tipo")]
    public required ETipoManutencaoVeiculo Tipo { get; set; }
    
    [Column("data_inicio")]
    public required DateTime DataInicio { get; set; }
    
    [Column("data_fim")]
    public DateTime? DataFim { get; set; }
    
    [Column("observacao")]
    [MaxLength(500)]
    public string? Observacao { get; set; }
    
    [Column("diagnostico")]
    [MaxLength(500)]
    public string? Diagnostico { get; set; }
    
    #region Propriedades de Navegacao
    
    public virtual Veiculo? Veiculo { get; set; }
    
    #endregion
}
