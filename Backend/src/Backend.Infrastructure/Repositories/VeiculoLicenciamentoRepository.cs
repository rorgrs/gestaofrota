using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class VeiculoLicenciamentoRepository : Repository<VeiculoLicenciamento>, IVeiculoLicenciamentoRepository
{
    public VeiculoLicenciamentoRepository(BackendContext context) : base (context)
    {
    }
}
