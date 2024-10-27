using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database.Context;

namespace Backend.Infrastructure.Repositories;

public class MotoristaCarteiraRepository : Repository<MotoristaCarteira>, IMotoristaCarteiraRepository
{
    public MotoristaCarteiraRepository(BackendContext context) : base (context)
    {
    }
}
