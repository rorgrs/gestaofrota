using System;

namespace Backend.Domain.DTOs.Veiculo;

public class VeiculoLicenciamentoRequest
{
    public DateTime? DataEmissao { get; set; }
    public DateTime? DataValidade { get; set; }
    public DateTime? DataVencimento { get; set; }
}
