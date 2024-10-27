using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database.Context;

namespace Backend.Infrastructure.Repositories;

public class MotoristaEscalaTrabalhoRepository : Repository<MotoristaEscalaTrabalho>, IMotoristaEscalaTrabalhoRepository
{
    public MotoristaEscalaTrabalhoRepository(BackendContext context) : base (context)
    {
    }
}
