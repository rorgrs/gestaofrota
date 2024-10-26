using AutoMapper;
using Backend.Domain.DTOs;
using Backend.Domain.Entities;

namespace Backend.Infrastructure.Mapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UsuarioResponse, Usuario>().ReverseMap();
        CreateMap<UsuarioRequest, Usuario>().ReverseMap();
    }
}
