using AutoMapper;
using Backend.Domain.DTOs.Motorista;
using Backend.Domain.DTOs.Usuario;
using Backend.Domain.DTOs.Veiculo;
using Backend.Domain.DTOs.Viagem;
using Backend.Domain.Entities;

namespace Backend.Infrastructure.Mapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        #region Usuario
        
        CreateMap<UsuarioResponse, Usuario>().ReverseMap();
        CreateMap<UsuarioRequest, Usuario>().ReverseMap();

        #endregion
        
        #region Veiculo
        
        CreateMap<VeiculoRequest, Veiculo>().ReverseMap();
        CreateMap<VeiculoResponse, Veiculo>().ReverseMap();
        CreateMap<VeiculoLicenciamentoResponse, VeiculoLicenciamento>().ReverseMap();
        CreateMap<VeiculoLicenciamentoRequest, VeiculoLicenciamento>().ReverseMap();
        CreateMap<VeiculoManutencaoResponse, VeiculoManutencao>().ReverseMap();
        CreateMap<VeiculoManutencaoRequest, VeiculoManutencao>().ReverseMap();
        
        #endregion
        
        #region Motorista
        
        CreateMap<MotoristaResponse, Motorista>().ReverseMap();
        CreateMap<MotoristaRequest, Motorista>().ReverseMap();
       
        CreateMap<MotoristaRequest, MotoristaCarteira>()
            .ForMember(c => c.Cnh, opts => opts.MapFrom(c => c.Cnh))
            .ForMember(c => c.DataVencimento, opts => opts.MapFrom(c => c.CnhDataVencimento))
            .ForMember(c => c.Id, opts => opts.Ignore());
        
        CreateMap<MotoristaEscalaTrabalhoResponse, MotoristaEscalaTrabalho>().ReverseMap();
        CreateMap<MotoristaFolgaRequest, MotoristaFolga>().ReverseMap();
        CreateMap<MotoristaFolgaResponse, MotoristaFolga>().ReverseMap();
        CreateMap<MotoristaCarteiraResponse, MotoristaCarteira>().ReverseMap();
        
        #endregion

        #region Viagem
        
        CreateMap<ViagemRequest, Viagem>().ReverseMap();
        CreateMap<ViagemResponse, Viagem>().ReverseMap();
        CreateMap<ViagemVeiculoResponse, Veiculo>().ReverseMap();
        CreateMap<ViagemParadaResponse, ViagemParada>().ReverseMap();
        CreateMap<ViagemParadaRequest, ViagemParada>().ReverseMap();

        #endregion
    }
}
