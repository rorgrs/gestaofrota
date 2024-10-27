using System;
using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Veiculo;
using Backend.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services;

public class VeiculoService : BaseService<Veiculo>, IVeiculoService
{
    public VeiculoService(IMapper mapper, IVeiculoRepository repository) : base(mapper, repository)
    {
    }

    public async Task<VeiculoResponse> Save(VeiculoRequest request)
    {
        var entity = Mapper.Map<Veiculo>(request);
        entity.DataCadastro = DateTime.Now;

        await Repository.AddAsync(entity);
        await Repository.SaveAsync();
        return Mapper.Map<VeiculoResponse>(entity);
    }

    public async Task<VeiculoResponse> Edit(int id, VeiculoRequest request)
    {
        if (id == 0) throw new InvalidOperationException("Id não informado.");
        
        var entity = await Repository.GetById(id).FirstOrDefaultAsync();
        if (entity == null) throw new InvalidOperationException("Cadastro não encontrado.");

        Mapper.Map(request, entity);
        entity.DataAlteracao = DateTime.Now;

        await Repository.UpdateAsync(entity);
        await Repository.SaveAsync();
        return Mapper.Map<VeiculoResponse>(entity);
    }
    
    public async Task<VeiculoResponse> Get(int id)
    {
        var veiculo = await Repository.GetById(id).FirstOrDefaultAsync();
        if (veiculo == null) throw new InvalidOperationException("Veículo não encontrado.");
        return Mapper.Map<VeiculoResponse>(veiculo);
    }

    public async Task<List<VeiculoResponse>> GetAll()
    {
        var veiculo = await Repository.GetAll().ToListAsync();
        var list = Mapper.Map<List<VeiculoResponse>>(veiculo);
        return list;
    }
}
