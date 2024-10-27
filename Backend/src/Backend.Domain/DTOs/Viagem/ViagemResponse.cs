namespace Backend.Domain.DTOs.Viagem;

public class ViagemResponse
{
    public required int Id { get; set; }
    public ViagemVeiculoResponse? Veiculo { get; set; }
    public required double LatOrigem { get; set; }
    public required double LngOrigem { get; set; }
    public required int IbgeCidadeOrigem { get; set; }
    public required string LogradouroOrigem { get; set; }
    public required double LatDestino { get; set; }
    public required double LngDestino { get; set; }
    public required int IbgeCidadeDestino { get; set; }
    public required string LogradouroDestino { get; set; }
}
public class ViagemVeiculoResponse
{
    public int? Id { get; set; }
    public required string Placa { get; set; }
    public string? Marca { get; set; }
    public string? Modelo { get; set; }
}