using System;
using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Usuario;
using Backend.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services;

public class UsuarioService : BaseService<Usuario>, IUsuarioService
{
    public UsuarioService(IMapper mapper, IUsuarioRepository repository) : base(mapper, repository)
    {
    }

    public async Task<UsuarioResponse> Save(UsuarioRequest request)
    {
        if (await Repository.ExistAsync(c => c.Documento == request.Documento))
            throw new InvalidOperationException("Documento repetido.");

        var entity = Mapper.Map<Usuario>(request);
        entity.DataCadastro = DateTime.Now;

        await Repository.AddAsync(entity);
        await Repository.SaveAsync();

        return Mapper.Map<UsuarioResponse>(entity);
    }
    
    public async Task<UsuarioResponse> Edit(int id, UsuarioRequest request)
    {
        if (id == 0) throw new InvalidOperationException("Id não informado.");
        
        var entity = await Repository.GetById(id).FirstOrDefaultAsync();
        if (entity == null) throw new InvalidOperationException("Cadastro não encontrado.");

        Mapper.Map(request, entity);
        entity.DataAlteracao = DateTime.Now;

        await Repository.UpdateAsync(entity);
        await Repository.SaveAsync();
        return Mapper.Map<UsuarioResponse>(entity);
    }

    public async Task<UsuarioResponse> Get(int id)
    {
        var usuario = await Repository.GetById(id).FirstOrDefaultAsync();
        if (usuario == null) throw new InvalidOperationException("Usuário não encontrado.");
        return Mapper.Map<UsuarioResponse>(usuario);
    }

    public async Task<List<UsuarioResponse>> GetAll()
    {
        var usuario = await Repository.GetAll().ToListAsync();
        var list = Mapper.Map<List<UsuarioResponse>>(usuario);
        return list;
    }
}
