﻿using AutoMapper;
using Backend.Domain.DTOs;
using Backend.Domain.DTOs.Motorista;
using Backend.Domain.DTOs.Usuario;
using Backend.Domain.DTOs.Veiculo;
using Backend.Domain.Entities;

namespace Backend.Infrastructure.Mapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UsuarioResponse, Usuario>().ReverseMap();
        CreateMap<UsuarioRequest, Usuario>().ReverseMap();
        
        CreateMap<VeiculoRequest, Veiculo>().ReverseMap();
        CreateMap<VeiculoResponse, Veiculo>().ReverseMap();
        
        CreateMap<MotoristaResponse, Motorista>().ReverseMap();
        CreateMap<MotoristaRequest, Motorista>().ReverseMap();
        
        CreateMap<VeiculoLicenciamentoResponse, VeiculoLicenciamento>().ReverseMap();
        
        CreateMap<VeiculoManutencaoResponse, VeiculoManutencao>().ReverseMap();
        
        CreateMap<MotoristaEscalaTrabalhoResponse, MotoristaEscalaTrabalho>().ReverseMap();
        
    }
}