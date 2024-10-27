using System;
using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Viagem;
using Backend.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services;

public class ViagemService : BaseService<Viagem>, IViagemService
{
    public ViagemService(IMapper mapper, IViagemRepository repository) : base(mapper, repository)
    {
    }

    public async Task<ViagemResponse> Save(ViagemRequest request)
    {
        var entity = Mapper.Map<Viagem>(request);
        entity.DataCadastro = DateTime.Now;

        await Repository.AddAsync(entity);
        await Repository.SaveAsync();
        return Mapper.Map<ViagemResponse>(entity);
    }

    public async Task<ViagemResponse> Edit(int id, ViagemRequest request)
    {
        if (id == 0) throw new InvalidOperationException("Id não informado.");
        
        var entity = await Repository.GetById(id).FirstOrDefaultAsync();
        if (entity == null) throw new InvalidOperationException("Cadastro não encontrado.");

        Mapper.Map(request, entity);
        entity.DataAlteracao = DateTime.Now;

        await Repository.UpdateAsync(entity);
        await Repository.SaveAsync();
        return Mapper.Map<ViagemResponse>(entity);
    }
    
    public async Task<ViagemResponse> Get(int id)
    {
        var viagem = await Repository.GetById(id).Include(c => c.Veiculo).FirstOrDefaultAsync();
        if (viagem == null) throw new InvalidOperationException("Cadastro não encontrado.");
        return Mapper.Map<ViagemResponse>(viagem);
    }

    public async Task<List<ViagemResponse>> GetAll()
    {
        var viagem = await Repository.GetAll().Include(c => c.Veiculo).ToListAsync();
        var list = Mapper.Map<List<ViagemResponse>>(viagem);
        return list;
    }
}
