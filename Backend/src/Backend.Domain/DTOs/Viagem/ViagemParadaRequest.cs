namespace Backend.Domain.DTOs.Viagem;

public class ViagemParadaRequest
{
    public required double Lat { get; set; }
    public required double Lng { get; set; }
    public int? IbgeCidade { get; set; }
    public required string Logradouro { get; set; }
}
