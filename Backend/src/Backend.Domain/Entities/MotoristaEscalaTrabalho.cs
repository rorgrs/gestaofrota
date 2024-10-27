using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Enum;

namespace Backend.Domain.Entities;

[Table("motorista_escala_trabalho")]
public class MotoristaEscalaTrabalho : BaseEntity
{
    [Column("horario_inicio")]
    public required DateTime HorarioInicio { get; set; }
    
    [Column("horario_fim")]
    public required DateTime HorarioFim { get; set; }
    
}
