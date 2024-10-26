using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class VeiculoRepository : Repository<Veiculo>, IVeiculoRepository
{
    public VeiculoRepository(BackendContext context) : base (context)
    {
    }
}
