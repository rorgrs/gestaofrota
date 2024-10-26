using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs;

namespace Backend.Domain.Services;

public interface IUsuarioService
{
    Task<UsuarioResponse> Save(UsuarioRequest request);
    Task<UsuarioResponse> Get(int id);
    Task<List<UsuarioResponse>> GetAll();
}
