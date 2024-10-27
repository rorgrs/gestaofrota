namespace Backend.Domain.DTOs.Viagem;

public class ViagemRequest
{
    public required int IdVeiculo { get; set; }
    public required double LatOrigem { get; set; }
    public required double LngOrigem { get; set; }
    public required int IbgeCidadeOrigem { get; set; }
    public required string LogradouroOrigem { get; set; }
    public required double LatDestino { get; set; }
    public required double LngDestino { get; set; }
    public required int IbgeCidadeDestino { get; set; }
    public required string LogradouroDestino { get; set; }
}
