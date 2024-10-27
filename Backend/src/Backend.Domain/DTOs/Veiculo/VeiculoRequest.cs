namespace Backend.Domain.DTOs.Veiculo;

public class VeiculoRequest
{
    public int? Id { get; set; }
    public int? IdMotorista { get; set; }
    public required string Placa { get; set; }
    public string? Marca { get; set; }
    public string? Modelo { get; set; }
    public string? Cor { get; set; }
    public double? KmLitro { get; set; }
    public int? Ano { get; set; }
}
