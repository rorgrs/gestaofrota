using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

public class BaseEntity
{
    [Column("id")] 
    public required int Id { get; set; }
    
    [Column("id_usuario_cadastro")]
    public int? IdUsuarioCadastro { get; set; }
    
    [Column("id_usuario_alteracao")]
    public int? IdUsuarioAlteracao { get; set; }
    
    [Column("data_cadastro")]
    public required DateTime DataCadastro { get; set; }
    
    [Column("data_alteracao")]
    public DateTime? DataAlteracao { get; set; }
    
    #region Propriedades de Navegacao
    
    public virtual Usuario? UsuarioCadastro { get; set; }
    public virtual Usuario? UsuarioAlteracao { get; set; }
    
    #endregion
}
