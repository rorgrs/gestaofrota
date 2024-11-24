using FluentValidation;

namespace Backend.Domain.DTOs.Usuario.Validators;

public class UsuarioLoginResponseValidator : AbstractValidator<UsuarioLoginResponse>
{
    public UsuarioLoginResponseValidator()
    {
    }
}
