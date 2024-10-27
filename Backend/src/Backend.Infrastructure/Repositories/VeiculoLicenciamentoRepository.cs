using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database.Context;

namespace Backend.Infrastructure.Repositories;

public class VeiculoLicenciamentoRepository : Repository<VeiculoLicenciamento>, IVeiculoLicenciamentoRepository
{
    public VeiculoLicenciamentoRepository(BackendContext context) : base (context)
    {
    }
}
