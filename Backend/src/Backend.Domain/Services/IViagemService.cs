using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Viagem;
using Backend.Domain.Entities;

namespace Backend.Domain.Services;

public interface IViagemService : IBaseService<Viagem>
{
    Task<ViagemResponse> Save(ViagemRequest request);
    Task<ViagemResponse> Edit(int id, ViagemRequest request);
    Task<ViagemResponse> Get(int id);
    Task<List<ViagemResponse>> GetAll();
}
