using FluentValidation;

namespace Backend.Domain.DTOs.Veiculo.Validators;

public class VeiculoResponseValidator : AbstractValidator<VeiculoResponse>
{
    public VeiculoResponseValidator()
    {
        RuleFor(x => x.Placa).NotNull();
    }
}
