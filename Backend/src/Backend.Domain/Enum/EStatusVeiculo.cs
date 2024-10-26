using System.ComponentModel;

namespace Backend.Domain.Enum;

public enum EStatusVeiculo
{
    [Description("Em Manutenção")]
    Manutencao = 1,
    
    [Description("Em Viagem")]
    Viagem = 2, 
    
    [Description("Em Aguardo")]
    Aguardo = 3, 
    
    [Description("Inativo")]
    Inativo = 4
}