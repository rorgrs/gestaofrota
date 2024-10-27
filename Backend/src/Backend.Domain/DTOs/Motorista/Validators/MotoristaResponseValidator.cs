using Backend.Domain.DTOs.Veiculo;
using FluentValidation;

namespace Backend.Domain.DTOs.Motorista.Validators;

public class VeiculoResponseValidator : AbstractValidator<VeiculoResponse>
{
    public VeiculoResponseValidator()
    {
        RuleFor(x => x.Placa).NotNull();
    }
}
