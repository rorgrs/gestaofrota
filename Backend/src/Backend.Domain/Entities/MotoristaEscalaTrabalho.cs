using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

[Table("motorista_escala_trabalho")]
public class MotoristaEscalaTrabalho : BaseEntity
{
    [Column("horario_inicio")]
    public required string HorarioInicio { get; set; } //08:00
    
    [Column("horario_fim")]
    public required string HorarioFim { get; set; } //18:18
    
}
