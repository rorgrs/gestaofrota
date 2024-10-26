using FluentValidation;

namespace Backend.Domain.DTOs.Validators;

public class UsuarioResponseValidator : AbstractValidator<UsuarioResponse>
{
    public UsuarioResponseValidator()
    {
        RuleFor(x => x.Documento).NotNull();
    }
}
