using System;
using System.Collections.Generic;
using Backend.Domain.Enum;

namespace Backend.Domain.DTOs.Motorista;

public class MotoristaResponse
{
    public required int Id { get; set; }
    public required string Nome { get; set; }
    public string? Documento { get; set; }
    public DateTime? DataNascimento  { get; set; }
    public string? Celular { get; set; }
    public string? Email { get; set; }
    public EStatusTreinamentoMotorista? StatusTreinamento { get; set; }
    public MotoristaEscalaTrabalhoResponse? EscalaTrabalho { get; set; }
    public List<MotoristaCarteiraResponse>? Carteiras { get; set; }
    public List<MotoristaFolgaResponse>? Folgas { get; set; }
}
public class MotoristaEscalaTrabalhoResponse
{
    public required DateTime DataInicio { get; set; }
    public required DateTime DataFim { get; set; }
}
public class MotoristaCarteiraResponse
{
    public required string Cnh { get; set; }
    public required DateTime DataVencimento { get; set; }
}
public class MotoristaFolgaResponse
{
    public required DateTime DataInicio { get; set; }
    public required DateTime DataFim { get; set; }
}


