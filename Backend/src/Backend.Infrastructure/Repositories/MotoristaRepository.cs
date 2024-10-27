using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class MotoristaRepository : Repository<Motorista>, IMotoristaRepository
{
    public MotoristaRepository(BackendContext context) : base (context)
    {
    }
}
