using System;
using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Veiculo;
using Backend.Domain.Repositories;

namespace Backend.Application.Services;

public class VeiculoService : BaseService<Veiculo>, IVeiculoService
{
    public VeiculoService(IMapper mapper, IRepository<Veiculo> repository) : base(mapper, repository)
    {
    }

    public async Task<VeiculoResponse> Save(VeiculoRequest request)
    {
        var veiculo = Mapper.Map<Veiculo>(request);
        
        if(request.Id == null)
            veiculo.DataCadastro = DateTime.Now;
        
        veiculo.DataAlteracao = DateTime.Now;
        await Repository.AddAsync(veiculo);
        await Repository.SaveAsync();
        return Mapper.Map<VeiculoResponse>(veiculo);
    }

    public async Task<VeiculoResponse> Get(int id)
    {
        var veiculo = await Repository.GetByIdAsync(id);
        if (veiculo == null) throw new InvalidOperationException("Veículo não encontrado.");
        return Mapper.Map<VeiculoResponse>(veiculo);
    }

    public async Task<List<VeiculoResponse>> GetAll()
    {
        var veiculo = await Repository.GetAllAsync();
        var list = Mapper.Map<List<VeiculoResponse>>(veiculo);
        return list;
    }
}
