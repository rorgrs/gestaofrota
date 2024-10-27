using System;
using Backend.Domain.Enum;

namespace Backend.Domain.DTOs.Motorista;

public class MotoristaFolgaRequest
{
    public DateTime? DataInicio { get; set; }
    public DateTime? DataFim { get; set; }
}
