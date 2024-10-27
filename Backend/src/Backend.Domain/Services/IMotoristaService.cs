using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Motorista;
using Backend.Domain.Entities;

namespace Backend.Domain.Services;

public interface IMotoristaService : IBaseService<Motorista>
{
    Task<MotoristaResponse> Save(MotoristaRequest request);
    Task<MotoristaResponse> Get(int id);
    Task<List<MotoristaResponse>> GetAll();
}
