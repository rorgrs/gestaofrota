using System;
using AutoMapper;
using Backend.Domain.DTOs;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.Repositories;

namespace Backend.Application.Services;

public class UsuarioService : BaseService<Usuario>, IUsuarioService
{
    public UsuarioService(IMapper mapper, IRepository<Usuario> repository) : base(mapper, repository)
    {
    }

    public async Task<UsuarioResponse> Save(UsuarioRequest request)
    {
        var usuario = Mapper.Map<Usuario>(request);
        
        if(request.Id == null)
            usuario.DataCadastro = DateTime.Now;
        
        usuario.DataAlteracao = DateTime.Now;
        await Repository.AddAsync(usuario);
        await Repository.SaveAsync();
        return Mapper.Map<UsuarioResponse>(usuario);
    }

    public async Task<UsuarioResponse> Get(int id)
    {
        var usuario = await Repository.GetByIdAsync(id);
        if (usuario == null) throw new InvalidOperationException("Usuário não encontrado.");
        return Mapper.Map<UsuarioResponse>(usuario);
    }

    public async Task<List<UsuarioResponse>> GetAll()
    {
        var usuario = await Repository.GetAllAsync();
        var list = Mapper.Map<List<UsuarioResponse>>(usuario);
        return list;
    }
}
