using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs;
using Backend.Domain.DTOs.Usuario;
using Backend.Domain.Entities;

namespace Backend.Domain.Services;

public interface IUsuarioService : IBaseService<Usuario>
{
    Task<UsuarioResponse> Save(UsuarioRequest request);
    Task<UsuarioResponse> Edit(int id, UsuarioRequest request);
    Task<UsuarioResponse> Get(int id);
    Task<List<UsuarioResponse>> GetAll();
}
