using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

[Table("veiculo_licenciamento")]
public class VeiculoLicenciamento : BaseEntity
{
    [Column("id_veiculo")]
    public required int IdVeiculo { get; set; }
    
    [Column("data_emissao")]
    public DateTime? DataEmissao { get; set; }
    
    [Column("data_validade")]
    public DateTime? DataValidade { get; set; }
    
    [Column("data_vencimento")]
    public DateTime? DataVencimento { get; set; }
    
    #region Propriedades de Navegacao
    
    public virtual Veiculo? Veiculo { get; set; }
    
    #endregion
}
