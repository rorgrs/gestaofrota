using System;
using Backend.Domain.Enum;

namespace Backend.Domain.DTOs.Veiculo;

public class VeiculoManutencaoRequest
{
    public required ETipoManutencaoVeiculo Tipo { get; set; }
    public required DateTime DataInicio { get; set; }
    public DateTime? DataFim { get; set; }
    public string? Observacao { get; set; }
    public string? Diagnostico { get; set; }
}
