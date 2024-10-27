using System.ComponentModel;

namespace Backend.Domain.Enum;

public enum EStatusTreinamentoMotorista
{
    [Description("Em Andamento")]
    Andamento = 1,
    
    [Description("Concluído")]
    Concluido = 2, 
    
    [Description("Pendente")]
    Pendente = 3, 
    
}