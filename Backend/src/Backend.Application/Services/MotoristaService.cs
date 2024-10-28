using System;
using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Motorista;
using Backend.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services;

public class MotoristaService : BaseService<Motorista>, IMotoristaService
{
    private readonly IMotoristaCarteiraRepository _motoristaCarteiraRepository;
    private readonly IMotoristaFolgaRepository _motoristaFolgaRepository;
    private readonly IMotoristaEscalaTrabalhoRepository _motoristaEscalaTrabalhoRepository;

    public MotoristaService(IMapper mapper, IMotoristaRepository repository, IMotoristaCarteiraRepository motoristaCarteiraRepository,
        IMotoristaFolgaRepository motoristaFolgaRepository, IMotoristaEscalaTrabalhoRepository motoristaEscalaTrabalhoRepository) : base(mapper, repository)
    {
        _motoristaCarteiraRepository = motoristaCarteiraRepository;
        _motoristaFolgaRepository = motoristaFolgaRepository;
        _motoristaEscalaTrabalhoRepository = motoristaEscalaTrabalhoRepository;
    }

    public async Task<MotoristaResponse> Save(MotoristaRequest request)
    {
        if (await Repository.ExistAsync(c => c.Documento == request.Documento))
            throw new InvalidOperationException("Documento repetido.");

        if (!request.IdEscalaTrabalho.HasValue && request.IdEscalaTrabalho <= 0) 
            request.IdEscalaTrabalho = null;
        else if (request.IdEscalaTrabalho.HasValue && await _motoristaEscalaTrabalhoRepository.GetById(request.IdEscalaTrabalho.Value).FirstOrDefaultAsync() == null) 
            request.IdEscalaTrabalho = null;

        var entity = Mapper.Map<Motorista>(request);
        entity.DataCadastro = DateTime.Now;

        await Repository.AddAsync(entity);
        await Repository.SaveAsync();

        if (!string.IsNullOrWhiteSpace(request.Cnh) && request.CnhDataVencimento.HasValue)
        {
            var cnh = Mapper.Map<MotoristaCarteira>(request);
            cnh.IdMotorista = entity.Id;
            await _motoristaCarteiraRepository.AddAsync(cnh);
            await _motoristaCarteiraRepository.SaveAsync();
        }

        return Mapper.Map<MotoristaResponse>(entity);
    }

    public async Task<MotoristaResponse> Edit(int id, MotoristaRequest request)
    {
        if (id == 0) throw new InvalidOperationException("Id não informado.");
        
        var entity = await Repository.GetById(id).FirstOrDefaultAsync();
        if (entity == null) throw new InvalidOperationException("Cadastro não encontrado.");

        if (!request.IdEscalaTrabalho.HasValue && request.IdEscalaTrabalho <= 0) 
            request.IdEscalaTrabalho = null;
        else if (request.IdEscalaTrabalho.HasValue && await _motoristaEscalaTrabalhoRepository.GetById(request.IdEscalaTrabalho.Value).FirstOrDefaultAsync() == null) 
            request.IdEscalaTrabalho = null;

        Mapper.Map(request, entity);
        entity.DataAlteracao = DateTime.Now;

        if (!string.IsNullOrWhiteSpace(request.Cnh) && request.CnhDataVencimento.HasValue)
        {
            var cnh = Mapper.Map<MotoristaCarteira>(request);
            await _motoristaCarteiraRepository.UpdateAsync(cnh);
            await _motoristaCarteiraRepository.SaveAsync();
        }

        await Repository.UpdateAsync(entity);
        await Repository.SaveAsync();
        return Mapper.Map<MotoristaResponse>(entity);
    }

    public async Task<MotoristaResponse> Get(int id)
    {
        var entity = await Repository.GetById(id)
            .Include(c => c.Carteiras)
            .Include(c => c.Folgas)
            .FirstOrDefaultAsync();
        if (entity == null) throw new InvalidOperationException("Cadastro não encontrado.");
        return Mapper.Map<MotoristaResponse>(entity);
    }

    public async Task<List<MotoristaResponse>> GetAll()
    {
        var motorista = await Repository.GetAll().ToListAsync();
        var list = Mapper.Map<List<MotoristaResponse>>(motorista);
        return list;
    }

    public async Task AddFolga(int id, MotoristaFolgaRequest request)
    {
        if (id == 0) throw new InvalidOperationException("Id não informado.");
        
        var entity = await Repository.GetById(id).FirstOrDefaultAsync();
        if (entity == null) throw new InvalidOperationException("Cadastro não encontrado.");
        
        var folga = Mapper.Map<MotoristaFolga>(request);
        folga.IdMotorista = id;
        await _motoristaFolgaRepository.AddAsync(folga);
        await _motoristaFolgaRepository.SaveAsync();
    }
}