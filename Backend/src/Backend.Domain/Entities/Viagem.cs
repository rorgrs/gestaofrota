using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

[Table("viagem")]
public class Viagem : BaseEntity
{
    [Column("id_veiculo")]
    public required int IdVeiculo { get; set; }
    
    [Column("lat_origem")]
    public required double LatOrigem { get; set; }
    
    [Column("lng_origem")]
    public required double LngOrigem { get; set; }
    
    [Column("ibge_cidade_origem")]
    public required int IbgeCidadeOrigem { get; set; }
    
    [Column("logradouro_origem")]
    [MaxLength(300)]
    public required string LogradouroOrigem { get; set; }
    
    [Column("lat_destino")]
    public required double LatDestino { get; set; }
    
    [Column("lng_destino")]
    public required double LngDestino { get; set; }
    
    [Column("ibge_cidade_destino")]
    public required int IbgeCidadeDestino { get; set; }
    
    [Column("logradouro_destino")]
    [MaxLength(300)]
    public required string LogradouroDestino { get; set; }
    
    #region Propriedades de Navegacao
    
    public virtual Veiculo? Veiculo { get; set; }
    
    public virtual ICollection<ViagemParada>? Paradas { get; set; }
    
    #endregion
}
