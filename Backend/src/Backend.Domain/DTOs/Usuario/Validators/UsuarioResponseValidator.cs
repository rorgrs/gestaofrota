using FluentValidation;

namespace Backend.Domain.DTOs.Usuario.Validators;

public class UsuarioResponseValidator : AbstractValidator<UsuarioResponse>
{
    public UsuarioResponseValidator()
    {
        RuleFor(x => x.Documento).NotNull();
    }
}
