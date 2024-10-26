using System.ComponentModel;

namespace Backend.Domain.Enum;

public enum ETipoManutencaoVeiculo
{
    [Description("Corretiva")]
    Corretiva = 1,
    
    [Description("Preventiva")]
    Preventiva = 2, 
    
    [Description("Preditiva")]
    Preditiva = 3, 
}