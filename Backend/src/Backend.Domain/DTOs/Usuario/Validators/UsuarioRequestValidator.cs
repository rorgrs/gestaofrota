using FluentValidation;

namespace Backend.Domain.DTOs.Usuario.Validators;

public class UsuarioRequestValidator : AbstractValidator<UsuarioRequest>
{
    public UsuarioRequestValidator()
    {
        RuleFor(x => x.Documento).NotNull();
    }
}
