using FluentValidation;

namespace Backend.Domain.DTOs.Usuario.Validators;

public class UsuarioLoginRequestValidator : AbstractValidator<UsuarioLoginRequest>
{
    public UsuarioLoginRequestValidator()
    {
    }
}
