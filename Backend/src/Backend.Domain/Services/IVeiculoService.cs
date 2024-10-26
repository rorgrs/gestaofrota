using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Veiculo;
using Backend.Domain.Entities;

namespace Backend.Domain.Services;

public interface IVeiculoService : IBaseService<Veiculo>
{
    Task<VeiculoResponse> Save(VeiculoRequest request);
    Task<VeiculoResponse> Get(int id);
    Task<List<VeiculoResponse>> GetAll();
}
