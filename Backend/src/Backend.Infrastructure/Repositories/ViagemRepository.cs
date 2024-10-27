using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database.Context;

namespace Backend.Infrastructure.Repositories;

public class ViagemRepository : Repository<Viagem>, IViagemRepository
{
    public ViagemRepository(BackendContext context) : base (context)
    {
    }
}
