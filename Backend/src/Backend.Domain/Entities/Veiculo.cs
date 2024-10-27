using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Enum;

namespace Backend.Domain.Entities;

[Table("veiculo")]
public class Veiculo : BaseEntity
{
    [Column("id_motorista")]
    public int? IdMotorista { get; set; }
    
    [Column("placa")]
    [MaxLength(20)]
    public required string Placa { get; set; }
    
    [Column("status")]
    public required EStatusVeiculo Status { get; set; } = EStatusVeiculo.Aguardo;
    
    [Column("marca")]
    [MaxLength(100)]
    public string? Marca { get; set; }
    
    [Column("modelo")]
    [MaxLength(100)]
    public string? Modelo { get; set; }
    
    [Column("cor")]
    [MaxLength(100)]
    public string? Cor { get; set; }
    
    [Column("km_litro")]
    public double? KmLitro { get; set; }
    
    [Column("ano")]
    public int? Ano { get; set; }
    
    #region Propriedades de Navegacao
    
    public virtual Motorista? Motorista { get; set; }
    public virtual ICollection<VeiculoLicenciamento>? Licenciamentos { get; set; }
    public virtual ICollection<VeiculoManutencao>? Manutencoes { get; set; }
    
    #endregion
}
