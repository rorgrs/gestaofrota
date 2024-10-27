using System;
using System.Collections.Generic;
using Backend.Domain.Enum;

namespace Backend.Domain.DTOs.Veiculo;

public class VeiculoResponse
{
    public int? Id { get; set; }
    public required string Placa { get; set; }
    public string? Marca { get; set; }
    public string? Modelo { get; set; }
    public string? Cor { get; set; }
    public double? KmLitro { get; set; }
    public int? Ano { get; set; }
    public List<VeiculoLicenciamentoResponse>? Licenciamentos { get; set; }
    public List<VeiculoManutencaoResponse>? Manutencoes { get; set; }
}

public class VeiculoLicenciamentoResponse
{
    public DateTime? DataEmissao { get; set; }
    
    public DateTime? DataValidade { get; set; }
    
    public DateTime? DataVencimento { get; set; }
}

public class VeiculoManutencaoResponse
{
    public ETipoManutencaoVeiculo? Tipo { get; set; }
    
    public DateTime? DataInicio { get; set; }
    
    public DateTime? DataFim { get; set; }
    
    public string? Observacao { get; set; }
    
    public string? Diagnostico { get; set; }
}
