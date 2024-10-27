using System;
using Backend.Domain.Enum;

namespace Backend.Domain.DTOs.Motorista;

public class MotoristaRequest
{
    public required string Nome { get; set; }
    public string? Documento { get; set; }
    public DateTime? DataNascimento  { get; set; }
    public string? Celular { get; set; }
    public string? Email { get; set; }
    public EStatusTreinamentoMotorista? StatusTreinamento { get; set; }
    public int? IdEscalaTrabalho { get; set; }
    public string? Cnh { get; set; }
    public DateTime? CnhDataVencimento { get; set; }
}
