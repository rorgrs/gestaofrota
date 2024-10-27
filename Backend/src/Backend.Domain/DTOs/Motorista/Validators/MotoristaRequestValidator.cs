using Backend.Domain.DTOs.Veiculo;
using FluentValidation;

namespace Backend.Domain.DTOs.Motorista.Validators;

public class VeiculoRequestValidator : AbstractValidator<VeiculoRequest>
{
    public VeiculoRequestValidator()
    {
        RuleFor(x => x.Placa).NotNull();
    }
}
