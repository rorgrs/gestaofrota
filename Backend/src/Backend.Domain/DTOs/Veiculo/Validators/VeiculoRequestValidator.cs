using FluentValidation;

namespace Backend.Domain.DTOs.Veiculo.Validators;

public class VeiculoRequestValidator : AbstractValidator<VeiculoRequest>
{
    public VeiculoRequestValidator()
    {
        RuleFor(x => x.Placa).NotNull();
    }
}
