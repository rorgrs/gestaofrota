using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

[Table("viagem_parada")]
public class ViagemParada : BaseEntity
{
    [Column("id_viagem")]
    public required int IdViagem { get; set; }
    
    [Column("lat")]
    public required double Lat { get; set; }
    
    [Column("lng")]
    public required double Lng { get; set; }
    
    [Column("ibge_cidade")]
    public int? IbgeCidade { get; set; }
    
    [Column("logradouro")]
    [MaxLength(300)]
    public required string Logradouro { get; set; }
    
    #region Propriedades de Navegacao
    
    public virtual Viagem? Viagem { get; set; }
    
    #endregion
}
