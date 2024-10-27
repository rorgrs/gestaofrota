using System;
using System.Collections.Generic;
using Backend.Domain.Enum;

namespace Backend.Domain.DTOs.Motorista;

public class MotoristaResponse
{
    public int? Id { get; set; }
    public required string Nome { get; set; }
    public string? Documento { get; set; }
    public DateTime? DataNascimento  { get; set; }
    public string? Celular { get; set; }
    public string? Email { get; set; }
    public EStatusTreinamentoMotorista? StatusTreinamento { get; set; }
    public MotoristaEscalaTrabalhoResponse? EscalaTrabalho { get; set; }
    public MotoristaCnhResponse? Cnh { get; set; }
    public List<MotoristaFolgaResponse>? Folgas { get; set; }
}
public class MotoristaEscalaTrabalhoResponse
{
    public DateTime? DataInicio { get; set; }
    public DateTime? DataFim { get; set; }
}
public class MotoristaCnhResponse
{
    public string? Cnh { get; set; }
    public DateTime? DataVencimento { get; set; }
}
public class MotoristaFolgaResponse
{
    public DateTime? DataInicio { get; set; }
    public DateTime? DataFim { get; set; }
}


