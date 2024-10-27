using System;
using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Motorista;
using Backend.Domain.Repositories;

namespace Backend.Application.Services;

public class MotoristaService : BaseService<Motorista>, IMotoristaService
{
    public MotoristaService(IMapper mapper, IRepository<Motorista> repository) : base(mapper, repository)
    {
    }

    public async Task<MotoristaResponse> Save(MotoristaRequest request)
    {
        var motorista = Mapper.Map<Motorista>(request);
        
        if(request.Id == null)
            motorista.DataCadastro = DateTime.Now;
        
        motorista.DataAlteracao = DateTime.Now;
        await Repository.AddAsync(motorista);
        await Repository.SaveAsync();
        return Mapper.Map<MotoristaResponse>(motorista);
    }

    public async Task<MotoristaResponse> Get(int id)
    {
        var motorista = await Repository.GetByIdAsync(id);
        if (motorista == null) throw new InvalidOperationException("Motorista não encontrado.");
        return Mapper.Map<MotoristaResponse>(motorista);
    }

    public async Task<List<MotoristaResponse>> GetAll()
    {
        var motorista = await Repository.GetAllAsync();
        var list = Mapper.Map<List<MotoristaResponse>>(motorista);
        return list;
    }
}
