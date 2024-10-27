using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database.Context;

namespace Backend.Infrastructure.Repositories;

public class ViagemParadaRepository : Repository<ViagemParada>, IViagemParadaRepository
{
    public ViagemParadaRepository(BackendContext context) : base (context)
    {
    }
}
