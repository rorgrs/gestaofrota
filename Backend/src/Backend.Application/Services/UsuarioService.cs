using System;
using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Usuario;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Helpers.Interface;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services;

public class UsuarioService : BaseService<Usuario>, IUsuarioService
{
    private readonly IAuthHelper _authHelper;
    
    public UsuarioService(IMapper mapper, IUsuarioRepository repository, IAuthHelper authHelper) : base(mapper, repository)
    {
        _authHelper = authHelper;
    }

    public async Task<UsuarioResponse> Save(UsuarioRequest request)
    {
        if (await Repository.ExistAsync(c => c.Documento == request.Documento))
            throw new InvalidOperationException("Documento repetido.");
        
        if(string.IsNullOrWhiteSpace(request.Senha))
            throw new InvalidOperationException("Senha não informada.");

        var entity = Mapper.Map<Usuario>(request);
        entity.DataCadastro = DateTime.Now;
        entity.Senha = request.Senha;

        await Repository.AddAsync(entity);
        await Repository.SaveAsync();

        return Mapper.Map<UsuarioResponse>(entity);
    }

    public async Task<UsuarioLoginResponse> Login(UsuarioLoginRequest request)
    {
        var usuario = await Repository
            .GetAll(c => c.Login == request.Login && c.Senha == request.Senha)
            .FirstOrDefaultAsync();

        if (usuario == null)
            throw new InvalidOperationException("Dados inválidos.");

        var token = _authHelper.GenerateJwtToken(usuario.Id, usuario.Documento);

        return new UsuarioLoginResponse()
        {
            Documento = usuario.Documento,
            Id = usuario.Id,
            Login = usuario.Login,
            Nome = usuario.Nome,
            Token = token,
            ExpiresIn = _authHelper.GetExpiresInSeconds()
        };
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
