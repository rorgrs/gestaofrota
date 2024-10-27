using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database.Context;

namespace Backend.Infrastructure.Repositories;

public class UsuarioRepository : Repository<Usuario>, IUsuarioRepository
{
    public UsuarioRepository(BackendContext context) : base (context)
    {
    }
}
