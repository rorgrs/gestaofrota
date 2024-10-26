using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class VeiculoManutencaoRepository : Repository<VeiculoManutencao>, IVeiculoManutencaoRepository
{
    public VeiculoManutencaoRepository(BackendContext context) : base (context)
    {
    }
}
